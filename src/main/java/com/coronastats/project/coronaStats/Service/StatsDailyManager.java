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
	public StatsDaily getById(int id) {
		return this.statsDailyDal.getById(id);
	}

	@Override
	@Transactional
	public List<StatsDaily> getByCountryId(int countryId) {
		return this.statsDailyDal.getByCountryId(countryId);
	}
	
	@Override
	@Transactional
	public StatsDaily worldwideTotal() {
		return this.statsDailyDal.worldwideTotal();
	}

	@Override
	@Transactional
	public List<StatsDaily> countryTotal() {
		return this.statsDailyDal.countryTotal();
	}
	
	@Override
	@Transactional
	public List<StatsDaily> worldwideTotalDayByDay() {
		List<StatsDaily> worldTotalDayByDay = this.statsDailyDal.worldwideTotalDayByDay();
		for(int i=1; i < worldTotalDayByDay.size(); i++) {
			worldTotalDayByDay.get(i).setInfected(worldTotalDayByDay.get(i-1).getInfected() + worldTotalDayByDay.get(i).getInfected());
			worldTotalDayByDay.get(i).setRecovered(worldTotalDayByDay.get(i-1).getRecovered() + worldTotalDayByDay.get(i).getRecovered());
			worldTotalDayByDay.get(i).setDeath(worldTotalDayByDay.get(i-1).getDeath() + worldTotalDayByDay.get(i).getDeath());
		}
		return worldTotalDayByDay;
	}

	@Override
	@Transactional
	public List<StatsDaily> countryTotalDayByDay() {
		List<StatsDaily> countryDayByDay = this.statsDailyDal.countryTotalDayByDay();
		for(int i=1; i < countryDayByDay.size(); i++) {
			if(countryDayByDay.get(i).getCountryId() == countryDayByDay.get(i-1).getCountryId()) {
				countryDayByDay.get(i).setInfected(countryDayByDay.get(i).getInfected() + countryDayByDay.get(i-1).getInfected());
				countryDayByDay.get(i).setRecovered(countryDayByDay.get(i).getRecovered() + countryDayByDay.get(i-1).getRecovered());
				countryDayByDay.get(i).setDeath(countryDayByDay.get(i).getDeath() + countryDayByDay.get(i-1).getDeath());
			}
		}
		return countryDayByDay;
	}

	@Override
	@Transactional
	public void add(StatsDaily statsDaily) {
		this.statsDailyDal.add(statsDaily);
		
	}

	@Override
	@Transactional
	public void update(StatsDaily statsDaily) {
		this.statsDailyDal.update(statsDaily);
		
	}

	@Override
	@Transactional
	public void delete(StatsDaily statsDaily) {
		this.statsDailyDal.delete(statsDaily);
		
	}

}
