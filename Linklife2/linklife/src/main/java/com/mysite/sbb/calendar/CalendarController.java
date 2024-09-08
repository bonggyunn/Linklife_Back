package com.mysite.sbb.calendar;

import groovy.util.logging.Slf4j;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@Slf4j
@RequiredArgsConstructor
public class CalendarController {

    private final MinutesService minutesService;

    // 1. 회의록 생성
    @PostMapping(value = "/calendars/create")
    public Optional<Minutes> createMinutes(@RequestBody MinutesForm form) {
        Optional<Minutes> target = minutesService.create(form);
        return target;
    }

    // 1-2. 회의록 조회(전체)
    @GetMapping(value = "/calendars/watchAll")
    public List<Minutes> getAllMinutes() {
        List<Minutes> minutesList = minutesService.watchAll();
        return minutesList;
    }

    // 1-2. 회의록 조회(날짜)
    @GetMapping(value = "/calendars/watch")
    public Optional<Minutes> getMinutes(@RequestParam String date) {
        Optional<Minutes> minutes = minutesService.watch(date);
        if (minutes.isEmpty()) {
            System.out.println("NOT EXIST");
        }
        return minutes;
    }

    // 3. 수정
    @PatchMapping(value = "/calendars/edit")
    public Minutes editMinutes(@RequestParam String date, @RequestBody MinutesForm form) {
        Minutes minutes = minutesService.edit(date, form);
        return minutes;
    }

    // 4. 삭제
    @DeleteMapping(value = "/calendars/delete")
    public String deleteMinutes(@RequestParam String date) {
        minutesService.delete(date);
        return "Completely Deleted";
    }


}
