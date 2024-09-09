package com.mysite.sbb.calendar;

import groovy.util.logging.Slf4j;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@Slf4j
@RequiredArgsConstructor
public class MinutesService {

    private final MinutesRepository minutesRepository;

    @Transactional
    public Optional<Minutes> create(MinutesForm dto) {
        Minutes minutes = minutesRepository.save(dto.toEntity());
        Optional<Minutes> target = minutesRepository.findById(minutes.getId());
        return target;
    }

    @Transactional
    public List<Minutes> watchAll() {
        return minutesRepository.findAll();
    }

    @Transactional
    public Optional<Minutes> watch(String date) {
        Optional<Minutes> minutes = minutesRepository.findByDate(date);
        return minutes;
    }

    @Transactional
    public Minutes edit(String date, MinutesForm dto) {
        // 입력한 날짜 date가 repository에 존재할 경우 edit, orElseThrow
        Minutes minutes = minutesRepository.findByDate(date).orElse(null);
        minutes.update(dto.getTitle(), dto.getContent(), dto.getUserId());
        return minutes;
    }

    @Transactional
    public void delete(String date) {
        Minutes minutes = minutesRepository.findByDate(date).orElse(null);
        minutesRepository.delete(minutes);
    }
}
