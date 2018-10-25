// JavaScript Document


document.head.innerHTML+='<link href="Resources/css/NavBar.css" rel="stylesheet" type="text/css">';
	
document.body.innerHTML+='<nav>'+
	'	<div class="logo" >'+
	'		<a href="./index.html">'+
	'			<img src="./Resources/img/logo.png" alt="Math Mate" href>'+
	'			<h2>Math Mate</h2>'+
	'		</a>'+
	'	</div>'+
	'	<div class="collapse" onclick="myFunction(this)">'+
	'		<div class="container" >'+
  	'			<div class="bar1"></div>'+
  	'			<div class="bar2"></div>'+
  	'			<div class="bar3"></div>'+
	'		</div>'+
	'	</div>'+
	'	<div class="nav">'+
	'		<a class="Products" href="./products.html">Products</a>'+
	'		<a class="Workshop" href="./workshop.html">Workshop</a>'+
	'		<a class="ProfessionalDev" href="./professional-development.html">Professional Development</a>'+
	'		<a class="AboutUs" href="./Aboutus.html">About us</a>'+
	'	</div>'+
	'</nav>';



function myFunction(x) {
    x.classList.toggle("change");
	var name = x.parentElement;
	name.classList.toggle("change");
}