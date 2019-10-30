//apikey
const appKey = " "; //add your apikey from openweathermap.org here

//important stuff for searchbar
let searchButton = document.getElementById("search-btn");
let searchInput = document.getElementById("search-txt");
searchButton.addEventListener("click", findWeatherDetails);
searchInput.addEventListener("keyup", enterPressed);

//this function starts looking for weatherdetails once you press enter and it recognizes the city name you were typing
function enterPressed(event) {
    if (event.key === "Enter") {
        findWeatherDetails();
    }
}
//finds the weather details in metrics format, if you want receice the data as imperial units remove "&units=metric"
function findWeatherDetails() {
    if (searchInput.value === "") {} else {
        let searchLink = "https://api.openweathermap.org/data/2.5/forecast?q=" + searchInput.value + "&appid=" + appKey + "&units=metric";
        userAction_2(searchLink);
    }
}

//this function collects all the data
function theResponse() {
    const userAction1 = async() => {
        let json = await fetch(url).then(response => response.json());
        console.log(json)
    }
    userAction1();
}

// prints all the different weatherdetails as html 
const userAction_2 = async(url) => {


    let json = await fetch(url).then(response => response.json());
    var json_html = document.getElementById("json");
    var json_fashion = document.getElementById("fashion")

    //these arrays get the information from the json output and puts it in another var so the code is a bit cleaner 
    let json_temp = json["list"]['0']["main"]["temp"];
    let json_humid = json['list']['0']['main']['humidity'];
    let json_rainArray = json['list'];
    let json_location = json['city']['name'];

    //these are the background images
    var sunUrl = "url(https://s7d2.scene7.com/is/image/TWCNews/1031_nc_sunny_weather_2-1)  no-repeat center center / cover fixed";
    var autumnUrl = "url(http://cdn.desktopwallpapers4.me/wallpapers/nature/1920x1200/2/11093-cloudy-autumn-1920x1200-nature-wallpaper.jpg)  no-repeat center center / cover fixed";
    var winterUrl = "url(https://nieuws.weeronline.nl/wp-content/uploads/2014/11/koude_wintermaand_nederland-1280x853.jpg)  no-repeat center center / cover fixed";
    var rainUrl = "url('https://wallpaperbro.com/img/2154.jpg') no-repeat center center / cover fixed";
    var halfcloudyUrl = "url(http://eskipaper.com/images/sunny-day-wallpaper-1.jpg) no-repeat center center / cover fixed";
    var warmRainUrl = "url('https://willemwever.kro-ncrv.nl/sites/default/files/field/image/pexels-photo-975771.jpeg')no-repeat center center / cover fixed"

    if (json != null) {
        console.log(json_temp);
        console.log(json);
        json_html.innerHTML = "The location is: " + json_location + "<br>" + "The temperature is: " + json_temp + "\u00B0" + "C.";

        // check if temp is 23 degrees celsius or higher, prints sunglasses
        if (json_temp >= 20) {
            document.body.style.background = sunUrl;
            json_fashion.innerHTML = '  <h3 style="text-align: center;"> Fashion advice:</h3><br><img class="fashion_sunglasses" src="http://pluspng.com/img-png/sunglass-png-aviator-sunglass-png-clipart-3381.png"><br><img class="fashion_shirt" src="http://cdn.shopify.com/s/files/1/0085/4229/0017/products/hawaii_1200x1200.png?v=1562176983"><br><img class="fashion_pants" src="https://www.santexo.nl/wp-content/uploads/2017/06/Orcon-Capture-Korte-Broek-Andrew-black.png">';
        }
        // check if temp is between 16 and 23 degrees celsius, prints 
        if (json_temp > 16 && json_temp < 19.99) {
            document.body.style.background = halfcloudyUrl;
            json_fashion.innerHTML = '<h3 style="text-align: center;"> Fashion advice:</h3><br><img class="fashion_longshirt" src="https://cdn.shopify.com/s/files/1/2143/3217/products/500_515f0514-5e15-48a4-a5b3-68c39d0814ac.png?v=1526673862"><br><img class="fashion_jeans" src="https://img.fidcdn.net/r17/product/calvin-klein-jeans-slim-fit-jeans-in-destroyed-look-jeans-nl_9919747,a4c456,600x800f.webp">';
        }
        //check if temp is lower or equal to 15 degrees celsius
        if (json_temp <= 15.99) {
            document.body.style.background = autumnUrl;
            json_fashion.innerHTML = '<h3 style="text-align: center;"> Fashion advice:</h3> <br><img class="fashion_jumper" src="https://cdn11.bigcommerce.com/s-k8ofx05/images/stencil/1280x1280/products/1215/1732/MATFLHPR-GY__40720.1508269990.png?c=2&imbypass=on"><img class="fashion_jeans" src="https://img.fidcdn.net/r17/product/calvin-klein-jeans-slim-fit-jeans-in-destroyed-look-jeans-nl_9919747,a4c456,600x800f.webp">';
        }
        //check if temp is lower or equal to 5 degrees celsius
        if (json_temp <= 5) {
            document.body.style.background = winterUrl;
            json_fashion.innerHTML = '<h3 style="text-align: center;"> Fashion advice:</h3> <br><img class="fashion_winterjacket" src="https://dainese-cdn.thron.com/delivery/public/image/dainese/d913a9df-7564-47f1-a2ee-7869e14114e5/ramfdh/std/615x615/ski-downjacket-lady.jpg"><br><img class="fashion_jeans" src="https://img.fidcdn.net/r17/product/calvin-klein-jeans-slim-fit-jeans-in-destroyed-look-jeans-nl_9919747,a4c456,600x800f.webp">';
        }
        //check weather state 
        for (array in json_rainArray.slice(0, 4)) {
            if (json['list'][array]['weather']['0']['main'] === 'Rain' && json_temp >= 15) {
                document.body.style.background = warmRainUrl;
                json_html.innerHTML = "The location is: " + json_location + "<br>" + "The temperature is: " + json_temp + "\u00B0" + "C." + "<br>" + "It is going to rain";
                json_fashion.innerHTML = '  <h3 style="text-align: center;"> Fashion advice:</h3><br><img class="fashion_accessory" src="https://www.pon-ecom-static.nl/media/porsche/products/WAP05008016-porsche-paraplu-xl-1-605.png"><img class="fashion_windjack" src="https://i0.wp.com/sidebuddy.se/wp-content/uploads/2017/03/Purple-Rain-Coat-sidebuddy-jordi-hans-design.png?fit=1600%2C1600&ssl=1">';
            };
            if (json['list'][array]['weather']['0']['main'] === 'Rain' && json_temp <= 14.99) {
                document.body.style.background = rainUrl;
                json_html.innerHTML = "The location is: " + json_location + "<br>" + "The temperature is: " + json_temp + "\u00B0" + "C." + "<br>" + "It is going to rain";
                json_fashion.innerHTML = '<h3 style="text-align: center;"> Fashion advice:</h3> <br><img class="fashion_accessory" src="https://www.pon-ecom-static.nl/media/porsche/products/WAP05008016-porsche-paraplu-xl-1-605.png"><img class="kleding_jas" src="http://cdn.shopify.com/s/files/1/2302/2225/products/19074-Suddi-yellow_7020_Front_large.png?v=1548936271">';
            }
        }

    }
    // if there is no response from the api prints no response
    else {
        json_html.innerHTML = 'no response'
    }

    return await json_html;
}
