package com.finder.project.main.controller;

import java.io.FileInputStream;

import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.bind.annotation.RequestMapping;

import com.finder.project.main.dto.Files;
import com.finder.project.main.service.FileService;

import lombok.extern.slf4j.Slf4j;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;



@Slf4j
@Controller
@RequestMapping("/file")
public class FileController {
    @Autowired
    private FileService fileService;

    @Value("${upload.path}")
    private String uploadPath;
    
    /**
     * 파일 다운로드
     * @param fileNo
     * @param response
     * @throws Exception
     */
    
    @GetMapping("/{fileNo}")
    public void fileDownload(@PathVariable("fileNo") int fileNo
                            , HttpServletResponse response) throws Exception {
        Files downloadFile = fileService.downFile(fileNo);
        
        //파일 없다면
        if (downloadFile == null) {
            return;
        }

        //파일 경로, 파일명
        String filePath = downloadFile.getFilePath();
        String fileName = downloadFile.getFileName();

        //다운로드를 위한 응답헤더
        // - ContentType            : application/octect-stream
        // - Content-Disposition    : attachment, filename="파일명.확장자"
        response.setContentType(MediaType.APPLICATION_OCTET_STREAM_VALUE);
        response.setHeader("Content-Disposition"
                         ,"attachment; filename=\"" + fileName + "\"");

        //파일 다운로드
        java.io.File file = new java.io.File(filePath);
        FileInputStream fis = new FileInputStream(file);        // 파일 출력
        ServletOutputStream sos = response.getOutputStream();   // 파일 경로
        FileCopyUtils.copy(fis, sos);

        fis.close();
        sos.close();

        return;
    }
    
    /**
     * 파일삭제
     * @param fileNo
     * @return
     * @throws Exception
     */
    @DeleteMapping("/{fileNo}")
    public ResponseEntity<String> deleteFile(@PathVariable("fileNo") int fileNo) throws Exception{
        //파일 삭제 요청
        int result = fileService.delete(fileNo);

        //삭제 성공
        if (result > 0) {
            return new ResponseEntity<String>("SUCCESS", HttpStatus.OK);
        }
        //실패
        return new ResponseEntity<>("Fail", HttpStatus.OK);
    }


    @GetMapping("/img/{no}")
    public ResponseEntity<byte[]> thumbnail_img(@PathVariable("no") int no) throws Exception{
        //번호로 파일정보 조회
        Files file = fileService.select(no);

        //Null체크
        if (file == null) {
            //이미지 없을시
            String filePath = uploadPath + "/no-img.png";
            java.io.File noImageFile = new java.io.File(filePath);
            byte[] noImageFileData = FileCopyUtils.copyToByteArray(noImageFile);
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.IMAGE_JPEG);
            return new ResponseEntity<>(noImageFileData, headers, HttpStatus.OK);
        }

        //파일 정보 중 파일 경로 가지오기
        String filePath = file.getFilePath();

        //파일 객체 생성
        java.io.File f = new java.io.File(filePath);

        //파일 데이터
        byte[] fileData = FileCopyUtils.copyToByteArray(f);

        // 이미지 컨텐츠 타입 지정
        HttpHeaders headers = new HttpHeaders();
        String contentType = MediaType.IMAGE_JPEG_VALUE; 
        String fileExtension = "jpg"; // 파일 확장자
        if (fileExtension.equalsIgnoreCase("png")) {
            contentType = MediaType.IMAGE_PNG_VALUE; // PNG로 설정
        } else if (fileExtension.equalsIgnoreCase("jpg") || fileExtension.equalsIgnoreCase("jpeg")) {
            contentType = MediaType.IMAGE_JPEG_VALUE; // JPEG로 설정
        }
        headers.setContentType(MediaType.valueOf(contentType));


        //데이터 헤더 상태코드
        return new ResponseEntity<>(fileData, headers, HttpStatus.OK);
    }

    // 이력서 번호로 파일 조회
    @GetMapping("/img/cv/{cvNo}")
    public ResponseEntity<byte[]> thumbnail_cv_img(@PathVariable("cvNo") int cvNo) throws Exception{

        Files file = new Files();
        file.setParentTable("resume");
        file.setParentNo(cvNo);
        file.setCvNo(cvNo);
        //번호로 파일정보 조회
        file = fileService.listByCVParentThumbnail(file);
        log.info("file : " + file);
        // Files file = fileService.select(no);

        //Null체크
        if (file == null) {
            //이미지 없을시
            String filePath = uploadPath + "/no-img.png";
            java.io.File noImageFile = new java.io.File(filePath);
            byte[] noImageFileData = FileCopyUtils.copyToByteArray(noImageFile);
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.IMAGE_JPEG);
            return new ResponseEntity<>(noImageFileData, headers, HttpStatus.OK);
        }

        //파일 정보 중 파일 경로 가지오기
        String filePath = file.getFilePath();

        //파일 객체 생성
        java.io.File f = new java.io.File(filePath);

        //파일 데이터
        byte[] fileData = FileCopyUtils.copyToByteArray(f);

        // 이미지 컨텐츠 타입 지정
        HttpHeaders headers = new HttpHeaders();
        String contentType = MediaType.IMAGE_JPEG_VALUE; 
        String fileExtension = "jpg"; // 파일 확장자
        if (fileExtension.equalsIgnoreCase("png")) {
            contentType = MediaType.IMAGE_PNG_VALUE; // PNG로 설정
        } else if (fileExtension.equalsIgnoreCase("jpg") || fileExtension.equalsIgnoreCase("jpeg")) {
            contentType = MediaType.IMAGE_JPEG_VALUE; // JPEG로 설정
        }
        headers.setContentType(MediaType.valueOf(contentType));


        //데이터 헤더 상태코드
        return new ResponseEntity<>(fileData, headers, HttpStatus.OK);
    }
    
    
}
