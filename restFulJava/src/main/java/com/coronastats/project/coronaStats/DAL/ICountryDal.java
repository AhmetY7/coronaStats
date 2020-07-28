package com.coronastats.project.coronaStats.DAL;

import java.util.List;
import com.coronastats.project.coronaStats.Entities.Country;

public interface ICountryDal {
	List<Country> getAll();
}
