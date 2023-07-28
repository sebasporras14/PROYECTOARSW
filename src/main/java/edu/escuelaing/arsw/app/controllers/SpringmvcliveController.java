package edu.escuelaing.arsw.app.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
@Controller 
public class SpringmvcliveController {

	@GetMapping("/home")
	public String testPage(){
		return "home";
	}
	@GetMapping("/")
    public String redireccionar() {
        return "redirect:/index.html";
    }
}
