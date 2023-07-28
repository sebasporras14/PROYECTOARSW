package edu.escuelaing.arsw.app.controllers;

import java.security.Principal;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import edu.escuelaing.arsw.app.services.PlayerService;

@Controller
public class PlayerController {

    private final PlayerService playerService;

    /**
     * Constructor de la clase PlayerController.
     * @param playerService el servicio PlayerService utilizado para gestionar la información de los jugadores.
     */
    @Autowired
    public PlayerController(PlayerService playerService) {
        this.playerService = playerService;
    }
    /**
     * Maneja la petición POST para registrar un nuevo usuario.
     * @param username el nombre de usuario del nuevo usuario.
     * @param password la contraseña del nuevo usuario.
     * @return una cadena de redirección a la página "index.html" después de registrar el usuario exitosamente.
     */
    @PostMapping("/register")
    public String registerUser(@RequestParam String username, @RequestParam String password) {
        playerService.registerUser(username, password);
        return "redirect:/index.html"; 
    }
    /**
     * Maneja la petición GET para obtener información del usuario autenticado.
     * @param principal el objeto Principal que representa al usuario autenticado.
     * @return el objeto Principal que contiene información sobre el usuario autenticado.
     */
    @GetMapping("/user-info")
    @ResponseBody
    public Principal getUserInfo(Principal principal) {
        return principal; 
    }
}
