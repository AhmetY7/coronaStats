package com.coronastats.project.coronaStats.Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.coronastats.project.coronaStats.DAL.ICountryDal;
import com.coronastats.project.coronaStats.Entities.Country;

@Service
public class CountryManager implements ICountryService {

	private ICountryDal countryDal;
	
	@Autowired
	public CountryManager(ICountryDal countryDal) {
		this.countryDal = countryDal;
	}


	@Override
	@Transactional
	public List<Country> getAll() {
		// TODO Auto-generated method stub
		return this.countryDal.getAll();
	}

}
