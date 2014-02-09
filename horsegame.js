// JQuery Stuff
// --------------------------------------------------------------------
$(document).ready(function() {

// Click the horse
// --------------------------------------------------------------------
	$("#boop").mouseenter(function() {
		$("#boop").animate({
			marginTop: "-2px",
			marginLeft: "2px",
			height: "320px",
			width: "320px",
		}, 'fast');
	})
	$("#boop").mouseleave(function() {
		$("#boop").animate({
			marginTop: "10px",
			marginLeft: "10px",
			width: "300px",
			height: "300px"
		}, 'fast');
	})
	$("#boop").click(function() {
		zap();
		$("#boop").animate({
			marginTop: "10px",
			marginLeft: "10px",
			width: "300px",
			height: "300px"
		}, 10);
		$("#boop").animate({
			marginTop: "-2px",
			marginLeft: "2px",
			width: "320px",
			height: "320px"
		}, 'fast');
	})
})

// Tabs
// --------------------------------------------------------------------
$(function() {
	$("#menu").tabs();
})

// Variables
// --------------------------------------------------------------------
var height = 0.01;
var gps = 0; //growth per second
var autoPrice = 1;

// Helper Functions
// --------------------------------------------------------------------
function toFeet(heightInMetres) {
	return heightInMetres * 3.2808399;
}

function metreOutput(heightInMetres) {
	if (heightInMetres < 1) {
		var cm = 100 * heightInMetres;
		return cm.toFixed(2) + "cm";
	} else if (heightInMetres < 1000) {
		var m = heightInMetres;
		return m.toFixed(2) + "m";
	} else {
		var km = heightInMetres / 1000;
		return km.toFixed(2) + "km";
	}
}

function feetOutput(feet) {
	if (feet < 1) {
		var inch = feet * 12;
		return inch.toFixed(2) + "\"";
	} else if (feet < 5280) {
		var foot = feet;
		if ((feet - Math.floor(feet)) * 12 < 1) {
			return Math.floor(feet) + "'";
		} else {
			return Math.floor(feet) + "' " + Math.floor((feet - Math.floor(feet)) * 12) + "\"";
		}
	} else {
		var mile = feet / 5280;
		return mile.toFixed(2) + "Mi";
	}
}

function updateHeight() {
	document.getElementById("height").innerHTML = "Horse height: " + metreOutput(height) + " | " + feetOutput(toFeet(height));
}

function zap() {
	height += 0.1;
	updateHeight();
}

function superZap() {
	height += 200;
	updateHeight();
}

function autoZap() {
	if (height < autoPrice) {
		return document.getElementById("newsTicker").innerHTML = "Your horse isn't big enough!";
	}
	gps += 0.01;
	height -= autoPrice;
	autoPrice = Math.pow(2, gps);
	document.getElementById("zps").innerHTML = "Growth per second: " + metreOutput(gps) + " | " + feetOutput(toFeet(gps));
	document.getElementById("autoZap").innerHTML = "Auto-Zap horse for " + metreOutput(autoPrice) + " or " + feetOutput(toFeet(autoPrice));
	updateHeight();
}

// Game Loop
// --------------------------------------------------------------------
window.setInterval(function(){	
	height += gps;
	updateHeight();
}, 1000);