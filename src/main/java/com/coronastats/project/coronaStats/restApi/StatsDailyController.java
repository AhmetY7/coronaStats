package com.coronastats.project.coronaStats.restApi;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
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
	
}
