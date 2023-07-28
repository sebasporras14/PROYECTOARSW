package edu.escuelaing.arsw.app.configurators;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
/**
     * Agrega controladores de vista al registro para mapear rutas de URL a nombres de vistas.
     *
     * @param registry el ViewControllerRegistry para registrar controladores de vista
     */
@Configuration
public class MvcConfig implements WebMvcConfigurer {

	@Override
	public void addViewControllers(ViewControllerRegistry registry) {
		registry.addViewController("/login").setViewName("login");
		registry.addViewController("/index.html?continue").setViewName("index");
		registry.addViewController("/").setViewName("home");
		registry.addViewController("/home").setViewName("home");
	}

}
