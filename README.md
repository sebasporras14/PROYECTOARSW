# Proyecto Arquitectura de Software

## Glorious Spin
## Descripción
Esta aplicación tiene como objetivo simular el famoso juego juego de casino "ruleta". Permite a los usuarios interactuar con el tablero que contiene numeros del 1 al 36, 0 y 00. En estos lugares podra realizar apuestas con fichas con su valor de acuerdo al color, con las reglas y en espacios especiales establecidos del juego. Los usuarios podran ver la ruleta y numeros mas apostados en tiempo real, estadistica de numeros calientes y frios.El administrador de igual manera podra ver las estadisticas de los jugadores, sus apuestas y saldo.

![](https://stonkstutors.com/wp-content/uploads/2022/04/7-mejores-juegos-de-ruleta-para-Android-e-iOS.SIN_.jpg)
## Historia de usuario detallada

### link al tablero

[https://trello.com/invite/b/oq5tyH5T/ATTI50db333d4c6ff694499176d9e3c17c55DB432D8B/arsw-2023-i-glorious-spin](https://trello.com/invite/b/oq5tyH5T/ATTI50db333d4c6ff694499176d9e3c17c55DB432D8B/arsw-2023-i-glorious-spin)

| Identificador           | HU001                   | 
|-------------------------|--------------------------------| 
| Nombre                  |Registrar en plataforma                   | 
| Descripción             | Como jugador, Quiero poder registrar mi información, Para poder ingresar al juego.              | 
| Criterios de aceptación | El sistema debe poder permitir agregar la información de cada usuario. El sistema solicitará ingresar nombre, apellido, tipo de documento, documento, ciudad, teléfono, dirección, correo electrónico, número de tarjeta crédito/débito, fecha de vencimiento y cvc.  | 
|                         |El sistema no debe permitir que se registre dos veces el mismo usuario.| 
| Autor                   | Sebastián Porras Rozo                       | 

----


| Identificador           | HU002                   | 
|-------------------------|--------------------------------| 
| Nombre                  | Visualizar Tablero                | 
| Descripción             | Como jugador ,Quiero poder visualizar el diseño del tablero con los diferentes tipos de apuesta ,Para poder realizar las apuestas en el.             | 
| Criterios de aceptación | El programa debe poder mostrar el tablero de la ruleta con las distintas fichas con valores distintos. el tablero debe ser acorde a lo tradicional en un casino, en esta version se usara el 00.  | 
||El jugador de manera opcional debe poder ver las apuestas sobre cada numero de cada uno de los jugadores en tiempo real|
| Autor                   | Sebastián Porras Rozo                       | 

----

| Identificador           | HU003                    | 
|-------------------------|--------------------------------| 
| Nombre                  | Visualizar Ruleta                 | 
| Descripción             | Como jugador, Quiero poder visualizar el diseño de la ruleta en tiempo real, Para poder concer el numero del giro en tiempo real.             | 
| Criterios de aceptación | El programa debe poder mostrar de manera opcional a cada jugador la ruleta girando y mostrando el numero que caera en tiempo real.  | 
||El comportamiento y resultado de la ruleta debe ser igual para cada uno de los jugadores haciendo cumplir la frase "en tiempo real"|
| Autor                   | Sebastián Porras Rozo                       | 

----

| Identificador           | HU004                   | 
|-------------------------|--------------------------------| 
| Nombre                  | Apostar                   | 
| Descripción             | Como jugador, Quiero realizar una apuesta, Para poder interactuar con el juego.              | 
| Criterios de aceptación | El programa debe poder permitir que el jugador pueda apostar y pueda colocar/remover fichas en/de una posicion valida.  | 
||El jugador debe recibir una retroalimentacion de la apuesta realizada en la ronda. |
| Autor                   | Sebastián Porras Rozo                       | 

----


| Identificador           | HU005                    | 
|-------------------------|--------------------------------| 
| Nombre                  | Estadisticas de usuarios                   | 
| Descripción             | Como administrador ,Quiero conocer las estadisitcas de los usuarios,Para poder conocer cuanto ha invertido, perdido, ganado cada uno de los usuarios.              | 
| Criterios de aceptación | El programa debe poder permitir mostrar estadisticas de los usuarios y sus apuestas tanto ganancias, perdidas como inversiones  |  