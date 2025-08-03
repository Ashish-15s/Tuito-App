package com.Tuito_App.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.Tuito_App.dto.LoginRequest;
import com.Tuito_App.dto.SignupRequest;
import com.Tuito_App.model.MyUser;
import com.Tuito_App.repository.UserRepository;

@Service
public class AuthService {
	@Autowired
	private UserRepository userRepository;

	@Autowired
	AuthenticationManager authenticationManager;

	@Autowired
	JwtService jwtService;

	private BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder(12);
//	@Autowired
//	private JwtUtil jwtUtil;

	public String signup(SignupRequest request) {
		if (userRepository.findByEmail(request.getEmail()).isPresent()) {
			throw new RuntimeException("Email already exists");
		}

		try {

			MyUser user = new MyUser();
			user.setEmail(request.getEmail());
			
			user.setPassword(passwordEncoder.encode(request.getPassword()));
			System.out.println("Username: " + request.getEmail());
			user.setUserName(request.getUserName());


	        userRepository.save(user);
	        
			return "Signup successful!";
		} catch (Exception e) {
			throw new RuntimeException("Error while creating user");
		}
	}

	public String verify(LoginRequest user) {
		Authentication authentication = authenticationManager
				.authenticate(new UsernamePasswordAuthenticationToken(user.getEmail(), user.getPassword()));

		if (!authentication.isAuthenticated()) {
			throw new RuntimeException("Invalid credentials");
		}
		return jwtService.generateToken(user.getEmail());
	}

//	public String login(LoginRequest request) {
//		MyUser user = userRepository.findByEmail(request.getEmail())
//				.orElseThrow(() -> new RuntimeException("User not found"));
//
//		if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
//			throw new RuntimeException("Invalid credentials");
//		}
//
//		// TODO: Generate and return JWT token
//		return jwtUtil.generateToken(user.getEmail());
//	}

}