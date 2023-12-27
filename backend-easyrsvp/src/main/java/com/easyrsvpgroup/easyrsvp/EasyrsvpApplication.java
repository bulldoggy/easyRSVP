package com.easyrsvpgroup.easyrsvp;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class EasyrsvpApplication {

	public static void main(String[] args) {
		SpringApplication.run(EasyrsvpApplication.class, args);
	}

}
