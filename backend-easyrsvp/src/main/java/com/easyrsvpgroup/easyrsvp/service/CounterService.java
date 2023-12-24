package com.easyrsvpgroup.easyrsvp.service;

import com.easyrsvpgroup.easyrsvp.model.Counter;

public interface CounterService {
    public Counter getCount(int counterId);
    public Counter addCount(int counterId);
}
