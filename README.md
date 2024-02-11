Crea un proyecto en React que permita jugar al Blackjack contra la banca.

Reglas del juego:

1.Cada ronda se juega con una baraja inglesa barajada de forma aleatoria de 52 cartas sin comodines.
 1.1Debes simular la baraja y barajarla aleatoriamente. 
2.Cada carta numerada del 2 al 10 (2, 3, 4, 5, 6, 7, 8, 9, 10) tendrá un valor idéntico a su valor numérico
3.Las figuras (Jotas, Reinas y Reyes) valen todas 10 puntos.
4.Los Ases valen 11 puntos.
5.El crupier reparte una carta al jugador y dos cartas a sí mismo (una bocabajo).
6.El jugador solicita cartas hasta plantarse.
7.Una vez que el jugador se ha plantado, el crupier descubre la primera carta y se reparte cartas mientras su mano sume menos de 17.
8.Si alguno se pasa de 21, pierde automáticamente.
9.Si no se pasa ninguno, gana el jugador que se acerque más a 21.


Cómo debe ser la interfaz:

-Dos filas en las que aparezcan las cartas de los jugadores (Una fila para el crupier y otra fila para el jugador).
-Las cartas deben mostrar el número y el palo (Picas, Corazones, Rombos y Tréboles) sobre un fondo blanco.
-El tablero debe ser verde.
-Botón para solicitar siguiente carta.
-Botón para solicitar siguiente carta Crupier.
-Botón para plantarse.
-Botón para nueva ronda (solo debe de aparecer al terminar una ronda).
-Muestra por pantalla en directo la suma de las cartas de cada jugador
-Puedes usar Bootstrap si lo ves conveniente.
