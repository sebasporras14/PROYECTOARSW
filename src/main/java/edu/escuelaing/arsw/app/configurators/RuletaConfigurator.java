package edu.escuelaing.arsw.app.configurators;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.web.socket.server.standard.ServerEndpointExporter;

/**
     * Crea y devuelve un exportador del punto de conexión del servidor WebSocket.
     * Permite que los endpoints WebSocket sean detectados automáticamente por Spring.
     *
     * @return el ServerEndpointExporter para habilitar los puntos de conexión del servidor WebSocket.
     */

@Configuration
@EnableScheduling
public class RuletaConfigurator {
    @Bean
    public ServerEndpointExporter serverEndpointExporter() {
        return new ServerEndpointExporter();
    }
}
