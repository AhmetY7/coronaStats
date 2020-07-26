package com.coronastats.project.coronaStats.Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.coronastats.project.coronaStats.DAL.IStatsDailyDal;
import com.coronastats.project.coronaStats.Entities.StatsDaily;

@Service
public class StatsDailyManager implements IStatsDailyService {
	
	private IStatsDailyDal statsDailyDal;
	
	@Autowired
	public StatsDailyManager(IStatsDailyDal statsDailyDal) {
		this.statsDailyDal = statsDailyDal;
	}

	@Override
	@Transactional
	public List<StatsDaily> getAll() {
		return this.statsDailyDal.getAll();
	}

	@Override
	@Transactional
	public List<StatsDaily> getById(int id) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	@Transactional
	public void add(StatsDaily statsDaily) {
		// TODO Auto-generated method stub
		
	}

	@Override
	@Transactional
	public void update(StatsDaily statsDaily) {
		// TODO Auto-generated method stub
		
	}

	@Override
	@Transactional
	public void delete(StatsDaily statsDaily) {
		// TODO Auto-generated method stub
		
	}

}
