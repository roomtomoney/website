$("section#interested .form .submittedMessage").css("display", "none");

console.log("gets here");

function formSubmitted(){
	$("section#interested .form .questions").css("display", "none");
	$("section#interested .form").addClass("submitted"); 
	$("section#interested .form .submittedMessage").css("display", "block");
}

// Jumbotron 


// Jumbotron class
// provide a selector to the moving top parent of the jumbotron
// 	init(interval) must be called before any other methods
function Jumbo(selector){
	//private vars
	this.topContainer = document.querySelector(selector);
	this.numSlides = 0;
	this.currentSlide = 1;
	this.setIntervalHandle = null;
	this.interval = 0;
}

// The initializing method of the Jumbotron
// takes one parameter that sets the interval between slides
// defaul interval is 7.5s
Jumbo.prototype.init = function(interval) {
	this.interval = interval || 7500; 
	var ndList = this.topContainer.querySelectorAll(".banner");
	this.numSlides = ndList.length;
	// set topContainer width
	this.topContainer.style.width = this.numSlides + "00%";
	// set .banner widths
	for (var i=0; i < this.numSlides; i++) {
		ndList.item(i).style.width = 1/this.numSlides * 100 + "%";
	}
};

Jumbo.prototype.next = function() {

	console.log(this.currentSlide);
	if (this.currentSlide == this.numSlides) {
		this.currentSlide = 1;
		this.topContainer.style.transform = "translateX(0)";	
	}

	else {
		var translateXPercent = 1/this.numSlides * 100;
		this.topContainer.style.transform = "translateX(-" + this.currentSlide*translateXPercent + "%)";
		this.currentSlide += 1;	
	}


};

Jumbo.prototype.start = function(interval) {
	var that = this;
	console.log(that);
	this.setIntervalHandle = setInterval(this.next.bind(this), this.interval);
};
