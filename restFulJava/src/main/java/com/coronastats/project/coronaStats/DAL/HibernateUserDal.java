package com.coronastats.project.coronaStats.DAL;

import javax.persistence.EntityManager;

import org.hibernate.Session;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import com.coronastats.project.coronaStats.Entities.User;

@Repository
public class HibernateUserDal implements IUserDal {
	
private EntityManager entityManager;
	
	@Autowired
	public HibernateUserDal(EntityManager entityManager) {
		this.entityManager = entityManager;
	}

	@Override
	@Transactional
	public User getUser() {
		Session session = entityManager.unwrap(Session.class);
		User user = session.createQuery("from User", User.class).getSingleResult();
		return user;
	}

}
