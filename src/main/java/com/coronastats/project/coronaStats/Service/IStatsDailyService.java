package com.coronastats.project.coronaStats.Service;

import java.util.List;

import com.coronastats.project.coronaStats.Entities.StatsDaily;

public interface IStatsDailyService {
	List<StatsDaily> getAll();
	List<StatsDaily> getById(int id);
	void add(StatsDaily statsDaily);
	void update(StatsDaily statsDaily);
	void delete(StatsDaily statsDaily);
}
