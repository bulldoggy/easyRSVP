package com.easyrsvpgroup.easyrsvp.repository;

import com.easyrsvpgroup.easyrsvp.model.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StudentRepository extends JpaRepository<Student,Integer> {
}
