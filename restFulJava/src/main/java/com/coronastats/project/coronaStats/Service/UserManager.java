package com.coronastats.project.coronaStats.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.coronastats.project.coronaStats.DAL.IUserDal;
import com.coronastats.project.coronaStats.Entities.User;

@Service
public class UserManager implements IUserService {
	
	private IUserDal userDal;
	
	@Autowired
	public UserManager(IUserDal userDal) {
		this.userDal = userDal;
	}


	@Override
	public User getUser() {
		return this.userDal.getUser();
	}

}
