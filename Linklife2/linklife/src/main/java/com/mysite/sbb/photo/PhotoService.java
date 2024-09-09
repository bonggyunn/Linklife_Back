package com.mysite.sbb.photo;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class PhotoService {

    private final PhotoRepository photoRepository;

    @Transactional
    public Long saveImage(PhotoEntity photoEntity) {
        return photoRepository.save(photoEntity).getImageNo();

    }
}
