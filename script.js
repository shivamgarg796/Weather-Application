
function getData() {
    let city = document.getElementById("city").value;

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=638a07ffb7b1a4c74bb706a093cdcbbe`;

    fetch(url)
        .then(function (res) {
            return res.json();
        })
        .then(function (res) {
            append(res);
            console.log("res:", res);
        })
        .catch(function (err) {
            console.log("err :", err);
        });
}
function getDataLocation(lat, long) {
    let city = document.getElementById("city").value;

    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=638a07ffb7b1a4c74bb706a093cdcbbe`;

    fetch(url)
        .then(function (res) {
            return res.json();
        })
        .then(function (res) {
            append(res);
            console.log("res:", res);
        })
        .catch(function (err) {
            console.log("err :", err);
        });
}


let array=[];
function append(data) {

    let container = document.getElementById("container");
    let map = document.getElementById("gmap_canvas");
    container.innerHTML = null;



    let city = document.createElement("p");
    city.innerText = `${data.name}`;
    city.setAttribute("class","cit");

    let min = document.createElement("p");
    min.innerText = `Minimum Temperature ${data.main.temp_min}`;
    min.setAttribute("class","min");
    
    
    let max = document.createElement("p");
    max.innerText = `Maximum Temperature ${data.main.temp_max}`;
    max.setAttribute("class","max");
   
    let div=document.createElement("div");
    div.setAttribute("class","smaldiv");

    let deg = document.createElement("p");
    deg.innerText = `Deg : ${data.wind.deg}`;
    
    let gust = document.createElement("p");
    gust.innerText = `Gust : ${data.wind.gust}`;
    
    let speed = document.createElement("p");
    speed.innerText = `Speed : ${data.wind.speed}`;
    
    div.append(deg, gust, speed);
    
    let div1=document.createElement("div");
    div1.setAttribute("class","smaldiv2");
   
    let des = document.createElement("p");
    des.innerText = `Description : ${data.weather[0].description}`;

    let sunrise = document.createElement("p");
    sunrise.innerText = `Sunrise : ${data.sys.sunrise}`;

    let sunset = document.createElement("p");
    sunset.innerText = `Sunset : ${data.sys.sunset}`;
    div1.append(des, sunrise, sunset);

    

    container.append(city, min, max, div, div1);

    array.push(data.coord.lat,data.coord.lon);
    localStorage.setItem("key",JSON.stringify(array));

    map.src = `https://maps.google.com/maps?q=${data.name}&t=&z=13&ie=UTF8&iwloc=&output=embed`;
}
function getWeather() {
    navigator.geolocation.getCurrentPosition(success);
    function success(position) {
        var crd = position.coords;

        console.log('Your current position is:');
        console.log(`Latitude : ${crd.latitude}`);
        console.log(`Longitude: ${crd.longitude}`);
        console.log(`More or less ${crd.accuracy} meters.`);
        getDataLocation(crd.latitude, crd.longitude);
    }

}



