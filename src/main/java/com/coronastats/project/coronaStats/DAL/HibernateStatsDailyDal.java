package com.coronastats.project.coronaStats.DAL;

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
		StatsDaily statOfCountry = session.get(StatsDaily.class, id);
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
	public List<StatsDaily> worldwideTotal() {
		Session session = entityManager.unwrap(Session.class);
		List<StatsDaily> worldTotal = session.createQuery("select s.id, s.countryId, s.date, SUM(s.infected) as infected,SUM(s.recovered) as recovered,SUM(s.death) as death from StatsDaily s", StatsDaily.class).getResultList();
		return worldTotal;
	}

	@Override
	@Transactional
	public List<StatsDaily> countryTotal() {
		Session session = entityManager.unwrap(Session.class);
		List<StatsDaily> countryTotal = session.createQuery("select s.id, s.countryId, s.date, SUM(s.infected) as infected,SUM(s.recovered) as recovered,SUM(s.death) as death from StatsDaily s GROUP BY s.country_id ORDER BY s.infected DESC", StatsDaily.class).getResultList();
		return countryTotal;
	}
	
	@Override
	@Transactional
	public List<StatsDaily> worldwideTotalDayByDay() {
		Session session = entityManager.unwrap(Session.class);
		List<StatsDaily> worldDayByDayHelper = session.createQuery("select s.id, s.countryId, s.date, SUM(s.infected) as infected,SUM(s.recovered) as recovered,SUM(s.death) as death from Statsdaily s GROUP BY s.date ORDER BY s.date", StatsDaily.class).getResultList();
		return worldDayByDayHelper;
	}

	@Override
	@Transactional
	public List<StatsDaily> countryTotalDayByDay() {
		Session session = entityManager.unwrap(Session.class);
		List<StatsDaily> countryDayByDayHelper = session.createQuery("select s.id, s.countryId, s.date, SUM(s.infected) as infected,SUM(s.recovered) as recovered,SUM(s.death) as death from Statsdaily s GROUP BY s.country_id,s.date ORDER BY s.country_id", StatsDaily.class).getResultList();
		return countryDayByDayHelper;
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
		session.delete(statsDaily);
	}

}
