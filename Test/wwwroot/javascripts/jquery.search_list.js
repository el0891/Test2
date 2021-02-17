
function httpRequestGet(getter_id, url)
{
	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function() {
    	if (this.readyState == 4) {
    		window[getter_id + 'Contorl'](JSON.parse(this.responseText))
    	}
	};
	xhr.open('GET', url, true);
	xhr.send(null);
}

