'use strict';

chrome.runtime.onInstalled.addListener(function() {
	console.log(' background.js loaded');
	

	// autoload class variable
	chrome.storage.local.set({"autoload": "period1"}, function(){
		console.log('saved autoload class')
	});

	
	// set example class
	//  For Debugging Purposes Only
	/*
	let periodExample = "period1";
	let studentsExample = ["John", "Dave", "Anderson", "Rye", "Jane", "Elizabeth", "Mr. Darcy"];
	chrome.storage.local.set({"period1": studentsExample}, function(){
		console.log('Students saved as ' + studentsExample)
	});
	chrome.storage.local.get({"period1": []}, function(data){
		console.log(data.period1)
	});
	*/
});


// Listen for data request from detect.js

chrome.extension.onConnect.addListener(function(port) {
	
	console.log("Connected... ")

	port.onMessage.addListener(function(msg) {
		console.log("message received " + Array.isArray(msg));
		
		
		if (Array.isArray(msg)){
			// Save new list data
			let test = msg[0];
			
			switch(test){
				
				case "period1":
					msg.shift();
					console.log(msg);
					chrome.storage.local.set({"period1": msg}, function(){
						console.log(msg);
					});
					//chrome.storage.local.get({"period1": []}, function(data){
					//	console.log(data.period1)
					//});
					break;
				case "period2":
					msg.shift();
					console.log(msg);
					chrome.storage.local.set({"period2": msg}, function(){
						console.log(msg);
					});
					break;
					
				case "period3":
					msg.shift();
					console.log(msg);
					chrome.storage.local.set({"period3": msg}, function(){
						console.log(msg);
					});
					break;
					
				case "period4":
					msg.shift();
					console.log(msg);
					chrome.storage.local.set({"period4": msg}, function(){
						console.log(msg);
					});
					break;
					
				case "period5":
					msg.shift();
					console.log(msg);
					chrome.storage.local.set({"period5": msg}, function(){
						console.log(msg);
					});
					break;
				
				case "period6":
					msg.shift();
					console.log(msg);
					chrome.storage.local.set({"period6": msg}, function(){
						console.log(msg);
					});
					break;
					
				case "period7":
					msg.shift();
					console.log(msg);
					chrome.storage.local.set({"period7": msg}, function(){
						console.log(msg);
					});
					break;
					
				case "period8":
					msg.shift();
					console.log(msg);
					chrome.storage.local.set({"period8": msg}, function(){
						console.log(msg);
					});
					break;
				
			}
			
		} else {
		// Send list data over to detect.js
			switch (msg){
		
				case "period1":
					chrome.storage.local.get({"period1": []}, function(data){
						console.log(data.period1);
						port.postMessage(data.period1);
					});
					break;
				case "period2":
					chrome.storage.local.get({"period2": []}, function(data){
						console.log(data.period2);
						port.postMessage(data.period2);
					});
					break;
				case "period3":
					chrome.storage.local.get({"period3": []}, function(data){
						console.log(data.period3);
						port.postMessage(data.period3);
					});
					break;
				case "period4":
					chrome.storage.local.get({"period4": []}, function(data){
						console.log(data.period4);
						port.postMessage(data.period4);
					});
					break;
				case "period5":
					chrome.storage.local.get({"period5": []}, function(data){
						console.log(data.period5);
						port.postMessage(data.period5);
					});
					break;
				case "period6":
					chrome.storage.local.get({"period6": []}, function(data){
						console.log(data.period6);
						port.postMessage(data.period6);
					});
					break;
				case "period7":
					chrome.storage.local.get({"period7": []}, function(data){
						console.log(data.period7);
						port.postMessage(data.period7);
					});
					break;
				case "period8":
					chrome.storage.local.get({"period8": []}, function(data){
						console.log(data.period8);
						port.postMessage(data.period8);
					});
					break;
			}
		}
		
		
	});
});

