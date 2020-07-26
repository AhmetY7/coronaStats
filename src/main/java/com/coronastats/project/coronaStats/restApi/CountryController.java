package com.coronastats.project.coronaStats.restApi;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.coronastats.project.coronaStats.Entities.Country;
import com.coronastats.project.coronaStats.Service.ICountryService;

@RestController
@RequestMapping("/api")
public class CountryController {
	
	private ICountryService countryService;

	@Autowired
	public CountryController(ICountryService countryService) {
		this.countryService = countryService;
	}
	
	@GetMapping("/countries")
	public List<Country> get() {
		return countryService.getAll();
	}
}
