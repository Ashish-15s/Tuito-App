package com.Tuito_App.service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.Tuito_App.model.Student;
import com.Tuito_App.repository.StudentRepository;

@Service
public class StudentService {

	@Autowired
	private StudentRepository studentRepository;

	@Scheduled(cron = "0 0 0 * * ?")
//	  @Scheduled(cron = "*/10 * * * * *")
	public void updateFeeByDate() {
		int day = LocalDate.now().getDayOfMonth();
		List<Student> studentList = studentRepository.findByDueDate(day);
		
		System.out.print(studentList);
		if (studentList != null)
			studentList.forEach(item -> {

				item.setDueFee(item.getFee()+item.getDueFee());
				studentRepository.save(item);

			});

	}

	// Add student
	public Student addStudent(Student student) {
		String userEmail = SecurityContextHolder.getContext().getAuthentication().getName();
		if(student.getDueDate()==31) student.setDueDate(30);
		student.setUserEmail(userEmail);
		return studentRepository.save(student);
	}

	// Get all students
	public List<Student> getAllStudents() {
		String userEmail = SecurityContextHolder.getContext().getAuthentication().getName();
		return studentRepository.findByUserEmail(userEmail);
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
			existing.setDueDate(updatedStudent.getDueDate());
			existing.setDueFee(updatedStudent.getDueFee());
			
			return studentRepository.save(existing);
		});
	}

	public Optional<Student> togglePaidStatus(Long id) {
		return studentRepository.findById(id).map(existing -> {
			existing.setPaid(!existing.isPaid());
			existing.setDueFee(0);
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
