package edu.escuelaing.arsw.app;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import edu.escuelaing.arsw.app.entities.Player;
import edu.escuelaing.arsw.app.repositories.PlayerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class SecuringWebApplication implements CommandLineRunner {

	@Autowired
	private PlayerRepository userRepository;

	public static void main(String[] args) throws Throwable {
		SpringApplication.run(SecuringWebApplication.class, args);
	}
	@Override
    public void run(String... args) throws Exception {

        for (Player user : userRepository.findAll()) {
            System.out.println(user);
        }
    }
}

	
	


