package edu.escuelaing.arsw.app.configurators;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class WebSecurityConfig {

	private final UserDetailsService userDetailsService;

	/**
     * Constructor de la clase WebSecurityConfig.
     * @param userDetailsService el servicio para obtener detalles de usuario durante la autenticación.
     */
    @Autowired
    public WebSecurityConfig(UserDetailsService userDetailsService) {
        this.userDetailsService = userDetailsService;
    }
	/**
     * Configura el encriptador de contraseñas para almacenar las contraseñas de manera segura.
     * @return un encriptador de contraseñas BCryptPasswordEncoder.
     */
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
	/**
     * Configura el AuthenticationManagerBuilder para usar el servicio de detalles de usuario y encriptación de contraseñas.
     * @param auth el objeto AuthenticationManagerBuilder para configurar la autenticación de usuarios.
     * @throws Exception si ocurre algún error al configurar la autenticación.
     */
    public void configureGlobal(AuthenticationManagerBuilder auth) throws Exception {
        auth
            .userDetailsService(userDetailsService)
            .passwordEncoder(passwordEncoder());
    }
	 /**
     * Configura las reglas de acceso a las URL de la aplicación.
     * @param http el objeto HttpSecurity para configurar la seguridad HTTP.
     * @return el filtro de seguridad para controlar el acceso a las URL.
     * @throws Exception si ocurre algún error al configurar la seguridad HTTP.
     */
	@Bean
	public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
		http
			.authorizeHttpRequests((requests) -> requests
				.requestMatchers("/", "/home", "/login", "/player", "/random-number", "/register", "/user-info").permitAll()
				.anyRequest().authenticated()
			)
			.formLogin((form) -> form
				.loginPage("/login")
				.permitAll()
			)
			.logout((logout) -> logout.permitAll());

		return http.build();
	}

	
}