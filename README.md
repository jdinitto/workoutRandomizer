# workoutRandomizer
Randomizes moves within a chosen workout type and hides all of the moves except for the current one. When you're finished with the move, click or tap the current move to reveal the next one. The secret (?) is kind of trick yourself into not knowing how many moves are left, so mentally you don't look at the length of the workout, move-wise, and get discouraged or annoyed.

The script pulls from a data file at `data/workoutRandomizerData.js`, which would be the file to edit to customize for your workout. I used a lot of the moves from the resistance workouts from the P90x program, since those are the ones I normally do, and I thought the randomizer was a way to keep things from getting stale.

Some of the workouts have an optional `final` object in the array, if you want to have some moves always appear last. The moves in that array are not randomized.

[See it in action here](https://jdinitto.github.io/workoutRandomizer/)

## Some improvement ideas:
- [ ] Randomize any moves found in the `final` array object, if it exists
- [ ] Option to show all final moves at once, or at least indicate the final move when the user comes to it. Might be a good idea.
- [ ] Code optimization
