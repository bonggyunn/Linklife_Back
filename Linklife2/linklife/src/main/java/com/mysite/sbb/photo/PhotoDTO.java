package com.mysite.sbb.photo;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@Builder
public class PhotoDTO {

    private String originImageName;
    private String imageName;
    private String imagePath;

    //    @Builder
    public PhotoEntity toEntity() {
        PhotoEntity build = PhotoEntity.builder()
                .originImageName(originImageName)
                .imageName(imageName)
                .imagePath(imagePath)
                .build();
        return build;
    }

    @Builder
    public PhotoDTO(String originImageName, String imageName, String imagePath) {
        this.originImageName = originImageName;
        this.imageName = imageName;
        this.imagePath = imagePath;
    }

}