package edu.escuelaing.arsw.app.repositories;

import org.springframework.data.mongodb.repository.MongoRepository;
import edu.escuelaing.arsw.app.entities.Player;
/**
 * Interfaz de repositorio para la entidad Player. Extiende MongoRepository para obtener métodos de operaciones CRUD
 * predefinidos para la entidad Player en la base de datos MongoDB.
 */
public interface PlayerRepository extends MongoRepository<Player, String> {

    /**
     * Busca un jugador por su nombre de usuario.
     * @param username El nombre de usuario del jugador a buscar.
     * @return El jugador con el nombre de usuario especificado, o null si no se encuentra.
     */
    public Player findByUsername(String username);
}