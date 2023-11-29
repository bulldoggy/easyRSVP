package com.easyrsvpgroup.easyrsvp.service;

import com.easyrsvpgroup.easyrsvp.model.Student;
import java.util.List;

public interface StudentService {
    public Student saveStudent(Student student);
    public List<Student> getAllStudents();
}
