# Turf-War

A fighting RPG about a war over literal turf.

Instructions: Select a dino in the top-left screen to begin. Be sure to hover over the portraits to get a tooltip with their stats. Next choose an enemy dino in the top-right screen. Choose your enemy wisely by observing their Counter Attack number. Best all three enemy dinos to win the Turf War and own this plot of grass! All sound files borrowed from the EarthBound video game.

GitHub Pages Link: [Turf-War](https://skmanik.github.io/Turf-War/)

## Implementation Details

- Dinos stored as objects, containing Dino's DOM id, name, health, attack power, counter-attack power, base attack power, and whether they were chosen as player's character

- Uses JQuery to target DOM elements and configure their CSS for animations

- Game is configured with various on-click events which are toggled based on the stage of the game and whether certain animations have finished
