$("section#interested .form .submittedMessage").css("display", "none");

console.log("gets here");

function formSubmitted(){
	$("section#interested .form .questions").css("display", "none");
	$("section#interested .form").addClass("submitted"); 
	$("section#interested .form .submittedMessage").css("display", "block");
}