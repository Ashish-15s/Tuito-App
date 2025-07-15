package com.Tuito_App.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.Tuito_App.model.Student;
import com.Tuito_App.repository.StudentRepository;

@Service
public class StudentService {

    @Autowired
    private StudentRepository studentRepository;

    // Add student
    public Student addStudent(Student student) {
        return studentRepository.save(student);
    }

    // Get all students
    public List<Student> getAllStudents() {
        return studentRepository.findAll();
    }

    // Get student by ID
    public Optional<Student> getStudentById(Long id) {
        return studentRepository.findById(id);
    }

    // Update student
    public Optional<Student> updateStudent(Long id, Student updatedStudent) {
        return studentRepository.findById(id).map(existing -> {
        	
            existing.setName(updatedStudent.getName());
            existing.setStandard(updatedStudent.getStandard());
            existing.setFee(updatedStudent.getFee());
            existing.setPaid(updatedStudent.isPaid());
            existing.setPhone(updatedStudent.getPhone());
            return studentRepository.save(existing);
        });
    }

    // Delete student
    public boolean deleteStudent(Long id) {
        return studentRepository.findById(id).map(student -> {
            studentRepository.delete(student);
            return true;
        }).orElse(false);
    }
}
