package com.Tuito_App.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.Tuito_App.filter.JwtFilter;
import com.Tuito_App.service.MyUserDetails;

@Configuration
public class SecurityConfig {

    @Autowired
    MyUserDetails userDetailsService;
	
    @Autowired
    JwtFilter jwtFilter;
    
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .csrf(customizer->customizer.disable())
            .authorizeHttpRequests(auth -> auth
            	.requestMatchers("/api/auth/signup", "/api/auth/login").permitAll()
                .anyRequest().authenticated()
            )
            .httpBasic(Customizer.withDefaults())
            .sessionManagement(sess -> sess.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);
        return http.build();
    }
    
//    @Bean
//    public AuthenticationProvider authenticationProvider(AuthenticationConfiguration config) throws Exception {
//    	DaoAuthenticationProvider provider= new DaoAuthenticationProvider();
//    	provider.setPasswordEncoder(passwordEncoder());
//    	provider.setUserDetailsService(userDetailsService);
//    	
//        return provider;
//    }
    
//    @Bean
//    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
//    	return config.getAuthenticationManager();
//    }

//    @Bean
//    public UserDetailsService userDetailsService() {
//        return new CustomUserDetailsService(); // or use a lambda or in-memory user
//    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder(12);
    }
    
    @Bean
    public AuthenticationManager authenticationManager(HttpSecurity http) throws Exception {
        AuthenticationManagerBuilder authBuilder = http.getSharedObject(AuthenticationManagerBuilder.class);
        authBuilder
            .userDetailsService(userDetailsService)
            .passwordEncoder(passwordEncoder());
        return authBuilder.build();
    }



}