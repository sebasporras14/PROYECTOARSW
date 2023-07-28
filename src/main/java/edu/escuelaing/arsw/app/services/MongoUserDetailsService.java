package edu.escuelaing.arsw.app.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import edu.escuelaing.arsw.app.entities.Player;
import edu.escuelaing.arsw.app.repositories.PlayerRepository;
/**
 * Servicio que implementa la interfaz UserDetailsService de Spring Security para cargar los detalles del usuario desde
 * la base de datos MongoDB.
 */
@Service
public class MongoUserDetailsService implements UserDetailsService {

    @Autowired
    private PlayerRepository playerRepository;

    /**
     * Carga los detalles del usuario a partir de su nombre de usuario.
     * @param username El nombre de usuario del usuario a cargar.
     * @return Los detalles del usuario, incluido su nombre de usuario, contraseña y roles.
     * @throws UsernameNotFoundException Si no se encuentra el usuario en la base de datos.
     */
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Player player = playerRepository.findByUsername(username);
        if (player != null) {
            return User.builder()
                    .username(player.getUsername())
                    .password(player.getPassword())
                    .roles("USER")
                    .build();
        } else {
            throw new UsernameNotFoundException("Usuario no encontrado");
        }
    }
}