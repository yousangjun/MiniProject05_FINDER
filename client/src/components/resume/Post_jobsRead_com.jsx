import React from 'react'
import './css/Post_job.css'
import BtnLong from '../main/BtnLong'

const Post_jobs_com = () => {
    return (
        <>
        <form encType='multipart/form-data' id='recruitForm' method='POST' className='job-listings'>
            <input type="hidden" name="comNo"/>
            <input type="hidden" name="remainQuantity" id="remainQuantity"/>

            <div className='job-header'>
                <div style={{padding: '15px'}}> <strong>채용공고 수정</strong></div>
            </div>

            <div className='post-main'>
                <div className="d-flex justify-content-start align-items-center" style={{height: '75px'}}>
                    <div className="d-flex align-items-center me-5">
                        <div className='logo1'>
                            로고
                        </div>
                        <div>
                            <button className='btn-short file-upload-button1'>선택</button>
                            <button class="btn-short file-upload-button2" style={{display: 'none'}}>삭제</button>
                        </div>
                    </div>

                    <div className="thumbnail-wrapper d-flex">
                        <input type="file" name="thumbnail" id="thumbnail" className='file-input thumbnail-preview-recruit' accept='image/*'/>
                        <img src="/img/no-image.png" id='thumbnail-preview' className='thumbnail-preview-recruit' alt="이미지 없다" />
                    </div>
                </div>

                <div>제목</div>
                <div>
                    <input type="text" name="recruitTitle" placeholder='제목을 입력해주세요' className="PostJobTitle input-none keyword-main" />
                </div>
                <div>keyword</div>
                <div className="item d-flex justify-content-between">
                    <div className="keyword-span" id='outputContainer'>

                    </div>
                    <div className="gap-2 d-flex">
                        <div className="d-flex justify-content-center">
                            <div className="d-flex justify-content-center">
                                <input type="text" name="keyword" id="keyword" className="PostJobKeyWord p-1" placeholder='keyword'/>    
                            </div>
                        </div>
                    </div>
                </div>

                <div>
                    <div>
                        <span>담당업무</span>
                        <div className="form-floating mb-3">
                            <input type="text" className="form-control w-100 keyword-main"
                            name='recruitResponsibilities' id='floatingInput' placeholder='Example'/>
                            <label htmlFor="floatingInput">EX: 개발자</label>
                        </div>
                    </div>
                    <div>
                        <span>자격조건</span>
                        <div className="form-floating mb-3">
                            <input type="text" className="form-control w-100 keyword-main"
                            name='recruitQualifications' id='floatingInput' placeholder='Example'/>
                            <label htmlFor="floatingInput">EX: 개발자</label>
                        </div>
                    </div>
                    <div>
                        <span>우대사항</span>
                        <div className="form-floating mb-3">
                            <input type="text" className="form-control w-100 keyword-main"
                            name='recruitPreferredQualifications' id='floatingInput' placeholder='Example'/>
                            <label htmlFor="floatingInput">EX: 개발자</label>
                        </div>
                    </div>
                    <div>
                        <span>기간</span>
                        <div className="form-floating mb-3">
                            <input type="text" className="form-control w-100 keyword-main"
                            name='recruitRegDate' id='floatingInput' placeholder='Example'/>
                            <label htmlFor="floatingInput">채용공고 기간을 적어주세요.</label>
                        </div>
                    </div>

                    <div>
                    <span>내용</span>
                        <div className="PostJobContents form-floating">
                            <textarea type="text" className="form-control w-100 h-100 keyword-main"
                            name='recruitContent' id='floatingTextarea2' placeholder='Leave a comment here'/>
                            <label htmlFor="floatingTextarea2">내용을 입력해주세요.</label>
                        </div>
                    </div>
                </div>

                <div className="d-flex justify-content-between">
                    <div className="file-input-wrapper w-100">
                        <div className='d-flex justify-content-between'>
                            <button className="btn-long file-upload-button">파일 첨부</button>
                            <div class="d-flex gap-3">
                                <BtnLong btnLongText={"수정"}/>
                                <BtnLong btnLongText={"삭제"}/>
                            </div>
                        </div>
                        <div>
                            <input type="file" name="file" id="file-input" className="file-input hidden-file-input" multiple/>
                            <div id='file-names' className="PostFileName mt-2">
                                {/*      <th:block th:each="file : ${fileList}">
                                            <div class="file-name d-flex">
                                                <span th:text="${file.originName}"></span>
                                                <span class="remove-file" role="button"
                                                    th:onclick="|deleteFile(event, ${file.fileNo})|"
                                                    style="text-align: center; display: inline-block">X</span>
                                            </div>
                                        </th:block> */}
                            </div>
                        </div>
                        
                    </div>
                </div>
            </div>
        </form>
        </>
    )
}

export default Post_jobs_com