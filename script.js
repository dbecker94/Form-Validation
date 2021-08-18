/*
Project: Hands-On-Practice 6-3
Name: Daniel Becker
Date: 10/6/2020
*/
"use strict";
var formValidity = true;
// validate required firelds
function validateRequired() {
	var inputElements = document.querySelectorAll("#contactinfo input");
	var errorDiv = document.getElementById("errorText");
	var elementCount = inputElements.length;
	var requiredValidity = true;
	var currentElement;
	try {
		for(var i=0; i < elementCount; i++) {
			// Validate input elements in the fieldset
			currentElement = inputElements[i];
			if(currentElement.value === "") {
				currentElement.style.background = "rgb(255,233,233)";
				requiredValidity =false
			}
			else {
				currentElement.style.background = "white";
			}
			
		}
		if(requiredValidity === false) {
			throw "Please complete all fields.";
		}
		errorDiv.style.display = "none";
		errorDiv.innerHTML = "";
	}
	   catch(msg) {
		   errorDiv.style.display = "block";
		   errorDiv.innerHTML = msg;
		   formValidity = false;
	}
}
// create an Event Listener
function createEventListeners() {
	var form = document.getElementsByTagName("form")[0];
    var ssnFields = document.getElementsByClassName("ssn");
	
	if(window.addEventListener) {
		window.addEventListener("load",setUpPage, false);
		}
		else if (form.attachEvent) {
			window.attachEvent("onload",setUpPage);
		}
		
			if(form.addEventListener) {
		form.addEventListener("submit",validateForm, false);
		}
		else if (form.attachEvent) {
			form.attachEvent("onsubmit",validateForm);
		}
		for(var i = 0; i < ssnFields.length; i++) {
			if (ssnFields[i].addEventListener) {
				ssnFields[i],addEventListener("input", advanceSsn, false);
			}
			else if(ssnFields[i].attachEvent) {
				ssnFields[i].attachEvent("oninput", advanceSsn);
			}
		}
		
}
//validate Form
function validateForm(evt) {
	if(evt.preventDefault) {
		evt.preventDefault(); //prevent form from submitting
		}
	else {
		evt.returnValue = false;
	}
	formValidity = true;
    validateRequired();
	validateNumbers();
	if (formValidity === true) {
		document.getElementsByTagName("form")[0].submit();
	}
}
// run setup functions when page finishes load
if (window.addEventListener) {
	window.addEventListener("load",createEventListeners, false);
}
else if(window.attachEvent) {
	window.attachEvent("onload",createEventListeners);
}
function validateNumbers() {
 	var numberInputs =document.querySelectorAll("#contactinfo input[type = number]");
	var elementCount = numberInputs.length;
	var numErrorDiv = document.getElementById("numErrorText");
	var numbersValidity = true;
	var currentElement;
	try {
		for(var i=0; i < elementCount; i++) {
			currentElement = numberInputs[i];
			if(isNaN(currentElement.value) || (currentElement.value === "")) {
               currentElement.style.background = "rgb(255,233,233)";
	           numbersValidity = false; 
			}
			else {
			 currentElement.style.background = "white";
			}
		}
		 if (numbersValidity === false) {
			 throw "Zip and Social Security values must be numbers.";
		 }
		 numErrorDiv.style.display = "none";
		 numErrorDiv.innerHTML = "";
	}
	 catch (msg) {
		 numErrorDiv.style.display = "block";
		 numErrorDiv.innerHTML = msg;
		 formValidity = false;
	 }
}
function zeroPlaceholder() {
	var addressBox = document.getElementById("addrinput");
	addressBox.style.color = "black";
	if(addressBox.value === addressBox.placeholder) {
		addressBox.value = "";
	}
}
// restore placeholder text if box contains no user entry
function checkPlaceholder() {
	var addressBox = document.getElementById("addrinput");
	if (addressBox.value === "") {
		addressBox.style.color = "rgb(178,184,183)";
		addressBox.value - addressBox.placeholder;
	}
}
function generatePlaceholder() {
	if(!Modernizr.input.placeholder) {
		var addressBox = document.getElementById("addrinput");
		addressBox.value = addressBox.placeholder;
		addressBox.styles.colors = "rgb(178,184,183)";
		if(addressBox.addEventListener) {
			addressBox.addEventListener("focus",zeroPlaceholder,false);
			addressBox.addEventListener("blur",checkPlaceholder,false);
		}
		else if(addressBox.attachEvent) {
			addressBox.attachEvent("onfocus",zeroPlaceholder);
			addressBox.attachEvent("onblur",checkPlaceholder);
		}
	}	
}
// Run configuration form functions
function setUpPage() {
	createEventListeners();
	generatePlaceholder();
}
function advanceSsn() {
  var ssnFields = document.getElementsByClassName("ssn");
  var currentField = document.activeElement;
  if(currentField.value.length === currentField.maxLength) {
	  if(currentField === ssnFields[0]) {
		  ssnFields[1].focus();
	  }
	    if(currentField === ssnFields[1]) {
			ssnFields[2].focus();
		}
		  if(currentField === ssnFields[2]) {
			  document.getElementById("submitBtn").focus();
			  
		  }
      }
  }	
