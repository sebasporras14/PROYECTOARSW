package edu.escuelaing.arsw.app;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import edu.escuelaing.arsw.app.entities.Player;
import edu.escuelaing.arsw.app.repositories.PlayerRepository;
import edu.escuelaing.arsw.app.services.PlayerService;
/**
 * Clase principal de la aplicación Spring Boot para la ruleta.
 */
@SpringBootApplication
public class RuletaAppStarter implements CommandLineRunner {

    @Autowired
    private PlayerRepository userRepository; 

    @Autowired
    PlayerService playerService;

    /**
     * Método principal de la aplicación Spring Boot.
     * @param args Argumentos de línea de comandos.
     */
    public static void main(String[] args) {
        SpringApplication.run(RuletaAppStarter.class, args);
    }

    /**
     * Método para inicializar y ejecutar la aplicación al arrancar.
     * @param args Argumentos de línea de comandos.
     * @throws Exception Si ocurre un error durante la ejecución.
     */
    @Override
    public void run(String... args) throws Exception {
        userRepository.deleteAll();
        System.out.println("Usuarios encontrados con findAll():");
        System.out.println("-------------------------------");
        for (Player user : userRepository.findAll()) {
            System.out.println(user);
        }
    }
}