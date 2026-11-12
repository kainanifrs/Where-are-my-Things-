package br.com.wherearemythings;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import br.com.wherearemythings.config.DatabaseInitializer;

@SpringBootApplication
public class WherearemythingsApplication {

	public static void main(String[] args) {
		DatabaseInitializer.initialize();
		SpringApplication.run(WherearemythingsApplication.class, args);
	}

}
