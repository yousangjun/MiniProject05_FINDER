import React, { useRef, useState, useContext, useEffect } from 'react';
import './css/Post_job.css';
import BtnLong from '../main/BtnLong';
import KeywordItem from '../main/KeywordItem';
import Swal from 'sweetalert2';
import { postRecruit, getComToUserNo } from '../../apis/recruit/recruit.js'; // postRecruit 함수 import
import { useNavigate } from 'react-router-dom';
import { LoginContext } from '../../contexts/LoginContextProvider';

const Post_jobs_com = () => {
    const { userInfo } = useContext(LoginContext);
    const [keyword, setKeywords] = useState([]);
    const [thumbnail, setThumbnail] = useState('/img/no-image.png');
    const [files, setFiles] = useState([]);
    const [recruitTitle, setRecruitTitle] = useState('');
    const [recruitResponsibilities, setRecruitResponsibilities] = useState('');
    const [recruitQualifications, setRecruitQualifications] = useState('');
    const [recruitPreferredQualifications, setRecruitPreferredQualifications] = useState('');
    const [recruitRegDate, setRecruitRegDate] = useState('');
    const [recruitContent, setRecruitContent] = useState('');
    const userNo = userInfo ? userInfo.userNo : null;
    
    const navigate = useNavigate();
    const thumbnailImg = useRef(null);
    const fileInputRef = useRef(null);
    const fileInputRef2 = useRef(null);
    const companyNo = useRef(null);
    
    const handleGetCompany = async () => {
        try {
            companyNo.current = await getComToUserNo(userInfo.userNo);
            
            console.dir(companyNo.current.data.comNo);
        } catch (error) {
            console.error('Error fetching company data:', error);
        }
    };
    
    // 예를 들어 컴포넌트가 마운트될 때 이 함수를 호출하려면 useEffect 훅을 사용할 수 있습니다.
    useEffect(() => {
        if (userNo) {
            handleGetCompany();
        }
    }, [userNo]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        // 필수 필드 값 검증
        if (!recruitTitle || !recruitResponsibilities || !recruitQualifications || !recruitPreferredQualifications || !recruitRegDate || !recruitContent) {
            Swal.fire({
                icon: 'warning',
                title: '입력 오류',
                text: '모든 필드를 입력해주세요.',
            });
            return;
        }

        // 파일 첨부 검증
        if (files.length === 0) {
            Swal.fire({
                icon: 'warning',
                title: '파일 첨부 오류',
                text: '파일을 첨부해주세요.',
            });
            return;
        }

        const formData = new FormData();
        formData.append('recruitTitle', recruitTitle);
        formData.append('recruitResponsibilities', recruitResponsibilities);
        formData.append('recruitQualifications', recruitQualifications);
        formData.append('recruitPreferredQualifications', recruitPreferredQualifications);
        formData.append('recruitRegDate', recruitRegDate);
        formData.append('recruitContent', recruitContent);
        formData.append('comNo', companyNo.current.data.comNo);
        keyword.forEach((keyword, index) => {
            formData.append(`keyword`, keyword);
        }); // 키워드를 JSON 문자열로 변환하여 추가

    
        
        // 썸네일 추가
        if (thumbnail instanceof File) {
            formData.append('thumbnail', thumbnail);
        }
        
        // 파일 첨부
        files.forEach((file, index) => {
            formData.append('file', file); // files 배열을 순회하며 각각의 파일을 추가
        });
        
        for (let [key, value] of formData.entries()) {
            console.log(key, value);
        }
        try {
            const response = await postRecruit(userNo, formData);
            console.log('Job posted successfully:', response.data);
            navigate('/'); // 성공적으로 등록된 후 네비게이트
        } catch (error) {
            console.error('Error posting job:', error);
        }
    };

    const handleKeywordKeyDown = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
        }
    };

    const handleKeywordKeyUp = (event) => {
        if (event.key === 'Enter') {
            const newKeyword = `#${event.target.value.trim()}`;
            if (newKeyword) {
                setKeywords([...keyword, newKeyword]);
                event.target.value = '';
            }
            console.log(keyword);
        }
    };


    const handleFileUploadClick = () => {
        fileInputRef.current.click();
    };
    const handleFileUploadClick2 = () => {
        fileInputRef2.current.click();
    };
    const deleteFile = (index) => {
        setFiles(files.filter((_, i) => i !== index));
    };

    const handleThumbnailChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setThumbnail(file); // 상태를 업데이트하여 React 내에서 관리
                if (thumbnailImg.current) {
                    thumbnailImg.current.src = reader.result; // 이미지 태그의 src 속성 업데이트
                }
            };
            reader.readAsDataURL(file);
        } else {
            setThumbnail('/img/no-image.png');
        }
    };

    const handleFileChange = (event) => {
        const newFiles = [...event.target.files];
        setFiles(newFiles);
    };

    return (
        <>
            <form encType='multipart/form-data' id='recruitForm' method='POST' className='job-listings' onSubmit={handleSubmit}>
                <input type="hidden" name="comNo" />
                <input type="hidden" name="remainQuantity" id="remainQuantity" />

                <div className='job-header'>
                    <div style={{ padding: '15px' }}> <strong>채용공고 등록</strong></div>
                </div>

                <div className='post-main'>
                    <div className="d-flex justify-content-start align-items-center" style={{ height: '75px' }}>
                        <div className="d-flex align-items-center me-5">
                            <div className='logo1'>
                                로고
                            </div>
                            <div>
                                <button type='button' className='btn-short file-upload-button1' onClick={handleFileUploadClick} >선택</button>
                                <button className="btn-short file-upload-button2" style={{ display: 'none' }}>삭제</button>
                            </div>
                        </div>

                        <div className="thumbnail-wrapper d-flex" style={{ height: '75px', width: '75px' }}>
                            <input ref={fileInputRef} type="file" name="thumbnail" id="thumbnail" className='file-input thumbnail-preview-recruit' accept='image/*' onChange={handleThumbnailChange} />
                            <img ref={thumbnailImg} src="/img/no-image.png" id='thumbnail-preview' className='thumbnail-preview-recruit' alt="이미지 없다" style={{ height: '100%', width: '100%' }} />
                        </div>
                    </div>

                    <div>제목</div>
                    <div>
                        <input
                            type="text"
                            name="recruitTitle"
                            placeholder='제목을 입력해주세요'
                            className="PostJobTitle input-none keyword-main"
                            value={recruitTitle}
                            onChange={(e) => setRecruitTitle(e.target.value)}
                        />
                    </div>
                    <div style={{ marginBottom: "15px" }}>keyword</div>
                    <div className="item d-flex justify-content-between">
                        <div className="keyword-span" id='outputContainer'>
                            <KeywordItem keywords={keyword} />
                        </div>
                        <div className="gap-2 d-flex">
                            <div className="d-flex justify-content-center">
                                <div className="d-flex justify-content-center">
                                    <input type="text" name="keyword" id="keyword"
                                        className="PostJobKeyWord p-1" placeholder='keyword'
                                        onKeyDown={handleKeywordKeyDown}
                                        onKeyUp={handleKeywordKeyUp} />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div>
                        <div>
                            <span>담당업무</span>
                            <div className="form-floating mb-3">
                                <input
                                    type="text"
                                    className="form-control w-100 keyword-main"
                                    name='recruitResponsibilities'
                                    id='floatingInput'
                                    placeholder='Example'
                                    value={recruitResponsibilities}
                                    onChange={(e) => setRecruitResponsibilities(e.target.value)}
                                />
                                <label htmlFor="floatingInput">EX: 개발자</label>
                            </div>
                        </div>
                        <div>
                            <span>자격조건</span>
                            <div className="form-floating mb-3">
                                <input
                                    type="text"
                                    className="form-control w-100 keyword-main"
                                    name='recruitQualifications'
                                    id='floatingInput'
                                    placeholder='Example'
                                    value={recruitQualifications}
                                    onChange={(e) => setRecruitQualifications(e.target.value)}
                                />
                                <label htmlFor="floatingInput">EX: 개발자</label>
                            </div>
                        </div>
                        <div>
                            <span>우대사항</span>
                            <div className="form-floating mb-3">
                                <input
                                    type="text"
                                    className="form-control w-100 keyword-main"
                                    name='recruitPreferredQualifications'
                                    id='floatingInput'
                                    placeholder='Example'
                                    value={recruitPreferredQualifications}
                                    onChange={(e) => setRecruitPreferredQualifications(e.target.value)}
                                />
                                <label htmlFor="floatingInput">EX: 개발자</label>
                            </div>
                        </div>
                        <div>
                            <span>기간</span>
                            <div className="form-floating mb-3">
                                <input
                                    type="text"
                                    className="form-control w-100 keyword-main"
                                    name='recruitRegDate'
                                    id='floatingInput'
                                    placeholder='Example'
                                    value={recruitRegDate}
                                    onChange={(e) => setRecruitRegDate(e.target.value)}
                                />
                                <label htmlFor="floatingInput">채용공고 기간을 적어주세요.</label>
                            </div>
                        </div>

                        <div>
                            <span>내용</span>
                            <div className="PostJobContents form-floating">
                                <textarea
                                    type="text"
                                    className="form-control w-100 h-100 keyword-main"
                                    name='recruitContent'
                                    id='floatingTextarea2'
                                    placeholder='Leave a comment here'
                                    value={recruitContent}
                                    onChange={(e) => setRecruitContent(e.target.value)}
                                />
                                <label htmlFor="floatingTextarea2">내용을 입력해주세요.</label>
                            </div>
                        </div>
                    </div>

                    <div className="d-flex justify-content-between">
                        <div className="file-input-wrapper w-100">
                            <div className='d-flex justify-content-between'>
                                <button type='button' className="btn-long file-upload-button" onClick={handleFileUploadClick2}>파일 첨부</button>
                                <BtnLong btnLongText={"등록"} onClick={handleSubmit} />
                            </div>
                            <div>
                                <input ref={fileInputRef2} onChange={handleFileChange} type="file" name="file" id="file-input" className="file-input hidden-file-input" multiple />
                                <div id='file-names' className="PostFileName mt-2">
                                    {files.map((file, index) => (
                                        <div key={index} className="file-name">
                                            {file.name}
                                            <span
                                                className="remove-file"
                                                role="button"
                                                onClick={() => deleteFile(index)}
                                                style={{ cursor: 'pointer', marginLeft: '10px' }}>
                                                X
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </form>
        </>
    )
}

export default Post_jobs_com;
