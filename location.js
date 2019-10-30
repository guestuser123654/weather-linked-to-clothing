var apiKey = " "; //add your apikey from openweathermap.org here

var geoVar;
var test;
var json_html = document.getElementById("json");
let json_temp;
let json_rainArray;
var url;
var rainURL = "url('https://wallpaperbro.com/img/2154.jpg') no-repeat right top";
var sunUrl = "url(https://img1.nickiswift.com/img/uploads/2017/09/what-the-sun-baby-from-teletubbies-looks-like-today.jpg) no-repeat center center fixed";
var autumnUrl = "url(http://cdn.desktopwallpapers4.me/wallpapers/nature/1920x1200/2/11093-cloudy-autumn-1920x1200-nature-wallpaper.jpg) no-repeat center center fixed";

//this function gets the longitude and latitude
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.watchPosition(showPosition);
    } else {
        geoVar.innerHTML = "Geolocation is not supported by this browser.";
    }

}

//this async function gets all the data and prints the data
async function showPosition(position) {

    //this puts the longitude and latitude in the api so you get results, if you want imperial results remove "&units=metric"
    geoVar = "Latitude: " + position.coords.latitude + "<br>Longitude: " + position.coords.longitude + "<br>";
    var url = "https://api.openweathermap.org/data/2.5/forecast?lat=" + position.coords.latitude.toString() + "&lon=" + position.coords.longitude.toString() + "&appid=" + apiKey + "&units=metric";

    const userAction = async(url) => {
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
        var rainURL = "url('https://wallpaperbro.com/img/2154.jpg') no-repeat center center / cover fixed";
        var halfcloudyUrl = "url(http://eskipaper.com/images/sunny-day-wallpaper-1.jpg) no-repeat center center / cover fixed";
        var warmRainURL = "url('https://willemwever.kro-ncrv.nl/sites/default/files/field/image/pexels-photo-975771.jpeg')no-repeat center center / cover fixed"

        if (json != null) {
            console.log(json_temp);
            console.log(json);
            json_html.innerHTML = "Your location is: " + json_location + "<br>" + "The temperature is: " + json_temp + "\u00B0" + "C.";

            // check if temp is 23 degrees celsius or higher, prints sunglasses
            if (json_temp >= 23) {
                document.body.style.background = sunUrl;
                json_fashion.innerHTML = '  <h3 style="text-align: center;"> Fashion advice:</h3><br><img class="fashion_sunglasses" src="http://pluspng.com/img-png/sunglass-png-aviator-sunglass-png-clipart-3381.png"><br><img class="fashion_shirt" src="https://purepng.com/public/uploads/large/purepng.com-black-t-shirtclothingblack-t-shirtfashion-dress-shirt-black-cloth-tshirt-631522326884bzr0p.png"><br><img class="fashion_pants" src="https://www.santexo.nl/wp-content/uploads/2017/06/Orcon-Capture-Korte-Broek-Andrew-black.png">';
            }
            // check if temp is between 16 and 23 degrees celsius, prints 
            if (json_temp > 16 && json_temp < 23) {
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
                    document.body.style.background = warmRainURL;
                    json_html.innerHTML = "Your location is: " + json_location + "<br>" + "The temperature is: " + json_temp + "\u00B0" + "C." + "<br>" + "It is going to rain";
                    json_fashion.innerHTML = '  <h3 style="text-align: center;"> Fashion advice:</h3><br><img class="fashion_accessory" src="https://www.pon-ecom-static.nl/media/porsche/products/WAP05008016-porsche-paraplu-xl-1-605.png"><img class="fashion_windjack" src="https://i0.wp.com/sidebuddy.se/wp-content/uploads/2017/03/Purple-Rain-Coat-sidebuddy-jordi-hans-design.png?fit=1600%2C1600&ssl=1">';
                };
                if (json['list'][array]['weather']['0']['main'] === 'Rain' && json_temp <= 14.99) {
                    document.body.style.background = rainURL;
                    json_html.innerHTML = "Your location is: " + json_location + "<br>" + "The temperature is: " + json_temp + "\u00B0" + "C." + "<br>" + "It is going to rain";
                    json_fashion.innerHTML = '<h3 style="text-align: center;"> Fashion advice:</h3> <br><img class="fashion_accessory" src="https://www.pon-ecom-static.nl/media/porsche/products/WAP05008016-porsche-paraplu-xl-1-605.png"><img class="fashion_jacket" src="http://cdn.shopify.com/s/files/1/2302/2225/products/19074-Suddi-yellow_7020_Front_large.png?v=1548936271">';
                }
            }
        } else {
            json_html.innerHTML = 'no response'
        }
        console.log('test', json_html);
        return await json_html;
    }
    userAction(url);
}
