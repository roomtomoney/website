/* RoomToMoney Website */
// scripts.js scripted by HK Yoon
// Jul.2015
// hkzuuu@gmail.com
// github repo: https://github.com/roomtomoney/website


$("section#interested .form .submittedMessage").css("display", "none");

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
	this.controlContainer = null;
	this.jumboName = "";
}

// The initializing method of the Jumbotron
// takes one parameter that sets the interval between slides
// defaul interval is 7.5s
Jumbo.prototype.init = function(argObj) {

	this.jumboName = argObj.name;

	// set interval time according to the time provided
	// defaults to 7500
	this.interval = argObj.interval || 7500; 

	// query banner elements and figure out number of slides in our jumbotron
	var ndList = this.topContainer.querySelectorAll(".banner");
	this.numSlides = ndList.length;
	
	// set topContainer width
	this.topContainer.style.width = this.numSlides + "00%";
	
	// set .banner widths
	for (var i=0; i < this.numSlides; i++ ) {
		ndList.item(i).style.width = 1/this.numSlides * 100 + "%";
	}

	// is there control for this?
	if (argObj.control) {

		// make a new Jumbotron control instance
		this.control = new JumboControl(argObj.control);
		this.control.init({"numSlides":this.numSlides,"jumboName":this.jumboName, "controlFor":this});

	}
};

Jumbo.prototype.next = function() {

	// console.log(this.currentSlide);
	if (this.currentSlide == this.numSlides) {
		this.currentSlide = 1;
		this.topContainer.style.transform = "translate3d(0,0,0)";	
		this.topContainer.style.webkitTransform = "translate3d(0,0,0)";
		this.topContainer.style.mozTransform = "translate3d(0,0,0)";
	}

	else {
		var translateXPercent = 1/this.numSlides * 100;
		this.topContainer.style.transform = "translate3d(-" + this.currentSlide*translateXPercent + "%,0,0)";
		this.topContainer.style.webkitTransform = "translate3d(-" + this.currentSlide*translateXPercent + "%,0,0)";
		this.topContainer.style.mozTransform = "translate3d(-" + this.currentSlide*translateXPercent + "%,0,0)";
		this.currentSlide += 1;	
	}

	// fadeout bannerText and 
	var bText = this.topContainer.querySelectorAll(".bannerText");
	// console.log(bText);
	for (var i = 0 ; i < bText.length ; i++ ) {
		// console.log(bText.item(i));
		bText.item(i).classList.add("hiddden");
	}

	// fadein bannerText for the current slide
	var that = this;
	setTimeout(function(){
		bText.item(that.currentSlide - 1).classList.remove("hiddden");
	}, 750);

	// set highlight on the control
	if (this.control) {
		this.control.highlightButton(this.currentSlide);
	}

};

Jumbo.prototype.start = function(interval) {
	var that = this;
	// console.log(that);
	this.topContainer.querySelector(".bannerText").classList.remove("hiddden");
	this.setIntervalHandle = setInterval(this.next.bind(this), this.interval);

	// set highlight on the control
	if (this.control) {
		this.control.highlightButton(this.currentSlide);	
	}
	

};

Jumbo.prototype.goTo = function(slide) {
	// figure out how each much to travel for each slide
	var translateXPercent = 1/this.numSlides * 100;
	this.topContainer.style.transform = "translate3d(-" + (slide-1)*translateXPercent + "%,0,0)";
	this.topContainer.style.webkitTransform = "translate3d(-" + (slide-1)*translateXPercent + "%,0,0)";
	this.topContainer.style.mozTransform = "translate3d(-" + (slide-1)*translateXPercent + "%,0,0)";
	this.currentSlide = slide;		

	// fadeout bannerText and 
	var bText = this.topContainer.querySelectorAll(".bannerText");
	// console.log(bText);
	for (var i = 0 ; i < bText.length ; i++ ) {
		// console.log(bText.item(i));
		bText.item(i).classList.add("hiddden");
	}

	// fadein bannerText for the current slide
	setTimeout(function(){
		bText.item(slide - 1).classList.remove("hiddden");
	}, 750);

	// reset setTimeout

	clearInterval(this.setIntervalHandle);

	this.setIntervalHandle = setInterval(this.next.bind(this), this.interval);

	// set highlight on the control
	if (this.control) {
		this.control.highlightButton(slide);
	}

};

// Jumbotron control class
// called exclusively by the Jumbo class
function JumboControl(selector){
	this.controlContainer = document.querySelector(selector);
	this.raphaelPaper = null;
	this.buttons = [];
	this.controlFor = null;
}

JumboControl.prototype.init = function(argObj){
	this.controlFor = argObj.controlFor;
	this.controlContainer.id = "raphael" + "_" + argObj.jumboName;
	this.raphaelPaper = Raphael(this.controlContainer.id, argObj.numSlides*30, 50);
	this.controlContainer.style.width = argObj.numSlides*30 + "px";

	for (var i = 0; i < argObj.numSlides; i++ ){
		this.buttons.push(this.raphaelPaper.circle(i*30 + 15, 25, 10));
		this.buttons[i].attr({"stroke-width":2, "stroke":"#7bcab4", "fill":"white", "cursor":"pointer"});
	}

	// console.log("outsideforeach", this);

	// attach event listeners on the button click
	this.buttons.forEach(function(item, index){
		var that = this;
		item.click(function(){
			// console.log("WHAT",this);
			that.controlFor.goTo(index+1);
		});
	}, this);

	// attach event listener on the button hover
	this.buttons.forEach(function(item, index){
		item.mouseover(function(){
				this.attr({"fill":"#7bcab4"});	
		});
	});

	// attach even listener on the button out
	this.buttons.forEach(function(item, index){
		var that = this;		
		item.mouseout(function(){
			if (that.controlFor.currentSlide != (index+1)){
				this.attr({"fill":"white"});
			}
		});
	}, this);	
	

};

JumboControl.prototype.highlightButton = function(slide){
	// clear out other highlights
	this.buttons.forEach(function(item){
		item.animate({"fill":"white"}, 500, "ease");
	});
	this.buttons[slide-1].animate({"fill":"#7bcab4"}, 500, "ease");
};

/* Smooth Scrolling */
$(function() {
  $('a[href*=#]:not([href=#])').click(function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      if (target.length) {
        $('html,body').animate({
          scrollTop: target.offset().top
        }, 1000);
        return false;
      }
    }
  });
});

