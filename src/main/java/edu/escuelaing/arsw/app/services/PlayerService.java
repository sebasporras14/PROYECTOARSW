package edu.escuelaing.arsw.app.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import edu.escuelaing.arsw.app.entities.Player;
import edu.escuelaing.arsw.app.repositories.PlayerRepository;

/**
 * Servicio que gestiona las operaciones relacionadas con los usuarios.
 */
@Service
public class PlayerService {

    private final PlayerRepository playerRepository;
    private final PasswordEncoder passwordEncoder;

    /**
     * Constructor del servicio PlayerService.
     * @param playerRepository Repositorio de jugadores.
     * @param passwordEncoder Codificador de contraseñas para encriptar las contraseñas de los usuarios.
     */
    @Autowired
    public PlayerService(PlayerRepository playerRepository, PasswordEncoder passwordEncoder) {
        this.playerRepository = playerRepository;
        this.passwordEncoder = passwordEncoder;
    }

    /**
     * Registra un nuevo usuario en la base de datos.
     * @param username Nombre de usuario del nuevo usuario.
     * @param password Contraseña del nuevo usuario.
     * @throws IllegalArgumentException Si el usuario ya existe en la base de datos.
     */
    public void registerUser(String username, String password) {
        Player existingUser = playerRepository.findByUsername(username);
        if (existingUser != null) {
            throw new IllegalArgumentException("El usuario ya existe.");
        }
        String encodedPassword = passwordEncoder.encode(password);
        Player user = new Player(username, encodedPassword);
        playerRepository.save(user);
    }
}