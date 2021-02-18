
function httpRequestGet(getter_id, url)
{
	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function() {
    	if (this.readyState == 4) {
    		window[getter_id + 'Contorl'](JSON.parse(this.responseText))
    		stopBigSpinner('Employees');
    	}
    	if(this.readyState != 4)
    		{
    			startBigSpinner('Employees')
    		}
	};
	xhr.open('GET', url, true);
	xhr.send(null);
}

function Add()
{ 
	var nametxt = $("input#NameTxt").val();
	var salarytxt = $("input#SalaryTxt").val();
	var deptxt = $("input#DepTxt").val();

	if(nametxt.trim().length == 0 ||
			salarytxt.trim().length == 0 ||
				deptxt.trim().length == 0 )
		alert('type name,salary,idDepartment');
	else
	{
		var xhr = new XMLHttpRequest();
		xhr.onreadystatechange = function() {
	    	if (this.readyState == 4) {
	    		alert(JSON.parse(this.responseText));
	    		stopBigSpinner('Employees');
	    	}
	    	if(this.readyState != 4)
    		{
    			startBigSpinner('Employees')
    		}
		};
		xhr.open('GET', 'https://' + window.location.host + '/' + 'Employees/Add?name=' + nametxt + '&salary=' + salarytxt + '&department_id=' + deptxt, true);
		xhr.send(null);
		httpRequestGet(
                        'Employees',
                        'https://' + window.location.host + '/Employees/' + 'GetInfo');
	}
	
}
function Edit()
{
	var nametxt = $("input#NameTxt").val();
	var salarytxt = $("input#SalaryTxt").val();
	var deptxt = $("input#DepTxt").val();
	if (EmpId ==0) alert("Please select Employee to edit")
		else
		{
			var xhr = new XMLHttpRequest();
			xhr.onreadystatechange = function() {
	    	if (this.readyState == 4) {
	    		alert(JSON.parse(this.responseText));
	    		stopBigSpinner('Employees');
	    		}
	    	if(this.readyState != 4)
    		{
    			startBigSpinner('Employees')
    		}
			};
			xhr.open('GET', 'https://' + window.location.host + '/' + 'Employees/Edit?name=' + nametxt + '&salary=' + salarytxt + '&department_id=' + deptxt +'&id=' + EmpId, true);
			xhr.send(null);
			httpRequestGet(
                        'Employees',
                        'https://' + window.location.host + '/Employees/' + 'GetInfo');
		}
}
function Delete()
{
	if (EmpId ==0) alert("Please select Employee to delete")
		else
		{
			var xhr = new XMLHttpRequest();
			xhr.onreadystatechange = function() {
	    	if (this.readyState == 4) {
	    		alert(JSON.parse(this.responseText));
	    		stopBigSpinner('Employees');
	    		}
	    	if(this.readyState != 4)
    		{
    			startBigSpinner('Employees')
    		}
			};
			xhr.open('GET', 'https://' + window.location.host + '/' + 'Employees/Delete?id=' + EmpId, true);
			xhr.send(null);
			httpRequestGet(
                        'Employees',
                        'https://' + window.location.host + '/Employees/' + 'GetInfo');
		}
}
function startBigSpinner(getter_id){
	var opts = {
      lines: 12             // The number of lines to draw
    , length: 7             // The length of each line
    , width: 5              // The line thickness
    , radius: 10            // The radius of the inner circle
    , scale: 1.0            // Scales overall size of the spinner
    , corners: 1            // Roundness (0..1)
    , color: '#000'         // #rgb or #rrggbb
    , opacity: 1/4          // Opacity of the lines
    , rotate: 0             // Rotation offset
    , direction: 1          // 1: clockwise, -1: counterclockwise
    , speed: 1              // Rounds per second
    , trail: 100            // Afterglow percentage
    , fps: 20               // Frames per second when using setTimeout()
    , zIndex: 2e9           // Use a high z-index by default
    , className: 'spinner'  // CSS class to assign to the element
    , top: '50%'            // center vertically
    , left: '50%'           // center horizontally
    , shadow: false         // Whether to render a shadow
    , hwaccel: false        // Whether to use hardware acceleration (might be buggy)
    , position: 'relative'  // Element positioning
    }
    var target = document.getElementById(getter_id + "Getter")
    var spinner = new Spinner(opts).spin(target)
}
function stopBigSpinner(getter_id)
{
	$("div#" + getter_id + "Getter" + " > div.spinner").remove();
}
