package com.coronastats.project.coronaStats.DAL;

import java.util.List;

import javax.persistence.EntityManager;

import org.hibernate.Session;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.coronastats.project.coronaStats.Entities.Country;

@Repository
public class HibernateCountryDal implements ICountryDal {
	
	private EntityManager entityManager;
	
	@Autowired
	public HibernateCountryDal(EntityManager entityManager) {
		this.entityManager = entityManager;
	}

	@Override
	@Transactional
	public List<Country> getAll() {
		Session session = entityManager.unwrap(Session.class);
		List<Country> countries = session.createQuery("from Country", Country.class).getResultList();
		return countries;
	}

}
