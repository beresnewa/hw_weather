const select = document.getElementById('selectRegions');
let citiesList = [];

fetch('https://gist.githubusercontent.com/alex-oleshkevich/6946d85bf075a6049027306538629794/raw/3986e8e1ade2d4e1186f8fee719960de32ac6955/by-cities.json')
.then(response => response.json())
.then(regions => regions.forEach(element => {
    
        element.regions.forEach(region => {
            region.cities.forEach(element => citiesList.push(element))   
        })

        citiesList.map(city => city.name).sort().forEach(name => {
            let option = document.createElement('option');
            select.appendChild(option);
            option.innerText = name;
        })
}))

select.addEventListener('change', () => {
     citiesList.forEach(city => {
        if (city.name === select.value) {
            fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${city.lat}&lon=${city.lng}&appid=74779d586d17e158a878da40e520192e`)
            .then(response => response.json())
            .then(weather => {
                document.getElementById('weather').innerText = `Температура воздуха: ${Math.ceil(weather.main.temp - 273)}°С`;
                document.getElementById('img').setAttribute('src', `http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png` )
            })
        }
     })
});