package com.coronastats.project.coronaStats.restApi;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.coronastats.project.coronaStats.Entities.StatsDaily;
import com.coronastats.project.coronaStats.Service.IStatsDailyService;

@RestController
@RequestMapping("/api")
public class StatsDailyController {
	
	private IStatsDailyService statsDailyService;

	@Autowired
	public StatsDailyController(IStatsDailyService statsDailyService) {
		this.statsDailyService = statsDailyService;
	}
	
	@GetMapping("/stats")
	public List<StatsDaily> get() {
		return this.statsDailyService.getAll();
	}
	
	@GetMapping("/stats/{id}")
	public StatsDaily getById(@PathVariable int id) {
		return this.statsDailyService.getById(id);
	}
	
	@GetMapping("/statscountryid/{countryId}")
	public List<StatsDaily> getByCountryId(@PathVariable int countryId) {
		return this.statsDailyService.getByCountryId(countryId);
	}
	
	@GetMapping("/worldtotal")
	public List<StatsDaily> worldwideTotal() {
		return this.statsDailyService.worldwideTotal();
	}
	
	@GetMapping("/countrytotal")
	public List<StatsDaily> countryTotal() {
		return this.statsDailyService.countryTotal();
	}
	
	@GetMapping("/worldtotaldays")
	public List<StatsDaily> worldwideTotalDayByDay() {
		return this.statsDailyService.worldwideTotalDayByDay();
	}
	
	@GetMapping("/countrytotaldays")
	public List<StatsDaily> countryTotalDayByDay() {
		return this.statsDailyService.countryTotalDayByDay();
	}
	
	@PostMapping("/add")
	public void add(@RequestBody StatsDaily statsDaily) {
		this.statsDailyService.add(statsDaily);
	}
	
	@PostMapping("/update")
	public void update(@RequestBody StatsDaily statsDaily) {
		this.statsDailyService.update(statsDaily);
	}
	
	@PostMapping("/delete")
	public void delete(@RequestBody StatsDaily statsDaily) {
		this.statsDailyService.delete(statsDaily);
	}
}
