package com.Tuito_App.dto;

public class SignupRequest {
    private String email;
    private String phone;
    private String password; 
    private String firebaseUid;
  
    private String userName;
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getFirebaseUid() {
		return firebaseUid;
	}
	public void setFirebaseUid(String firebaseUid) {
		this.firebaseUid = firebaseUid;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public String getPhone() {
		return phone;
	}
	public void setPhone(String phone) {
		this.phone = phone;
	}
	public String getUserName() {
		return userName;
	}
	public void setUserName(String userName) {
		this.userName = userName;
	} 
}
