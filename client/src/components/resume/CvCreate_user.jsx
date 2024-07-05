import React, { useContext, useEffect, useRef, useState } from 'react'
import './css/CvCreate_user.css'
import axios from 'axios';
import { LoginContext } from '../../contexts/LoginContextProvider';
import { useNavigate, useParams } from 'react-router-dom';
import BtnLong from '../main/BtnLong';
import { deleteFile } from '../../apis/recruit/recruit.js'; // postRecruit 함수 import


const CvCreate_user = () => {
    const { userInfo } = useContext(LoginContext);
    const userNo = userInfo ? userInfo.userNo : null;
    const { cvNo } = useParams('');
    const fileInputRef = useRef(null);
    const fileInputRef2 = useRef(null);
    const [newFiles, setNewFiles] = useState([]);
    const thumbnailImg = useRef(null);
    const [files, setFiles] = useState([]);

    const [formData, setFormData] = useState({
        cvTitle: '',            // 이력서 제목
        university: '',         // 학력에서 대학 이름
        major: '',              // 학력에서 전공
        universityStatus: '',   // 학력에서 학적 상태
        organization: '',       // 경력에서 기관 이름
        startDate: '',          // 경력에서 시작 일자
        endDate: '',            // 경력에서 종료 일자
        duties: '',             // 경력에서 담당 업무
        coverLetter: '',        // 자기소개서 
        username: '',           // 사용자 이름
        name: '',               // 사용자 이름을 
        userBirth: '',          // 사용자 생년월일
        userPhone: '',          // 사용자 전화번호
        userEmail: ''           // 사용자 이메일
    });

    const [educationList, setEducationList] = useState([]); // 학력 이력 목록
    const [employmentHistoryList, setEmploymentHistoryList] = useState([]); // 경력 이력 목록
    const [thumbnail, setThumbnail] = useState(null); // 이력서 썸네일 이미지
    const [uploadedFiles, setUploadedFiles] = useState([]); // 업로드된 파일 목록
    const navi= useNavigate();

    const handleFileUploadClick = () => {
        fileInputRef.current.click();
    };

    const handleFileUploadClick2 = () => {

        fileInputRef2.current.click();
    };

    const handleFileChange = (event) => {
        const newFiles = [...event.target.files];
        setFiles(newFiles);
    };
    
    const deleteNewFileClick = (index) => {
        // alert('??')
        setNewFiles(newFiles.filter((_, i) => i !== index));
    };


    const handleThumbnailChange = (event) => {
        const file = event.target.files[0];
        setThumbnail(file)
        console.log(file, "썸네일");
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                // setThumbnail(file); // 상태를 업데이트하여 React 내에서 관리
                if (thumbnailImg.current) {
                    thumbnailImg.current.src = reader.result; // 이미지 태그의 src 속성 업데이트
                }
            };
            reader.readAsDataURL(file);
        } else {
            setThumbnail('/img/no-image.png');
        }
    };
    
    // 유저 정보를 불러올때 사용
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                if (userInfo && userInfo.userNo) {
                    const response = await axios.get('/user/info_user', {
                        params: {
                            userNo: userInfo.userNo
                        }
                    });
                    const userData = response.data;
                    console.log(userData, "???//Asdf'dskljsaflksafjdk;afsjdk;lfjlkaasfdjok");
                    
                    // const formattedDate = `${userData.userBirth.slice(0, 4)}-${userData.userBirth.slice(4, 6)}-${userData.userBirth.slice(6, 8)}`;
                    const formattedDate = userData.userBirth.replace(/(\d{4})-(\d{1,2})-(\d{1,2})/, '$1-$2-$3');
                    
                    setFormData({
                        name: userData.userName,
                        userBirth: formattedDate,
                        userPhone: userData.userPhone,
                        userEmail: userData.userEmail,
                    });
                }
            } catch (error) {
                console.error("Failed to fetch user data", error);
            }
        };
        fetchUserData();
    }, [userInfo]);
    
    // 경력 이력 목록 가져오기
    const fetchEmploymentHistoryList = async () => {
        try {
            const response = await axios.get(`/resume/cv_Emlist_user?userNo=${userNo}`);
            setEmploymentHistoryList(response.data);
        } catch (error) {
            console.error('경력 목록 가져오기 오류', error);
        }
    };
    
    // 제출 처리 함수
    const handleSubmit = async (event) => {
        event.preventDefault();
    
        // 폼 필드에서 값 가져오기
        const cvTitle = event.target.elements.cvTitle.value;
        const coverLetter = event.target.elements.coverLetter.value;
    
        const formData = new FormData();
        formData.append('cvTitle', cvTitle);
        formData.append('coverLetter', coverLetter);
        formData.append('cvNo', cvNo);
        

        // 자기소개서 등록 ✅ 성공
        try {
            const response = await axios.post('/resume/cv_update_user', formData);
            if (!response.data) {
                throw new Error('Response data is missing');
            }
        } catch (error) {
            console.error('Error posting job:', error);
            alert('제목 자기소개서 등록 실패');
            return; // 실패 시 함수 종료
        }
    
        // 썸네일 추가 ✅ 성공
        if (thumbnail instanceof File) {
            formData.append('thumbnail', thumbnail);
        }
        try {
            const response = await axios.post('/resume/cv_FileCreate_user', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            if (!response.data) {
                throw new Error('Response data is missing');
            }
            console.log('Response:', response);
        } catch (error) {
            console.error('Error posting job:', error);
            alert('썸네일 추가 실패');
            return; // 실패 시 함수 종료
        }
    
        // 파일 첨부 ❌ 실패
        files.forEach((file) => {
            formData.append('file', file);
        });
    
        try {
            const response = await axios.post('/resume/cv_FileUpdate2_user', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            if (!response.data) {
                throw new Error('Response data is missing');
            }
        } catch (error) {
            console.error('Error posting job:', error);
            alert('파일 첨부 실패');
            return; // 실패 시 함수 종료
        }
    
        navi('/');
    };
    
    const deleteFileClick = (fileNo, index) => {
        const encodedFileNo = encodeURIComponent(fileNo);
        
        deleteFile(encodedFileNo)
        .then(response => {
                if (response.status === 200 && response.data === 'SUCCESS') {
                    // 삭제 성공 후, 파일 목록에서 해당 파일 제거
                    setFiles(prevFiles => prevFiles.filter(file => file.fileNo !== fileNo));
                    console.log(files);
                    console.log('파일이 성공적으로 삭제되었습니다.');
                }
            })
            .catch(error => {
                alert(`삭제 실패: ${error.response.status} ${error.response.statusText}`);
            });
    };

    // 핸들 입력 변경
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // 학력 추가 처리
    const handleAddEducation = async () => {
        try {
            const response = await axios.post('/resume/cv_Edupdate_user', {
                userNo,
                university: formData.university,
                major: formData.major,
                universityStatus: formData.universityStatus,
            });
            setFormData({
                ...formData,
                university: '',
                major: '',
                universityStatus: ''
            });
            // fetchEducationList();
        } catch (error) {
            console.error('학력 추가 오류', error);
            alert('에러 발생');
        }
    };

    // 경력 추가 처리
    const handleAddEmploymentHistory = async () => {
        try {
            const response = await axios.post('/resume/cv_Emupdate_user', {
                userNo,
                organization: formData.organization,
                startDate: formData.startDate,
                endDate: formData.endDate,
                duties: formData.duties,
            });
            setFormData({
                ...formData,
                organization: '',
                startDate: '',
                endDate: '',
                duties: ''
            });
            fetchEmploymentHistoryList();
        } catch (error) {
            console.error('경력 추가 오류', error);
            alert('에러 발생');
        }
    };

    // 썸네일 이미지 업로드 처리
    const handleThumbnailUpload = async (event) => {
        const formData = new FormData();
        formData.append('userNo', userNo);
        formData.append('thumbnail', event.target.files[0]);
        try {
            const response = await axios.post('/resume/cv_FileCreate_user', formData, {

            });
            setThumbnail(response.data);
        } catch (error) {
            console.error('썸네일 업로드 오류', error);
            alert('이미지 업로드에 실패했습니다.');
        }
    };

    // 파일 업로드 처리
    const handleFileUpload = async (event) => {
        const formData = new FormData();
        formData.append('userNo', userNo);
        Array.from(event.target.files).forEach(file => {
            formData.append('file', file);
        });
        try {
            const response = await axios.post('/resume/cv_FileUpdate2_user', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            setUploadedFiles([...uploadedFiles, ...response.data]);
        } catch (error) {
            console.error('파일 업로드 오류', error);
            alert('문서 업로드에 실패했습니다.');
        }
    };

    
    
    return (
        <>
            <form method='POST' encType='multipart/form-data' style={{ marginTop: '20px' }} onSubmit={handleSubmit}>
                <div className="container-fluid container resume-form">
                    <div className="form-group col-12 Title">
                        <span className='Title2'>
                            제목
                        </span>
                        <input type="text" name="cvTitle" id="title" className='form-controller Title3' placeholder='제목을 입력해주세요' />
                    </div>
                    {/* 토큰 있는 자리였음 */}

                    <div className="d-flex">
                        <div className="form-group col-6" style={{ width: 'calc(100% - 250px)' }}>
                            <div className="row">
                                <div className="form-group col-12">
                                    <span className="userName">{formData.name}</span>
                                </div>
                                <div className="form-group col-12">
                                    <label htmlFor="age" className="form-label"></label>
                                    <span className="userAge">{formData.userBirth}</span>
                                </div>
                                <div className="form-group col-12">
                                    <label htmlFor="email" className="form-label"></label>
                                    <span className="userEmail">{formData.userEmail}</span>
                                </div>
                                <div className="form-group col-12">
                                    <label htmlFor="phone" className="form-label"></label>
                                    <span className="userPhone">{formData.userPhone}</span>
                                </div>
                            </div>
                        </div>

                        <div className="profile-pic userImgTitle">
                            <div id='preview' className='preview'>
                                {/* <img src="" alt="썸네일에 따라 다르게 올라가야함" className='img-thumbnail' /> */}
                                {
                                    thumbnail != null ? (
                                        <img ref={thumbnailImg} src={`/file/img/${thumbnail.fileNo}`} id='thumbnail-preview' className='img-thumbnail' alt="이미지 없다" style={{ height: '100%', width: '100%' }} />
                                    ) : (
                                        <img ref={thumbnailImg} src="/img/no-image.png" id='thumbnail-preview' className='img-thumbnail' alt="이미지 없다" style={{ height: '100%', width: '100%' }} />
                                    )
                                }
                            </div>

                            <div className='ImgFile'>
                                <input ref={fileInputRef} type="file" name="thumbnail" id="thumbnail" className='file-input thumbnail-preview-recruit' accept='image/*' onChange={handleThumbnailChange} />
                                <button className='btn-long imgFile-input' type='button' id='imgUploadBtn' onClick={handleFileUploadClick}>사진 선택</button>
                            </div>
                        </div>
                    </div>
                    <div className="form-group row w-100 flex-column ms-1">
                        <div className="col-sm-12 border bg-light rounded-3" style={{ border: 'none', '--bs-bg-opacity': 0, paddingLeft: 0 }}>
                            <div className="d-flex justify-content-between mt-3" style={{ marginTop: '30px !important' }}>
                                <h5 style={{ fontWeight: 'bold', fontSize: '22px', marginLeft: '10px' }}>학력</h5>
                                <button type="button" className="educationBtn btn-short" style={{ width: '80px', background: 'none', justifyContent: 'flex-end', marginBottom: '7px' }}>
                                    <span className="fs-2 more_btn"></span>
                                </button>
                            </div>

                            <div>
                                <hr color="#eee" style={{ margin: '5px 0 20px', borderColor: '#d7dce5', opacity: 1 }} />
                            </div>

                            <div>
                                <div className="col-12 d-flex" style={{ marginLeft: '1%' }}>
                                    <div className="form-group col-3" style={{ width: '33%' }}>
                                        <span style={{ fontSize: '17px', fontWeight: 'bold', color: '#0d6efd', width: '50px', float: 'left', display: 'inline-block', lineHeight: '32px' }}>학교</span>
                                        <input type="text" className="form-control w-75" id="university" placeholder="학교" style={{ width: 'calc(100% - 70px)' }} />
                                    </div>

                                    <div className="form-group col-3" style={{ width: '33%' }}>
                                        <span style={{ fontSize: '17px', fontWeight: 'bold', color: '#0d6efd', width: '50px', float: 'left', display: 'inline-block', lineHeight: '32px' }}>전공</span>
                                        <input type="text" className="form-control w-75" id="major" placeholder="전공" style={{ width: 'calc(100% - 70px)' }} />
                                    </div>

                                    <div className="form-group col-3" style={{ width: '33%' }}>
                                        <span style={{ fontSize: '17px', fontWeight: 'bold', color: '#0d6efd', width: '50px', float: 'left', display: 'inline-block', lineHeight: '32px' }}>학적</span>
                                        <input type="text" className="form-control w-75" id="universityStatus" placeholder="학력상태" style={{ width: 'calc(100% - 70px)' }} />
                                    </div>
                                </div>

                                <div className="col-12 p-2">
                                    {/* 학력 리스트 */}
                                    <div id="education-list">
                                        {/* 리스트 아이템들을 여기에 추가 */}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div>
                            <hr className='hrr' />
                        </div>

                        <div className="col-sm-12 border bg-light rounded-3" style={{ border: 'none', '--bs-bg-opacity': 0, paddingLeft: 0 }}>
                            <div className="d-flex justify-content-between mt-3" style={{ marginTop: '30px !important' }}>
                                <h5 style={{ fontWeight: 'bold', fontSize: '22px', marginLeft: '10px' }}>경력</h5>
                                <button type="button" className="educationBtn btn-short" style={{ width: '80px', background: 'none', justifyContent: 'flex-end', marginBottom: '7px' }}>
                                    <span className="fs-2 more_btn"></span>
                                </button>
                            </div>

                            <div>
                                <hr color="#eee" style={{ margin: '5px 0 20px', borderColor: '#d7dce5', opacity: 1 }} />
                            </div>

                            <div>
                                <div className="col-12 d-flex" style={{ marginLeft: '1%' }}>
                                    <div className="form-group" style={{ width: '33%' }}>
                                        <span style={{ fontSize: '17px', fontWeight: 'bold', color: '#0d6efd', width: '50px', float: 'left', display: 'inline-block', lineHeight: '32px' }}>기관</span>
                                        <input type="text" className="form-control w-55" id="university" placeholder="기관명" style={{ width: 'calc(100% - 70px)' }} />
                                    </div>

                                    <div className="form-group" style={{ width: '33%' }}>
                                        <span style={{ fontSize: '17px', fontWeight: 'bold', color: '#0d6efd', width: '50px', float: 'left', display: 'inline-block', lineHeight: '32px' }}>시작일</span>
                                        <input type="date" className="form-control w-55" id="major" placeholder="출" style={{ width: 'calc(100% - 70px)' }} />
                                    </div>

                                    <div className="form-group" style={{ width: '33%' }}>
                                        <span style={{ fontSize: '17px', fontWeight: 'bold', color: '#0d6efd', width: '50px', float: 'left', display: 'inline-block', lineHeight: '32px' }}>끝일</span>
                                        <input type="date" className="form-control w-55" id="universityStatus" placeholder="퇴" style={{ width: 'calc(100% - 70px)' }} />
                                    </div>
                                    <div className="form-group" style={{ width: '33%' }}>
                                        <span style={{ fontSize: '17px', fontWeight: 'bold', color: '#0d6efd', width: '50px', float: 'left', display: 'inline-block', lineHeight: '32px' }}>담당</span>
                                        <input type="text" className="form-control w-55" id="universityStatus" placeholder="담당업무" style={{ width: 'calc(100% - 70px)' }} />
                                    </div>
                                </div>

                                <div className="col-12 p-2">
                                    {/* 경력 리스트 */}
                                    <div id="employmenthistory-list">
                                        {/* 리스트 아이템들을 여기에 추가 
                            이거 그냥 추가되는건 아니면 import 시켜야 하는 건지 알아야 함*/}
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* 학경력 끝 */}
                        <div className="mt-5" style={{ padding: 0 }}>
                            <h5 className='introduceMe'>자기소개서</h5>
                            <hr className='hrrr' />
                            <textarea name="coverLetter" id="coverLetter" minLength={10} className="introduceMe1 form-controller border bg-light round-3"
                                rows={5} placeholder='최소 10자이상 작성해야 합니다.' ></textarea>
                        </div>

                        <div className="file-upload upload-btn d-flex justify-content-between">
                            <div>
                                <input ref={fileInputRef2} onChange={handleFileChange} type="file" name="file" id="file-input" className="file-input hidden-file-input" multiple />
                                <button className="btn-long InsertFile" type='button' id='uploadBtn' name='uploadBtn' onClick={handleFileUploadClick2}>파일 선택</button>
                                {files.map((file) => (
                                    <div key={file.fileNo} className="file-name">
                                        {file.originName}
                                        <span
                                            className="remove-file"
                                            role="button"
                                            onClick={() => deleteFileClick(file.fileNo)}
                                            style={{ cursor: 'pointer', marginLeft: '10px' }}>
                                            X
                                        </span>
                                    </div>
                                ))}
                                {newFiles.map((file, index) => (
                                    <div key={index} className="file-name">
                                        {file.name}
                                        <span
                                            className="remove-file"
                                            role="button"
                                            onClick={() => deleteNewFileClick(index)}
                                            style={{ cursor: 'pointer', marginLeft: '10px' }}>
                                            X
                                        </span>
                                    </div>
                                ))}
                            </div>
                            <div className="btn-click123" style={{ display: 'flex' }}>
                                {/* <BtnLong btnLongText={"이력서 등록"} btnType="submit" /> */}
                                <button type='submit' className='btn-long' style={{ float: 'right' }}>이력서 등록</button>
                                <button type='button' className='btn-long' style={{ float: 'right' }}>이전 페이지</button>
                            </div>
                        </div>


                    </div>
                </div>
            </form>
        </>
    )
}

export default CvCreate_user