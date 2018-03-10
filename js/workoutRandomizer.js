var workoutRandomizer = workoutRandomizer || {};

workoutRandomizer.data = workoutRandomizerDataReturner();

workoutRandomizer.workoutButtonMaker = function workoutButtonMakerFunc (workout) {
	var workoutButt = document.createElement('button'),
		workoutText = document.createTextNode(workout);
	workoutButt.value = workout;
	workoutButt.className = 'workoutButt';
	workoutButt.addEventListener('click', function() { 
		workoutRandomizer.workoutSelected(workoutButt.value); 
	});
	workoutButt.appendChild(workoutText);
	return workoutButt;
};

workoutRandomizer.randomStrings = function randomStringsFunc () {
	var str = ['Cool','Nice','Sweet','Boss','Boss hog','Killer','Slammin\'','Rad','Gnarly','Schnoggleractor'];
	str = str[workoutRandomizer.randomNumbersArray(1, str.length)];
	return str;
};

workoutRandomizer.workoutSelected = function workoutSelectedFunc (workout) {
	var generatedButts = document.getElementById('workouts').getElementsByTagName('button'),
		chosenText = '<h2>' + workoutRandomizer.randomStrings() + '! You\'re doing:</h2>' 
				   + '<h1>' + workout + '</h1>' 
				   + '<h2>Tap/click each exercise when you\'re done.</h2>',
		d = workoutRandomizer.data,
		workouts = d.workouts,
		i, x, z, type, last;

	for (i = 0; i < generatedButts.length; i++) {
		generatedButts[i].className = 'workoutButt unselected';
		if (generatedButts[i].value === workout) {
			generatedButts[i].className = 'workoutButt selected title';
			generatedButts[i].innerHTML = chosenText;
		} 
	};

	for (type in workouts) {
		if (workouts.hasOwnProperty(type) && type === workout) {

			var workL = workouts[type].length,
				workoutsEl = document.getElementById('workouts'),
				randoNumbers, finalSetsMoves;

			finalSets = typeof workouts[type][workL - 1] === 'object';

			finalSets ?
				randoNumbers = workoutRandomizer.randomNumbersArray(workL - 1, workL - 1):
				randoNumbers = workoutRandomizer.randomNumbersArray(workL, workL);

			for (x = 0; x < randoNumbers.length; x++) {
				var set = workouts[type][randoNumbers[x]];
				workoutsEl.appendChild(workoutRandomizer.buildSetButts(set));
			};

			if (finalSets) {
				finalSetsMoves = workouts[type][workL - 1];
				for (finalMoves in finalSetsMoves) {
					for (var z = 0; z < finalSetsMoves[finalMoves].length; z++) {
						workoutsEl.appendChild(
							workoutRandomizer.buildSetButts(finalSetsMoves[finalMoves][z])
						);
					}	
				}
			};
			document.getElementsByClassName('next')[0].className = 'setButt current';
		};
	};
};

workoutRandomizer.completeSet = function completeSetFunc () {
	var generatedSets = document.getElementsByClassName('next');
	for (i = 0; i < generatedSets.length; i++) {
		generatedSets[0].className = 'setButt current';
	};
};

workoutRandomizer.buildSetButts = function buildSetButtsFunc (set) {
	var setButt = document.createElement('button'),
		setText = document.createTextNode(set);

	setButt.addEventListener('click', function() { 
		if (this.className === 'setButt done') {return false};

		var nextButt = document.getElementsByClassName('next')[0],
			nextTextEl = document.createElement('p'),
			nextText = workoutRandomizer.randomStrings() + '! Here\'s your next exercise:',
			nextTextNode = document.createTextNode(nextText),
			previousTexts = document.getElementsByClassName('msg'),
			finalMsg = 'You\'re all done! Slam a protein shake and take a shower.',
			finalMsgNode = document.createTextNode(finalMsg);

		for (i = 0; i < previousTexts.length; i++) {
			previousTexts[i].className = 'msg done';
		};

		this.className = 'setButt done';
		nextTextEl.appendChild(nextTextNode);
		nextTextEl.className = 'msg';

		if (nextButt === undefined) {
			document.getElementById('finalMsg').appendChild(finalMsgNode);
			return;
		}
		
		nextButt.className = 'setButt current';
		nextButt.parentNode.insertBefore(nextTextEl, nextButt);
	});

	setButt.className = 'setButt next';
	setButt.appendChild(setText);
	return setButt;
};

workoutRandomizer.randomNumbersArray = function randomNumbersArrayFunc (size, max) {
	var numbersArr = [], lengthToReturn = size;

	var randomNumber = function (max) {
		max = max || 50;
		return Math.floor(Math.random() * max);
	};

	if (size > lengthToReturn) {size = lengthToReturn;}

	while (numbersArr.length < lengthToReturn) {
		var random = randomNumber(max);
		if (numbersArr.indexOf(random) > -1) {continue;}
			numbersArr[numbersArr.length] = random;
		}
	return numbersArr;
};

workoutRandomizer.init = function workoutRandomizerInit () {
	var d = workoutRandomizer.data,
		userName = d.name,
		userNameNode = document.createTextNode(d.name || 'you exemplary physical specimen'),
		workouts = d.workouts,
		workoutsEl = document.getElementById('workouts'),
		workoutButtonEl, i;

	var nameEl = document.getElementById('intro').getElementsByTagName('span');
	
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
};
