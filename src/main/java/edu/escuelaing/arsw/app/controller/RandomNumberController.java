package edu.escuelaing.arsw.app.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class RandomNumberController {

    @GetMapping("/random-number")
    public RandomNumberResponse getRandomNumber() {
        double randomNumber = Math.random() +1;
        return new RandomNumberResponse(randomNumber);
    }

    private static class RandomNumberResponse {
        private final double data;

        public RandomNumberResponse(double data) {
            this.data = data;
        }

        public double getData() {
            return data;
        }
    }
}





