package com.coronastats.project.coronaStats.Entities;

import java.sql.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="statsdaily")
public class StatsDaily {
	
	@Id
	@Column(name="id")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	
	@Column(name="country_id")
	private int countryId;
	
	@Column(name="date")
	private Date date;
	
	@Column(name="infected")
	private int infected;
	
	@Column(name="recovered")
	private int recovered;
	
	@Column(name="death")
	private int death;
	
	public StatsDaily(int id, int countryId, Date date, int infected, int recovered, int death) {
		super();
		this.id = id;
		this.countryId = countryId;
		this.date = date;
		this.infected = infected;
		this.recovered = recovered;
		this.death = death;
	}
	
	public StatsDaily(Integer id, Integer countryId, Date date, Long infected, Long recovered, Long death) {
		super();
		this.id = id;
		this.countryId = countryId;
		this.date = date;
		this.infected = infected.intValue();
		this.recovered = recovered.intValue();
		this.death = death.intValue();
	}
	
	public StatsDaily() {
		
	}
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public int getCountryId() {
		return countryId;
	}
	public void setCountryId(int countryId) {
		this.countryId = countryId;
	}
	public Date getDate() {
		return date;
	}
	public void setDate(Date date) {
		this.date = date;
	}
	public int getInfected() {
		return infected;
	}
	public void setInfected(int infected) {
		this.infected = infected;
	}
	public int getRecovered() {
		return recovered;
	}
	public void setRecovered(int recovered) {
		this.recovered = recovered;
	}
	public int getDeath() {
		return death;
	}
	public void setDeath(int death) {
		this.death = death;
	}
	
	
}
