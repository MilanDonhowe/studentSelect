'use strict';

// Detects which period is selected.

var attached = false;
var students = [];

window.onload = function() {
	//document.getElementById("btn").addEventListener("click", selectedPeriod);
	document.getElementById("periodSelect").addEventListener("click", selectedPeriod);
	document.getElementById("RANDOMIZE").addEventListener("click", randomPick);
	document.getElementById('edit').addEventListener("click", editSetup);

	//load default period 1 on load
	chrome.storage.local.get(["autoload"], function(msg){
		let autoStudents = msg.autoload;
		console.log(msg.autoStudents);
		// request class list from background
		let port = chrome.extension.connect({
			name: "Autoload Student List"
		});

		port.postMessage(autoStudents);
		port.onMessage.addListener(function(msg){
			console.log("message received");
		
			console.log(msg);
		
			students = msg;
			let displayStudents = msg.join(", ");

			// create the display
			document.getElementById('display').textContent = "Students: " + displayStudents;
			
			// change the selected index of the drop down list

			let newIndex = autoStudents[autoStudents.length-1]-1;
			console.log(newIndex);
			document.getElementById("periodSelect").selectedIndex = newIndex;
		});

		//let firstDisplay = msg.period1.join(', ');
		//document.getElementById("display").textContent = "Students: " + firstDisplay;
	});

}

// Credit to colinhalebrown for this function
let editSetup = () => {
  let period = document.getElementById("periodSelect").value;
  chrome.storage.local.set({key: period}, function(){
	  console.log('value saved');
  });


}

let selectedPeriod = () => {
	
	// get period value
	let period = document.getElementById("periodSelect").value;
	
	// change autoload value
	chrome.storage.local.set({"autoload": period});

	let port = chrome.extension.connect({
		name: "Load Student Names"
	});

	port.postMessage(period);
	port.onMessage.addListener(function(msg) {
		console.log("message received");
		
		console.log(msg);
		
		students = msg;
		let displayStudents = msg.join(", ")
		//create the display
		
		document.getElementById('display').textContent = "Students: " + displayStudents;
		
	});

}

function randomPick(){
	
	if (students != []) {
		if(students[Math.floor(Math.random() * students.length)] != undefined){
			let selected = students[Math.floor(Math.random() * students.length)];
			document.getElementById("chosen").textContent = "Student Selected: " + selected;
		} else {
			document.getElementById("chosen").textContent = "No period selected or class list empty."
		}
	}
}
