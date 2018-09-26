// JavaScript Documentfunction on() {



function on() {
    document.getElementById("overlay").style.display = "block";
	
	$('#youtube1')[0].contentWindow.postMessage('{"event":"command","func":"' + 'pauseVideo' + '","args":""}', '*');
	
	$('#youtube2')[0].contentWindow.postMessage('{"event":"command","func":"' + 'playVideo' + '","args":""}', '*');
	
}

function off() {
    document.getElementById("overlay").style.display = "none";
	$('#youtube1')[0].contentWindow.postMessage('{"event":"command","func":"' + 'playVideo' + '","args":""}', '*');
	
	$('#youtube2')[0].contentWindow.postMessage('{"event":"command","func":"' + 'stopVideo' + '","args":""}', '*');
	
}
