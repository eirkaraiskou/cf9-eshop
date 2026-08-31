package com.cf.karaiskou.eshop;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import com.cf.karaiskou.eshop.controller.AppStatusController;

@SpringBootApplication
public class App {

	private static final Logger logger = LoggerFactory.getLogger(AppStatusController.class);
	public static void main(String[] args) {
		SpringApplication.run(App.class, args);
		logger.info(" ------------ Application started ------------");
	}
}
