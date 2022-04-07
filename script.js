var ip_address;
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com',
		'X-RapidAPI-Key': 'dba9931327msh8fcb5cf96da4928p1367a4jsnd989e87bb73a'
	}
};
fetch('http://ip-api.com/json',{
	headers : { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
       }
	})
    .then(function(response) {
        response.json().then(jsonData => {
            ip_address=String(jsonData.query);
            console.log(ip_address);
            fetch('https://weatherapi-com.p.rapidapi.com/current.json?'+ new URLSearchParams({q:ip_address}), options)
                .then(response=>response.json())
                .then(weatherData => {
                    const location = weatherData.location;
                    const current = weatherData.current;
					document.getElementById('humidity').innerHTML=current.humidity+" %"; //precent 
					document.getElementById('pressure').innerHTML=current.pressure_mb+" mb"; //milibars
					document.getElementById('windspeed').innerHTML=current.wind_mph+" mph"; //meter per hour
					document.getElementById('percip').innerHTML=current.precip_mm+" mm";
					document.getElementById('cloud').innerHTML=current.cloud+" %";
					document.getElementById('temperature').innerHTML=current.temp_c;
					document.getElementById('current-weather-image').src="http://"+current.condition.icon;
					document.getElementById('current-weather').innerText=current.condition.text;
					document.getElementById('location').innerText=location.name+", "+location.region;
					document.getElementById('datetime').innerText=location.localtime;

                })
                .catch(err => console.error(err));
            });
    })
    .catch(function(error) {
        console.log(error)
    });