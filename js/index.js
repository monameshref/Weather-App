"use strict"

const navbar = document.querySelector(".navbar");

const searchInput = document.getElementById("search"); // input
const searchBtn = document.getElementById("btn"); //button
const rowWether = document.getElementById("row");
const formData = document.getElementById("formData"); //form

formData.addEventListener("submit" , function(e){
    e.preventDefault();
})





async function weatherApi(data) {
    let weather = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=0035235b29704a76972120144241401&q=${data}&days=3`)
    let dataWeather = await weather.json();
    if (!dataWeather.error) {
        displayWeather(dataWeather);
    }
}


const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];


function displayWeather(dat) {
    let dateOfDay = new Date(dat.forecast.forecastday[0].date);
    let dateOfDayTwo = new Date(dat.forecast.forecastday[1].date);
    let dateOfDayThree = new Date(dat.forecast.forecastday[2].date);
    // console.log(dat);

    let cartona = `
    <div class="col-md-6 col-lg-4">
    <div class="curd text-white text-center h-100">

        <div class="header header-one">
            <span>${daysOfWeek[dateOfDay.getDay()]}</span>
            <span>${dateOfDay.getDate()}${monthNames[dateOfDay.getMonth()]}</span>
        </div>

        <div class="body">
            <h3>${dat.location.name}</h3>
            <div class="image">
                <h4>${dat.current.temp_c}</h4>
                <img src="${dat.current.condition.icon}" alt="icon">
            </div>
            <div class="text">
                <span>${dat.forecast.forecastday[0].day.mintemp_c}°C</span>
                <span>${dat.current.condition.text}</span>
            </div>
            <div class="fotter">
                <span>
                    <i class="fa-solid fa-umbrella pe-1"></i>
                    ${dat.current.wind_mph}%
                </span>
                <span>
                    <i class="fa-solid fa-wind pe-1"></i>
                    ${dat.current.wind_kph}km/h
                </span>
                <span>
                    <i class="fa-regular fa-compass"></i>
                    ${dat.current.wind_dir}
                </span>
            </div>
        </div>
    </div>
</div>



    <div class="col-md-6 col-lg-4">
        <div class="curd text-white text-center h-100">

            <div class="header text-center">
                <span>${daysOfWeek[dateOfDayTwo.getDay()]}</span>
            </div>

            <div class="body">
                <div class="image two">
                    <img src="${dat.forecast.forecastday[1].day.condition.icon}" alt="icon">
                    <h4>${dat.forecast.forecastday[1].day.maxtemp_c}</h4>
                </div>
                <div class="text">
                    <span>${dat.forecast.forecastday[1].day.mintemp_c}</span>
                    <span>${dat.forecast.forecastday[1].day.condition.text}</span>
                </div>
            </div>
        </div>
    </div>


    <div class="col-md-6 col-lg-4">
    <div class="curd text-white text-center h-100">
        <div class="header text-center">
            <span>${daysOfWeek[dateOfDayThree.getDay()]}</span>
        </div>

        <div class="body">
            <div class="image two">
                <img src="${dat.forecast.forecastday[2].day.condition.icon}" alt="icon">
                <h4>${dat.forecast.forecastday[2].day.maxtemp_c}</h4>
            </div>
            <div class="text">
                <span>${dat.forecast.forecastday[2].day.mintemp_c}</span>
                <span>${dat.forecast.forecastday[2].day.condition.text}</span>
            </div>
        </div>
    </div>
</div>`
    rowWether.innerHTML = cartona;
}



weatherApi("cairo");

searchBtn.addEventListener("click", function () {
    weatherApi(searchInput.value);
    searchInput.value = "";
})



// Scroll Navbar
window.addEventListener("scroll" , function(){
    if( window.scrollY > 66 ) {
        navbar.classList.add("sticky")
    }
    else {
        navbar.classList.remove("sticky")
    }
})


