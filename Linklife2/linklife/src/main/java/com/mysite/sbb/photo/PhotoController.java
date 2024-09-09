package com.mysite.sbb.photo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.time.LocalDateTime;
import java.time.temporal.ChronoField;

@RestController
@RequestMapping("/image/api")
public class PhotoController {

    private final PhotoService photoService;

    @Autowired
    public PhotoController(PhotoService photoService) {
        this.photoService = photoService;
    }

    @PostMapping
    public ResponseEntity<String> imageUpload(@RequestParam("image") MultipartFile image) {
        if (image.isEmpty()) {
            return new ResponseEntity<>("Image is empty", HttpStatus.BAD_REQUEST);
        }

        // 폴더 생성과 파일명 새로 부여를 위한 현재 시간 알아내기
        LocalDateTime now = LocalDateTime.now();
        int year = now.getYear();
        int month = now.getMonthValue();
        int day = now.getDayOfMonth();
        int hour = now.getHour();
        int minute = now.getMinute();
        int second = now.getSecond();
        int millis = now.get(ChronoField.MILLI_OF_SECOND);

        String absolutePath = "C:\\Users\\LinkLife\\"; // 파일이 저장될 절대 경로
        String newFileName = "image" + hour + minute + second + millis; // 새로 부여한 이미지명
        String fileExtension = '.' + image.getOriginalFilename().replaceAll("^.*\\.(.*)$", "$1"); // 정규식 이용하여 확장자만 추출
        String path = "images/test/" + year + "/" + month + "/" + day; // 저장될 폴더 경로

        try {
            File directory = new File(absolutePath + path);
            if (!directory.exists()) {
                directory.mkdirs(); // 폴더 생성
            }

            File file = new File(absolutePath + path + "/" + newFileName + fileExtension);
            image.transferTo(file); // 이미지 저장

            PhotoDTO photoDTO = PhotoDTO.builder()
                    .originImageName(image.getOriginalFilename())
                    .imagePath(path)
                    .imageName(newFileName + fileExtension)
                    .build();

            Long imageNo = photoService.saveImage(photoDTO.toEntity()); // 이미지 저장

            // 저장된 이미지의 URL 반환
            String imageUrl = "http://localhost:8200/image/api/" + imageNo;
            return ResponseEntity.ok(imageUrl);
        } catch (IOException e) {
            e.printStackTrace();
            return new ResponseEntity<>("Failed to upload image", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/photo")
    public String showPhotoUploadForm() {
        return "imageUpload";
    }
}
