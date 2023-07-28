# Proyecto Arquitectura de Software

## Glorious Spin
## Descripción
Esta aplicación tiene como objetivo simular el famoso juego juego de casino "ruleta". Permite a los usuarios interactuar con el tablero que contiene numeros del 1 al 36 y el 0. En estos lugares podra realizar apuestas con fichas con su valor de acuerdo al color, con las reglas y en espacios especiales establecidos del juego. Los usuarios podran ver la ruleta, sus ganancias y jugadas de otros jugadores.

![](https://stonkstutors.com/wp-content/uploads/2022/04/7-mejores-juegos-de-ruleta-para-Android-e-iOS.SIN_.jpg)
## Historia de usuario detallada

### link al tablero

| Identificador           | HU001                   | 
|-------------------------|--------------------------------| 
| Nombre                  |Registrar en plataforma                   | 
| Descripción             | Como jugador, Quiero poder registrar mi username, Para poder ingresar al juego.              | 
| Criterios de aceptación | El sistema debe poder permitir agregar la información de cada usuario. El sistema solicitará ingresar un username y una contraseña  | 
|                         |El sistema no debe permitir que se registre dos veces el mismo usuario.| 
| mockup| ![login](https://github.com/sebasporras14/PROYECTOARSW/blob/master/images/login.png)|
| Autor                   | Sebastián Porras Rozo                       | 

----


| Identificador           | HU002                   | 
|-------------------------|--------------------------------| 
| Nombre                  | Visualizar Tablero                | 
| Descripción             | Como jugador ,Quiero poder visualizar el diseño del tablero con los diferentes tipos de apuesta ,Para poder realizar las apuestas en el.             | 
| Criterios de aceptación | El programa debe poder mostrar el tablero de la ruleta con las distintas fichas con valores distintos. el tablero debe ser acorde a lo tradicional en un casino, en esta version no se usara el 00.  | 
||El jugador de manera opcional debe poder ver las apuestas sobre cada numero de otro jugador en tiempo real|
| mockup| ![tablero](https://github.com/sebasporras14/PROYECTOARSW/blob/master/images/tablero.png) |
| Autor                   | Sebastián Porras Rozo                       | 

----

| Identificador           | HU003                    | 
|-------------------------|--------------------------------| 
| Nombre                  | Visualizar Ruleta                 | 
| Descripción             | Como jugador, Quiero poder visualizar el diseño de la ruleta en tiempo real, Para poder concer el numero del giro en tiempo real.             | 
| Criterios de aceptación | El programa debe poder mostrar a cada jugador la ruleta girando y mostrando el numero que caera en tiempo real.  | 
||El comportamiento y resultado de la ruleta debe ser igual para cada uno de los jugadores haciendo cumplir la frase "en tiempo real"|
| mockup| ![ruleta](https://github.com/sebasporras14/PROYECTOARSW/blob/master/images/ruleta.png)|
| Autor                   | Sebastián Porras Rozo                       | 

----

| Identificador           | HU004                   | 
|-------------------------|--------------------------------| 
| Nombre                  | Apostar                   | 
| Descripción             | Como jugador, Quiero realizar una apuesta, Para poder interactuar con el juego.              | 
| Criterios de aceptación | El programa debe poder permitir que el jugador pueda apostar y pueda colocar/remover fichas en/de una posicion valida.  | 
||El jugador debe recibir una retroalimentacion de la apuesta realizada en la ronda. |
| mockup| ![apuesta](https://github.com/sebasporras14/PROYECTOARSW/blob/master/images/apuesta.png)|
| Autor                   | Sebastián Porras Rozo                       | 

## Corriendo el proyecto

Una vez clonado el proyecto y generado el jar con los siguientes comandos:

~~~
git clone https://github.com/sebasporras14/PROYECTOARSW.git
~~~
~~~
mvn package
~~~

se puede ejecutar con corriendo la clase: RuletaAppStarter

~~~
java -cp "./target/classes" edu.escuelaing.arsw.app.RuletaAppStarter
~~~
una vez listo el proyecto y la base de datos, en su navegador ingrese:

~~~
Http://LocalHost:8080
~~~

## Hecho con
* [Maven](https://maven.apache.org/) - Dependency Management
* [java](https://rometools.github.io/rome/) - Used to generate RSS Feeds
* [MongoDB](https://api.mongodb.com/) DB used


## Autor

* **Sebastian Porras**

### fecha

07/28/2023 

## Licencia

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details