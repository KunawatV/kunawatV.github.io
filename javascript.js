// JavaScript Document

var $text = $('.text');
var $win = $(window);

$win.on('scroll',function (){
	var top = $win.scrollTop();
	$text.css('transform', 'rotate(' + top + 'deg)'); 
});
