package com.mysite.sbb.calendar;

import org.springframework.data.repository.CrudRepository;

import java.util.ArrayList;
import java.util.Optional;

public interface MinutesRepository extends CrudRepository<Minutes, Long> {

    @Override
    ArrayList<Minutes> findAll();

    Optional<Minutes> findByDate(String date);
}
