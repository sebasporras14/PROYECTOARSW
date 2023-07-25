package edu.escuelaing.arsw.app.controller;


import edu.escuelaing.arsw.app.entities.Player;
import edu.escuelaing.arsw.app.repositories.PlayerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
public class PlayerController {

    @Autowired
    private PlayerRepository userRepository;

    @GetMapping("/login")
    public String loginForm() {
        return "login";
    }

    @PostMapping("/login")
    public String login(@RequestParam String username, @RequestParam String password, Model model) {
        Player user = userRepository.findByUserName(username);
        if (user != null && user.getPassword().equals(password)) {
            model.addAttribute("username", username);
            return "redirect:/index.html"; // Redireccionar a la página index.html en la carpeta "static"
        } else {
            // Usuario no encontrado o contraseña incorrecta, intentar registrar al usuario.
            Player newUser = new Player(username, password);
            userRepository.save(newUser);
            model.addAttribute("username", username);
            return "redirect:/index.html"; // Redireccionar a la página index.html en la carpeta "static"
        }
    }
}





