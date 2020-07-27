package com.coronastats.project.coronaStats.Service;

import java.util.List;

import com.coronastats.project.coronaStats.Entities.StatsDaily;

public interface IStatsDailyService {
	List<StatsDaily> getAll();
	List<StatsDaily> getByCountryId(int countryId);
	
	List<StatsDaily> worldwideTotal(); // dünya geneli selectbox için istatistikler
	List<StatsDaily> countryTotal(); // soldaki tablo için ve ortadaki tablo için
	
	// Alttaki çizelge için tam istenen tablolar değil ama istenene yakın bu nedenle tabloyu alıp kod ile düzenledik
	List<StatsDaily> worldwideTotalDayByDay();
	List<StatsDaily> countryTotalDayByDay();
	
	StatsDaily getById(int id);
		
	void add(StatsDaily statsDaily);
	void update(StatsDaily statsDaily);
	void delete(StatsDaily statsDaily);
}
