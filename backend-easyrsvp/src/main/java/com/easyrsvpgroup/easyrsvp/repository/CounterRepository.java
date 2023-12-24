package com.easyrsvpgroup.easyrsvp.repository;

import com.easyrsvpgroup.easyrsvp.model.Counter;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CounterRepository extends JpaRepository<Counter, Integer> {}
