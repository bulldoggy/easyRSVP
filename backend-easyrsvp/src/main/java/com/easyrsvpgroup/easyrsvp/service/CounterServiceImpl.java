package com.easyrsvpgroup.easyrsvp.service;

import com.easyrsvpgroup.easyrsvp.model.Counter;
import com.easyrsvpgroup.easyrsvp.repository.CounterRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigInteger;

@Service
public class CounterServiceImpl implements CounterService {

    @Autowired
    private CounterRepository counterRepository;

    @Override
    public Counter getCount(int counterId) {
        return counterRepository.findById(counterId).get();
    }

    public Counter addCount(int counterId) {
        Counter c = counterRepository.findById(counterId).get();
        c.setCounterCount(c.getCounterCount().add(BigInteger.ONE));

        return counterRepository.save(c);
    }
}
