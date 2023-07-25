package edu.escuelaing.arsw.app.repositories;

import org.springframework.data.mongodb.repository.MongoRepository;
import edu.escuelaing.arsw.app.entities.Player;

public interface PlayerRepository extends MongoRepository<Player, String> {

  public Player findByUserName(String userName);
}