package com.Tuito_App.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.Tuito_App.model.Student;

@Repository
public interface StudentRepository extends JpaRepository<Student, Long> {

}
