package edu.escuelaing.arsw.app.entities;

import org.springframework.data.annotation.Id;
/**
 * Clase que representa un jugador en la aplicación.
 */
public class Player {
    @Id
    public String id;
    public String username;
    public String password;

    /**
     * Constructor vacío de la clase Player.
     */
    public Player() {}

    /**
     * Constructor de la clase Player que recibe el nombre de usuario y la contraseña del jugador.
     * @param username El nombre de usuario del jugador.
     * @param password La contraseña del jugador.
     */
    public Player(String username, String password) {
        this.username = username;
        this.password = password;
    }

    /**
     * Establece el nombre de usuario del jugador.
     * @param username El nombre de usuario a establecer.
     */
    public void setUsername(String username) {
        this.username = username;
    }

    /**
     * Establece la contraseña del jugador.
     * @param password La contraseña a establecer.
     */
    public void setPassword(String password) {
        this.password = password;
    }

    /**
     * Obtiene el nombre de usuario del jugador.
     * @return El nombre de usuario del jugador.
     */
    public String getUsername() {
        return this.username;
    }

    /**
     * Obtiene la contraseña del jugador.
     * @return La contraseña del jugador.
     */
    public String getPassword() {
        return this.password;
    }

    /**
     * Devuelve una representación en cadena de texto de la entidad Player.
     * @return Una cadena de texto que representa la entidad Player, incluyendo el id y el nombre de usuario.
     */
    @Override
    public String toString() {
        return String.format(
                "User[id=%s, Username='%s']",
                id, username);
    }

    /**
     * Establece el id del jugador.
     * @param id2 El id a establecer.
     */
    public void setId(String id2) {
        this.id = id2;
    }
}