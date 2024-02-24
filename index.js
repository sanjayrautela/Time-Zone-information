let api_key = "cc818f3a4da140e9b0ce47674f74c6d2";


//function to get current location
function getLocation() {
    let promise = new Promise((resolve, reject) => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                // console.log(position, position.coords.latitude, position.coords.longitude);

                let obj = { lat: position.coords.latitude, lon: position.coords.longitude };
                resolve(obj);

            });
        } else {
            reject("Geolocation is not supported by this browser.");
        }
    })

    return promise;
}



getLocation().then((obj) => {
    get_data_curr_location(obj.lat, obj.lon);

}).catch((err) => {
    console.log(`soomethinf went  in getLocation ${err}`);
    alert(`location not found ${err}`);

});

//function to get data of the current location
function get_data_curr_location(lat, lon) {
    fetch(`https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${lon}&format=json&apiKey=${api_key}`)
        .then(resp => resp.json())
        .then((data) => {
            console.log("get_data_curr_location")
            // console.log(data, data.results, data.results[0]);
            append_data_curr_location(data.results[0]);

        }).catch((err) => {
            console.log("No location found get_data_curr_location", err);
            alert("location not found");

        });
}

//function for appending the crnt location data
let childcontainer1El = document.getElementsByClassName("child-container1")[0];
function append_data_curr_location(obj) {
    let name_of_timezone = obj.timezone.name;
    let city = obj.city;
    let country = obj.country;
    let latt = obj.lat;
    let long = obj.lon;
    let postcode = obj.postcode;
    let offset_STD = obj.timezone.offset_STD
    let offset_STD_seconds = obj.timezone.offset_STD_seconds;

    let offset_DST = obj.timezone.offset_DST;
    let offset_DST_seconds = obj.timezone.offset_DST_seconds;



    childcontainer1El.innerHTML = "";
    childcontainer1El.innerHTML += `<div class="inside_cont1">
    <div>Name Of Time Zone :<strong>${name_of_timezone}</strong></div>
    <div class="lat-log">
        <div>Lat:<strong>${latt}</strong></div>
        <div>Long:<strong>${long}</strong></div>
    </div>
    <div>Offset STD:<strong>${offset_STD}</strong></div>
    <div>Offset STD Seconds :<strong> ${offset_STD_seconds}</strong></div>
    <div>Offset DST : <strong>${offset_DST}</strong></div>
    <div>Offset DST Seconds: <strong>${offset_DST_seconds}</strong></div>
    <div>Country:  <strong> ${country}</strong></div>
    <div>Postcode:  <strong> ${postcode}</strong></div>
    <div>City:  <strong> ${city}</strong></div>

   </div>`;


}










let errEl = document.getElementsByClassName("err-container")[0];
let searchStrEl = document.getElementById("cityInp");

document.getElementById("submitBtn").addEventListener("click", () => {
    let searchStr = searchStrEl.value;
    searchStr = searchStr.trim();
    searchStr = searchStr.toLowerCase();
    if (!searchStr) {//empty string
        errEl.style.display = "block";
        setTimeout(()=>{
        errEl.style.display = "none";

        },4000)
        container2El.style.display = "none";
        return;
    }

    get_data_from_city(searchStr);


});

let err_city=document.getElementsByClassName("err-city")[0];

//function to get data of any city
function get_data_from_city(address) {

    fetch(`https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(address)}&apiKey=${api_key}`)
        .then(resp => resp.json())
        .then((data) => {
            console.log(data.features);
            append_data_search_city(data.features);
        }).catch((err) => {
            console.log(err);
            // alert("city not found")
            err_city.style.display="block";
            setTimeout(()=>{
            err_city.style.display="none";

            },4000)
        });
}



//function to append the the data of the searched city
let childcontainer2El = document.getElementsByClassName("child-container2")[0];
let container2El = document.getElementsByClassName("container2")[0];

function append_data_search_city(ar_of_obj) {
    if (ar_of_obj.length == 0) {

        container2El.style.display = "none";
        err_city.style.display="block";
        setTimeout(()=>{
        err_city.style.display="none";

        },4000)
        return;
    }


    let obj = ar_of_obj[0];
    childcontainer2El.innerHTML = "";
    // ar_of_obj.forEach(obj => {


    let name_of_timezone = obj.properties.timezone.name;
    let city = obj.properties.city;
    let country = obj.properties.country;
    let latt = obj.properties.lat;
    let long = obj.properties.lon;
    let postcode = obj.properties.postcode;

    let offset_STD = obj.properties.timezone.offset_STD;
    let offset_STD_seconds = obj.properties.timezone.offset_STD_seconds;

    let offset_DST = obj.properties.timezone.offset_DST;
    let offset_DST_seconds = obj.properties.timezone.offset_DST_seconds;

if(!postcode)
{
    postcode="N/A";
}
if(!city)
{
    city="N/A";
}


    // console.log(name_of_timezone,
    //     city,
    //     country,
    //     latt,
    //     long,
    //     postcode,
    //     offset_STD, offset_STD_seconds, offset_DST,
    //     offset_DST_seconds)



    childcontainer2El.innerHTML += `<div class="inside_cont2">
            <div>Name Of Time Zone : <strong>${name_of_timezone}</strong></div>
            <div class="lat-log">
                <div>Lat:<strong>${latt}</strong></div>
                <div>Long:<strong>${long}</strong></div>
            </div>
            <div>Offset STD:  <strong>${offset_STD}</strong>
            </div>
            <div>Offset STD Seconds :  <strong>${offset_STD_seconds}</strong></div>
            <div>Offset DST :  <strong>${offset_DST}</strong>
            </div>
            <div>Offset DST Seconds:  <strong>${offset_DST_seconds}</strong></div>
            <div>Country:  <strong>${country}</strong></div>
            <div>Postcode: <strong> ${postcode}</strong></div>
            <div>City: <strong> ${city}</strong></div>
           </div>`


    // });

    container2El.style.display = "block";

    errEl.style.display = "none";

    console.log("inside append_data_search_city")
}



























/*

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            console.log(position, position.coords.latitude, position.coords.longitude);


            let lat = position.coords.latitude;
            let lon = position.coords.longitude;
            get_data_curr_location(lat, lon)
        });
    } else {
        console.log("Geolocation is not supported by this browser.");
    }


}
getLocation()


function get_data_curr_location(lat, lon) {
    fetch(`https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${lon}&format=json&apiKey=${api_key}`)
        .then(resp => resp.json())
        .then((data) => {
            console.log(data, data.results);
        }).catch((err) => {
            console.log("No location found err in get_data_curr_location", err);

        });
}

*/