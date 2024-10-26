
let key = 'a020c8b4fab16c5ecce5b73dbb4681e8';
let cityName = document.getElementById("inputCityName");
let searchBtn = document.getElementById("btn");
let temp = document.getElementsByClassName('temp')[0];
let humidity = document.getElementById("hum");
let pressure = document.getElementById("press");
let wind = document.getElementById("wnd");
let type = document.getElementById("weatherType");
let main = document.getElementsByClassName("main")[0];
let currLocation = document.getElementById("currLocation");
let weatherConditions =
{
    CLEAR: 'assets/clear-sunny.png',
    SUNNY: 'assets/clear-sunny.png',
    SHOWERS: 'assets/rain-Drizzle-Showers .png',
    DRIZZLE: 'assets/rain-Drizzle-Showers .png',
    RAIN: 'assets/rain-Drizzle-Showers .png',
    HAZE: 'assets/fog-mist-haze-smoke-dust-sand.png',
    FOG: 'assets/fog-mist-haze-smoke-dust-sand.png',
    MIST: 'assets/fog-mist-haze-smoke-dust-sand.png',
    SMOKE: 'assets/fog-mist-haze-smoke-dust-sand.png',
    DUST: 'assets/fog-mist-haze-smoke-dust-sand.png',
    SAND: 'assets/fog-mist-haze-smoke-dust-sand.png',
    SNOW: 'assets/snow-sleet.png',
    SLEET: 'assets/snow-sleet.png',
    CLOUDY: 'assets/cloudy-overcast.png',
    CLOUDS: 'assets/cloudy-overcast.png',
    OVERCAST: 'assets/cloudy-overcast.png',
    THUNDERSTORMS: 'assets/thunderstorm.png',

}
//creating container
let result = document.createElement("div");
result.className = "result flexCol";

//Fetching data
async function byCityName(city) {
    result.innerHTML = "<div class='loader'></div>";
    main.append(result);
    //fetching api
    let data = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=metric`);
    let info = await data.json();
    if (info.cod == 404 || city.trim() == "") {
        result.innerHTML =
            `
        <div class="invalid">
        <script src="https://unpkg.com/@dotlottie/player-component@latest/dist/dotlottie-player.mjs"
          type="module"></script>
        <dotlottie-player id="cross" src="https://lottie.host/3d370e99-e057-4614-b519-12c7effa8046/XOgsi3ugCT.json"
          background="transparent" speed="1" style="width: 300px; height: 300px;" loop autoplay></dotlottie-player>
          <h3>${city} Not Found</h3>
      </div>`;
      return;
    }
    work(info,city);
}
async function byCurrLocation(city,longitude,latitude) {
    //fetching api
    let data = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}&units=metric`);
    let info = await data.json();
    console.log(info);
    if (info.cod == 404) {
        result.innerHTML =
            `
        <div class="invalid">
        <script src="https://unpkg.com/@dotlottie/player-component@latest/dist/dotlottie-player.mjs"
          type="module"></script>
        <dotlottie-player id="cross" src="https://lottie.host/3d370e99-e057-4614-b519-12c7effa8046/XOgsi3ugCT.json"
          background="transparent" speed="1" style="width: 300px; height: 300px;" loop autoplay></dotlottie-player>
          <h3>${city} Not Found</h3>
      </div>`;
      return;
    }
    work(info,city);
}
//Actual work
function work(info,city)
{
    console.log(info);
    //updating values
    let condition = info.weather[0].main.toUpperCase();
    result.innerHTML = `
                <h1 class="temp">${info.main.temp}&deg;C</h1>
                <h2 id="location">${info.name}/${info.sys.country}</h2>
                <h2 id="weatherType">${condition}</h2>
                <img src="${weatherConditions[condition]}" alt="">
                <div class="info flexRow">
                    <div class="wind flexCol">
                        <h3>Wind</h3>
                        <p id="wnd">${info.wind.speed}m/s</p>
                    </div>
                    <div class="humidity flexCol">
                        <h3>Humidity</h3>
                        <p id="hum">${info.main.humidity}%</p>
                    </div>
                    <div class="Pressure flexCol">
                        <h3>Pressure</h3>
                        <p id="press">${info.main.pressure}mb</p>
                    </div>
                </div>`
}
//event listners
searchBtn.addEventListener('click', () => {
    result.innerHTML = ""
    let enteredCity = cityName.value;
    cityName.value = "";
    result.innerHTML = "<div class='loader'></div>";
    main.append(result);
    byCityName(enteredCity);
})
currLocation.addEventListener('click',()=>
{
    result.innerHTML = ""
    let enteredCity = cityName.value;
    cityName.value = "";
    result.innerHTML = "<div class='loader'></div>";
    main.append(result);
    navigator.geolocation.getCurrentPosition((pos)=>
    {
        let longi = pos.coords.longitude;
        let lati = pos.coords.latitude;
        byCurrLocation(enteredCity,longi,lati);
    })
})