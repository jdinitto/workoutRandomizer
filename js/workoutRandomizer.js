var workoutRandomizer = workoutRandomizer || {};

workoutRandomizer.data = workoutRandomizerDataReturner();

workoutRandomizer.workoutButtonMaker = function workoutButtonMakerFunc (workout) {
	var workoutButt = document.createElement('button'),
		workoutText = document.createTextNode(workout);
	workoutButt.value = workout;
	workoutButt.addEventListener("click", function() { 
		workoutRandomizer.workoutSelected(workoutButt.value); 
	});
	workoutButt.appendChild(workoutText);
	return workoutButt;
};

workoutRandomizer.randomStrings = function randomStringsFunc () {
	var str = ['Cool','Nice','Sweet','Boss','Boss hog','Killer','Slammin\'','Rad','Gnarly','Schnoggleractor'];
	return str[0];
};

workoutRandomizer.workoutSelected = function workoutSelectedFunc (workout) {
	var generatedButts = document.getElementById('workouts').getElementsByTagName('button'),
		chosenText = '<p>' + workoutRandomizer.randomStrings() + '! You\'re doing ' + workout + '.</p><p>Tap each exercise when you\'re done.</p>',
		d = workoutRandomizer.data,
		workouts = d.workouts,
		i;

	for (i = 0; i < generatedButts.length; i++) {
		generatedButts[i].className = "unselectedWorkout";
		if (generatedButts[i].value === workout) {
			generatedButts[i].className = "selectedWorkout";
			generatedButts[i].innerHTML = chosenText;
		} 
	};

	for (var type in workouts) {
		if (workouts.hasOwnProperty(type) && type === workout) {
			for (i = 0; i < workouts[type].length; i++) {
				document.getElementById('workouts').appendChild(
					workoutRandomizer.buildSetButts(workouts[type][i], i)
				);
			};
		};
	};
};

workoutRandomizer.buildSetButts = function buildSetButtsFunc (set, number) {
	var setButt = document.createElement('button'),
		setText = document.createTextNode(set);
	
	setButt.addEventListener("click", function() { 
		//workoutRandomizer.workoutSelected(workoutButt.value); 
	});

	number === 0 ? setButt.className = 'setButt next' : setButt.className = 'setButt';
	setButt.appendChild(setText);
	return setButt;
};

workoutRandomizer.init = function workoutRandomizerInit () {
	var d = workoutRandomizer.data,
		userName = d.name,
		userNameNode = document.createTextNode(d.name || 'you exemplary physical specimen'),
		workouts = d.workouts,
		workoutsEl = document.getElementById('workouts'),
		workoutButtonEl, i;

	var nameEl = document.getElementById("intro").getElementsByTagName("span");
	
	for (i = 0; i < nameEl.length; i++) {
		nameEl[0].appendChild(userNameNode);
	};

	for (workout in workouts) {
		workoutButtonEl = workoutRandomizer.workoutButtonMaker(workout);
		workoutsEl.appendChild(workoutButtonEl);
	};
};

window.onload = function init () {
	workoutRandomizer.init();
}
