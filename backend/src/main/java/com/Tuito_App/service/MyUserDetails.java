package com.Tuito_App.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.Tuito_App.model.MyUser;
import com.Tuito_App.model.UserPrincipal;
import com.Tuito_App.repository.UserRepository;

@Service
public class MyUserDetails  implements UserDetailsService{
	@Autowired
	private UserRepository userRepository;
	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
	    MyUser user = userRepository.findByEmail(username)
	        .orElseThrow(() -> new UsernameNotFoundException("User not found with email: " + username));
	    
	    return new UserPrincipal(user);
	}

}
