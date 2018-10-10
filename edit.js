'use strict';

// This variable is for setting which file to write to (post request).


window.onload = function() {
	document.getElementById("save").addEventListener("click", save);
	//document.getElementById("btn").addEventListener("click", selectedPeriod);

	chrome.storage.local.get(['key'], function(value){
		let list = value.key;
		console.log(value.key);
		let port = chrome.extension.connect({
			name: "Load Student Names"
		});

		port.postMessage(list);

		port.onMessage.addListener(function(msg){
			console.log('recieved msg');
			let listDisplay = msg;
			document.getElementById('display').value += listDisplay.join('\n');
		});

	});
}

let save =() => {
	
	
	let textdata = document.getElementById('display').value;
	
	let stripped = textdata.split('\n');
	
	let studentNames = stripped.filter(slimDown);
	
	function slimDown(value){
					return value != "" && value != undefined
	}
	
	chrome.storage.local.get(['key'], function(value){
		studentNames.unshift(value.key);
		let port = chrome.extension.connect({
			name: "Save Student Names"
		});
		port.postMessage(studentNames);
		//console.log(studentNames);
	});
	
}

let selectedPeriod = () => {
	
	let period = document.getElementById("periodSelect").value;
	
	// Store in variable so we can post to file later
	periodChange = period;
	
	let port = chrome.extension.connect({
		name: "Load Student Names"
	});

	port.postMessage(period);
	port.onMessage.addListener(function(msg) {
		console.log("message received");
		
		console.log(msg);
		
		let students = msg;
		//console.log(msg);
		
		
		document.getElementById('display').value += students.join('\n');
		//add text to text-area
		
		//for(let i=0;i<students.length;i++){
		//	document.getElementById('display').value += students[i];
		//}
		
	});
}
