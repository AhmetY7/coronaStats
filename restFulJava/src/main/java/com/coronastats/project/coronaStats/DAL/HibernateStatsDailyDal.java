package com.coronastats.project.coronaStats.DAL;

import java.sql.Date;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.EntityManager;

import org.hibernate.Session;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.coronastats.project.coronaStats.Entities.StatsDaily;

@Repository
public class HibernateStatsDailyDal implements IStatsDailyDal {
	private EntityManager entityManager;
	
	@Autowired
	public HibernateStatsDailyDal(EntityManager entityManager) {
		this.entityManager = entityManager;
	}

	@Override
	@Transactional
	public List<StatsDaily> getAll() {
		Session session = entityManager.unwrap(Session.class);
		List<StatsDaily> statsDaily = session.createQuery("from StatsDaily", StatsDaily.class).getResultList();
		return statsDaily;
	}

	@Override
	@Transactional
	public StatsDaily getById(int id) {
		Session session = entityManager.unwrap(Session.class);
		StatsDaily statOfCountry = session.createQuery("from StatsDaily s where s.id= :id", StatsDaily.class).setParameter("id", id).getSingleResult();
		return statOfCountry;
	}

	@Override
	@Transactional
	public List<StatsDaily> getByCountryId(int countryId) {
		Session session = entityManager.unwrap(Session.class);
		List<StatsDaily> statsOfCountry = session.createQuery("from StatsDaily s where s.countryId= :countryId", StatsDaily.class).setParameter("countryId", countryId).getResultList();
		return statsOfCountry;
	}
	
	@Override
	@Transactional
	public StatsDaily worldwideTotal() {
		Session session = entityManager.unwrap(Session.class);
		Object[] worldTotalObject = session.createQuery("select s.id, s.countryId, s.date, SUM(s.infected), SUM(s.recovered), SUM(s.death) from StatsDaily s", Object[].class).getSingleResult();
		StatsDaily worldTotal = new StatsDaily();
		worldTotal.setId((int)worldTotalObject[0]);
		worldTotal.setCountryId((int)worldTotalObject[1]);
		worldTotal.setDate((Date)worldTotalObject[2]);
		worldTotal.setInfected(((Long)worldTotalObject[3]).intValue());
		worldTotal.setRecovered(((Long)worldTotalObject[4]).intValue());
		worldTotal.setDeath(((Long)worldTotalObject[5]).intValue());
		return worldTotal;
	}

	@Override
	@Transactional
	public List<StatsDaily> countryTotal() {
		Session session = entityManager.unwrap(Session.class);
		List<Object[]> countryTotalObject = session.createQuery("select s.id, s.countryId, s.date, SUM(s.infected) as infected,SUM(s.recovered) as recovered,SUM(s.death) as death from StatsDaily s GROUP BY s.countryId ORDER BY s.infected DESC", Object[].class).getResultList();
		List<StatsDaily> countryTotal = new ArrayList<>();
		for(Object[] row : countryTotalObject) {
			System.out.println(row[0].getClass().getName() + "-" + row[1].getClass().getName() + "-" + row[2].getClass().getName() + "-" + row[3].getClass().getName() + "-" + row[4].getClass().getName() + "-" + row[5].getClass().getName());
			StatsDaily stats = new StatsDaily();
			stats.setId((int)row[0]);
			stats.setCountryId((int)row[1]);
			stats.setDate((Date)row[2]);
			stats.setInfected(((Long)row[3]).intValue());
			stats.setRecovered(((Long)row[4]).intValue());
			stats.setDeath(((Long)row[5]).intValue());
			countryTotal.add(stats);
		}
		return countryTotal;
	}
	
	@Override
	@Transactional
	public List<StatsDaily> worldwideTotalDayByDay() {
		Session session = entityManager.unwrap(Session.class);
		List<Object[]> worldDayByDayHelper = session.createQuery("select s.id, s.countryId, s.date, SUM(s.infected) as infected,SUM(s.recovered) as recovered,SUM(s.death) as death from StatsDaily s GROUP BY s.date ORDER BY s.date", Object[].class).getResultList();
		List<StatsDaily> worldDayByDay = new ArrayList<>();
		for(Object[] row : worldDayByDayHelper) {
			StatsDaily stats = new StatsDaily();
			stats.setId((int)row[0]);
			stats.setCountryId((int)row[1]);
			stats.setDate((Date)row[2]);
			stats.setInfected(((Long)row[3]).intValue());
			stats.setRecovered(((Long)row[4]).intValue());
			stats.setDeath(((Long)row[5]).intValue());
			worldDayByDay.add(stats);
		}
		return worldDayByDay;
	}

	@Override
	@Transactional
	public List<StatsDaily> countryTotalDayByDay() {
		Session session = entityManager.unwrap(Session.class);
		List<Object[]> countryDayByDayHelper = session.createQuery("select s.id, s.countryId, s.date, SUM(s.infected) as infected,SUM(s.recovered) as recovered,SUM(s.death) as death from StatsDaily s GROUP BY s.countryId,s.date ORDER BY s.countryId", Object[].class).getResultList();
		List<StatsDaily> countryDayByDay = new ArrayList<>();
		for(Object[] row : countryDayByDayHelper) {
			StatsDaily stats = new StatsDaily();
			stats.setId((int)row[0]);
			stats.setCountryId((int)row[1]);
			stats.setDate((Date)row[2]);
			stats.setInfected(((Long)row[3]).intValue());
			stats.setRecovered(((Long)row[4]).intValue());
			stats.setDeath(((Long)row[5]).intValue());
			countryDayByDay.add(stats);
		}
		return countryDayByDay;
	}

	@Override
	@Transactional
	public void add(StatsDaily statsDaily) {
		Session session = entityManager.unwrap(Session.class);
		session.saveOrUpdate(statsDaily);
	}

	@Override
	@Transactional
	public void update(StatsDaily statsDaily) {
		Session session = entityManager.unwrap(Session.class);
		session.saveOrUpdate(statsDaily);
	}

	@Override
	@Transactional
	public void delete(StatsDaily statsDaily) {
		Session session = entityManager.unwrap(Session.class);
		StatsDaily statsToDelete = session.get(StatsDaily.class, statsDaily.getId());
		session.delete(statsToDelete);
	}

}
