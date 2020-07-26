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
	public List<StatsDaily> getById(int id) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void add(StatsDaily statsDaily) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void update(StatsDaily statsDaily) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void delete(StatsDaily statsDaily) {
		// TODO Auto-generated method stub
		
	}

}
