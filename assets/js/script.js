
let bDebugging = false;

const sAPIkey = "b96684f6f3c9f86da122a132d7c59c84";
const locStorageKey = "CityWeather";

function Convert2Fahrenheit( Temp2Convert )
{
    // To convert Celsius to Fahrenheit:
    //    (0°C × 9/5) + 32

    // To convert Kelvins to Fahrenheit:
    //    (0K − 273.15) × 9/5 + 32 = -459.7°F

    return Math.floor( ((Temp2Convert - 273.15) * 9 / 5) + 32 );
}

function showPage()
{
    let elSelectedCity = document.getElementById( "btnCitySearch" );
    let elClearHistory = document.getElementById( "btnClearHistory" );
    
    var searchHistory = JSON.parse( localStorage.getItem(locStorageKey) ) || [];
    
    if ( bDebugging )
        console.log( "City search list: [" + searchHistory + "]" );
    
    // My {API key}: b96684f6f3c9f86da122a132d7c59c84
    // api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}
    // api.openweathermap.org/data/2.5/weather?q={city name},{state code}&appid={API key}
    // api.openweathermap.org/data/2.5/weather?q={city name},{state code},{country code}&appid={API key}
    // api.openweathermap.org/data/2.5/weather?zip={zip code},{country code}&appid={API key}
    // {ISO 3166 country code} : USA = 840
    
    // State Codes:
    //    Note: ISO 3166-2 uses "US-"+2charState (e.g., US-CA)
    var aStateInfo = [
        { sName: "Alabama",
          sStateAbbr: "AL",
          iStateCode: "01"
        },
        { sName: "Alaska",
          sStateAbbr: "AK",
          iStateCode: "54"
        },
        { sName: "Arizona",
          sStateAbbr: "AZ",
          iStateCode: "02"
        },
        { sName: "Arkansas",
          sStateAbbr: "AR",
          iStateCode: "03"
        },
        { sName: "California",
          sStateAbbr: "CA",
          iStateCode: "04"
        },
        { sName: "Colorado",
          sStateAbbr: "CO",
          iStateCode: "05"
        },
        { sName: "Connecticut",
          sStateAbbr: "CT",
          iStateCode: "06"
        },
        { sName: "Delaware",
          sStateAbbr: "DE",
          iStateCode: "07"
        },
        { sName: "District of Columbia",
          sStateAbbr: "DC",
          iStateCode: "08"
        },
        { sName: "Florida",
          sStateAbbr: "FL",
          iStateCode: "09"
        },
        { sName: "Georgia",
          sStateAbbr: "GA",
          iStateCode: "10"  // ANSI FIPS Code: "13"
        },
        { sName: "Hawaii",
          sStateAbbr: "HI",
          iStateCode: "52"
        },
        { sName: "Idaho",
          sStateAbbr: "ID",
          iStateCode: "11"
        },
        { sName: "Illinois",
          sStateAbbr: "IL",
          iStateCode: "12"
        },
        { sName: "Indiana",
          sStateAbbr: "IN",
          iStateCode: "13"
        },
        { sName: "Iowa",
          sStateAbbr: "IA",
          iStateCode: "14"
        },
        { sName: "Kansas",
          sStateAbbr: "KS",
          iStateCode: "15"
        },
        { sName: "Kentucky",
          sStateAbbr: "KY",
          iStateCode: "16"
        },
        { sName: "Louisiana",
          sStateAbbr: "LA",
          iStateCode: "17"
        },
        { sName: "Maine",
          sStateAbbr: "ME",
          iStateCode: "18"
        },
        { sName: "Maryland",
          sStateAbbr: "MD",
          iStateCode: "19"
        },
        { sName: "Massachusetts",
          sStateAbbr: "MA",
          iStateCode: "20"
        },
        { sName: "Michigan",
          sStateAbbr: "MI",
          iStateCode: "21"
        },
        { sName: "Minnesota",
          sStateAbbr: "MN",
          iStateCode: "22" // ANSI FIPS:"27"
        },
        { sName: "Mississippi",
          sStateAbbr: "MS",
          iStateCode: "23"
        },
        { sName: "Missouri",
          sStateAbbr: "MO",
          iStateCode: "24"
        },
        { sName: "Montana",
          sStateAbbr: "MT",
          iStateCode: "25"
        },
        { sName: "Nebraska",
          sStateAbbr: "NE",
          iStateCode: "26"
        },
        { sName: "Nevada",
          sStateAbbr: "NV",
          iStateCode: "27"
        },
        { sName: "New Hampshire",
          sStateAbbr: "NH",
          iStateCode: "28"
        },
        { sName: "New Jersey",
          sStateAbbr: "NJ",
          iStateCode: "29"
        },
        { sName: "New Mexico",
          sStateAbbr: "NM",
          iStateCode: "30"
        },
        { sName: "New York",
          sStateAbbr: "NY",
          iStateCode: "31"
        },
        { sName: "North Carolina",
          sStateAbbr: "NC",
          iStateCode: "32"
        },
        { sName: "North Dakota",
          sStateAbbr: "ND",
          iStateCode: "33"
        },
        { sName: "Ohio",
          sStateAbbr: "OH",
          iStateCode: "34"
        },
        { sName: "Oklahoma",
          sStateAbbr: "OK",
          iStateCode: "35"
        },
        { sName: "Oregon",
          sStateAbbr: "OR",
          iStateCode: "36"
        },
        { sName: "Pennsylvania",
          sStateAbbr: "PA",
          iStateCode: "37"
        },
        { sName: "Rhode Island",
          sStateAbbr: "RI",
          iStateCode: "38"
        },
        { sName: "South Carolina",
          sStateAbbr: "SC",
          iStateCode: "39"
        },
        { sName: "South Dakota",
          sStateAbbr: "SD",
          iStateCode: "40"
        },
        { sName: "Tennessee",
          sStateAbbr: "TN",
          iStateCode: "41"
        },
        { sName: "Texas",
          sStateAbbr: "TX",
          iStateCode: "42"
        },
        { sName: "Utah",
          sStateAbbr: "UT",
          iStateCode: "43"
        },
        { sName: "Vermont",
          sStateAbbr: "VT",
          iStateCode: "44"
        },
        { sName: "Virginia",
          sStateAbbr: "VA",
          iStateCode: "45"
        },
        { sName: "Washington",
          sStateAbbr: "WA",
          iStateCode: "46"
        },
        { sName: "West Virginia",
          sStateAbbr: "WV",
          iStateCode: "47"
        },
        { sName: "Wisconsin",
          sStateAbbr: "WI",
          iStateCode: "48"
        },
        { sName: "Wyoming",
          sStateAbbr: "WY",
          iStateCode: "49"
        }
    ];
    
    // When the search button is clicked, 
    // locate the weather associated to the city name typed by the user
    function getWeather( sCityName )
    {
        let bRetVal = false;
        
        // if ( sCityName && (sCityName.length > 0) )
        // {
        
        var sCity2Locate = "";
        var sState2Locate = "";
        var sSearchCriteria = "";
        
        sSearchCriteria = sCityName.trim();
        var aSearchCriteria = sSearchCriteria.split(',') || [];
        for( var i=0; i < aSearchCriteria.length; i++ )
        {
            if ( bDebugging )
                console.log( "Search criteria[" + i + "]: " + aSearchCriteria[i] );
            switch( i ) {
                case 0:
                    sCity2Locate = aSearchCriteria[i].trim();
                    break;
                case 1:
                    sState2Locate = aSearchCriteria[i].trim();
                    break;
            }
        }
        var iStateCode = "", iStateIdx = -1;
        var sStateAbbr = "";
        if ( sState2Locate.length > 0 ) {
            var sState = sState2Locate.toUpperCase();
            for( var i=0; (iStateCode === "") && (i < aStateInfo.length); i++ )
            {
                if ( aStateInfo[i].sStateAbbr === sState ) {
                    iStateIdx = i;
                    iStateCode = aStateInfo[i].iStateCode;
                    sStateAbbr = aStateInfo[i].sStateAbbr;
                }
            }
        }
        
        if ( bDebugging ) {
            if ( sCity2Locate.length > 0 )
               console.log( "City2Locate: \"" + sCity2Locate + "\"" );
            if ( (sState2Locate.length > 0) && (iStateIdx >= 0) ) {
                console.log( "State2Locate: \"" + aStateInfo[iStateIdx].sName + "\"" );
            }
        }
        
        //  Using saved city name, execute a current condition get request from open weather map api
        let sURL = "";
        if ( sCity2Locate.length > 0 )
        {
            if ( (sState2Locate.length > 0) && (iStateIdx >= 0) ) {
                sURL = "https://api.openweathermap.org/data/2.5/weather?"
                        + "q=" + sCity2Locate 
                          + "," + iStateCode
                          + "," + "840" // Coutry Code for US
                        + "&appid=" + sAPIkey
                        + "&units=imperial";
            } else {
                sURL = "https://api.openweathermap.org/data/2.5/weather?"
                        + "q=" + sCity2Locate 
                        + "&appid=" + sAPIkey
                        + "&units=imperial";
            }
        }
        
        if ( bDebugging )
            console.log( "Weather URL: " + sURL );
        
        axios.get( sURL )
        .then( function(response)
        {
            if ( bDebugging ) {
                console.log( "======================================================================" );
                console.log( response );
            }
            
            // Convert the date value received to milliseconds
            // so we can construct a standard Date() object:
            
            // response.data.dt : Time of data forecasted (GMT)
            let currentDate = new Date( response.data.dt*1000 );
            
            if ( bDebugging )
                console.log( "Weather Date obtained: " + currentDate );
            
            var iMonth = currentDate.getMonth()+1;
            var iDay = currentDate.getDate();
            var iYear = currentDate.getFullYear();
            
            // var iHour = currentDate.getHours();
            // var iMin = currentDate.getMinutes();
            // var iSec = currentDate.getSeconds();
            // var iMSec = currentDate.getMilliseconds();
            // var sAMorPM = ( iHour < 12 ? "am" : "pm" );
            // var sHour = ( (iHour < 12 ) ? (iHour === 0 ? "12" : iHour) : (iHour-12) );
            // var sMin = ( iMin < 10 ? "0"+iMin : iMin );
            // var sSec = ( iSec < 10 ? "0"+iSec : iSec );
            
            var elCityHdrEl = document.getElementById( "cityInfoHdr" );
            elCityHdrEl.innerHTML = response.data.name + " (" + iMonth + "/" + iDay + "/" + iYear + ") ";
            
            var weatherPic = response.data.weather[0].icon;
            
            var elCurrentPicEl = document.getElementById( "cityWeatherPic" );
            elCurrentPicEl.setAttribute( "src", "https://openweathermap.org/img/wn/" + weatherPic + "@2x.png" );
            elCurrentPicEl.setAttribute ("alt", response.data.weather[0].description );
            
            var elCurrentTempEl = document.getElementById( "cityTemperature" );
            // elCurrentTempEl.innerHTML = "Temperature: " + Convert2Fahrenheit(response.data.main.temp) + " &#176F";
            elCurrentTempEl.innerHTML = "Temperature: " + Math.floor(response.data.main.temp) + " &degF"; // " &#176F";
            
            var elCityHumidityEl = document.getElementById("cityHumidity");4
            elCityHumidityEl.innerHTML = "Humidity: " + response.data.main.humidity + "%";
            
            var elCityWindEl = document.getElementById( "cityWindSpeed" );
            elCityWindEl.innerHTML = "Wind Speed: " + response.data.wind.speed + " MPH";
            
            var sUVQueryURL = "https://api.openweathermap.org/data/2.5/uvi/forecast?"
                              + "lat=" + response.data.coord.lat 
                              + "&lon=" + response.data.coord.lon 
                              + "&appid=" + sAPIkey 
                              + "&cnt=1";
            
            //------------------------------
            // UV-Index:
            //    0..2: Low
            //    3..7: Moderate to High
            //    8..11: Very High to Extreme
            //------------------------------------------------------
            // Bootstrap Badges available:
            // <span class="badge badge-primary">Primary</span>
            // <span class="badge badge-secondary">Secondary</span>
            // <span class="badge badge-success">Success</span>
            // <span class="badge badge-danger">Danger</span>
            // <span class="badge badge-warning">Warning</span>
            // <span class="badge badge-info">Info</span>
            // <span class="badge badge-light">Light</span>
            // <span class="badge badge-dark">Dark</span>
            //------------------------------------------------------
            
            var nUVIndex=0;
            var sUVBadge="";
            
            axios.get( sUVQueryURL )
            .then( function(response2)
            {
              if ( bDebugging ) {
                  console.log( "UV-Query:" );
                  console.log( response2 );
              }
              let elUVIndex = document.createElement( "span" );
              nUVIndex = Math.floor(response2.data[0].value);
              switch( nUVIndex ) {
                  case 0:
                  case 1:
                  case 2:
                      sUVBadge="badge badge-info";
                      break;
                  case 3:
                  case 4:
                  case 5:
                  case 6:
                  case 7:
                      sUVBadge="badge badge-warning";
                      break;
                  default:
                      sUVBadge="badge badge-danger";
              }
              if ( bDebugging )
                  console.log( "UV-Index: [" + nUVIndex + "] ("+sUVBadge+")" );
              elUVIndex.setAttribute( "class", sUVBadge );
              elUVIndex.innerHTML = response2.data[0].value;
              var elCityUVEl = document.getElementById( "UV-index" );
              elCityUVEl.innerHTML = "UV Index: ";
              elCityUVEl.append( elUVIndex );
            });
            
            // ---------------------------------------------------------
            // Using the response received for our City query,
            // execute a 5-day / 3-hour forecast GET request 
            // from the open weather map api
            // ---------------------------------------------------------
            
            // By using [.id], we can avoid any ambiguous name issues 
            // relating to our forecast information:
            let cityID = response.data.id;
            //                          api.openweathermap.org/data/2.5/forecast?q={city name}&appid={API key}
            let sForecastURL = "https://api.openweathermap.org/data/2.5/forecast?"
                                + "id=" + cityID 
                                + "&appid=" + sAPIkey
                                + "&units=imperial";

            if ( bDebugging ) {
                console.log( "///////////////////////////////////////////////////" );
                console.log( "Forecast Query: " + sForecastURL );
            }
            
            axios.get( sForecastURL )
              .then( function(response)
              {
                // display forecast for next 5 days:
                if ( bDebugging )
                    console.log( response) ;
                
                let elForecastEls = document.querySelectorAll(".forecast");
                for ( var i=0; ( i < elForecastEls.length ); i++ )
                {
                  elForecastEls[i].innerHTML = "";
                  
                  var iIndex = (i*8)+7; // each forecast entry is for 3 hours...
                  
                  var lResponseDtTm = response.data.list[iIndex].dt*1000; // convert to milliseconds
                  //lResponseDtTm += (2*60*60*1000);
                  var dttmForecast = new Date( lResponseDtTm );
                  
                  if ( bDebugging )
                    console.log( "Forecast Date [" + i + "] obtained: " + dttmForecast );

                  var iMonth = dttmForecast.getMonth()+1;
                  var iDay = dttmForecast.getDate();
                  var iYear = dttmForecast.getFullYear();
                
                  var iHour = dttmForecast.getHours();
                  var iMin = dttmForecast.getMinutes();
                  var iSec = dttmForecast.getSeconds();
                  var iMSec = dttmForecast.getMilliseconds();
                
                  let elForecastDateEl = document.createElement( "p" );
                  elForecastDateEl.setAttribute( "class", "mt-3 mb-0 forecast-date" );
                  elForecastDateEl.innerHTML = iMonth + "/" + iDay + "/" + iYear;
                  elForecastEls[i].append( elForecastDateEl );
                  
                  // if ( bDebugging ) {
                    // UTC: Universal Time Coordinated (also known as GMT)
                    let elForecastTimeEl = document.createElement( "p" );
                    elForecastTimeEl.setAttribute( "class", "mt-3 mb-0 forecast-date" );
                    var sAMorPM = ( iHour < 12 ? "am" : "pm" );
                    var sHour = ( (iHour < 12 ) ? (iHour === 0 ? "12" : iHour) : (iHour-12) );
                    var sMin = ( iMin < 10 ? "0"+iMin : iMin );
                    var sSec = ( iSec < 10 ? "0"+iSec : iSec );
                    // elForecastTimeEl.innerHTML = sHour + ":" + sMin + ":" + sSec + " "+sAMorPM;
                    elForecastTimeEl.innerHTML = sHour + ":" + sMin + " "+sAMorPM;
                    elForecastEls[i].append( elForecastTimeEl );
                  // }
                  
                  let forecastWeatherEl = document.createElement( "img" );
                  forecastWeatherEl.setAttribute( "src", "https://openweathermap.org/img/wn/" 
                                                        + response.data.list[iIndex].weather[0].icon 
                                                        + "@2x.png" );
                  forecastWeatherEl.setAttribute("alt",response.data.list[iIndex].weather[0].description);
                  elForecastEls[i].append( forecastWeatherEl );
                  
                  let elForecastTempEl = document.createElement("p");
                  // elForecastTempEl.innerHTML = "Temp: " + Convert2Fahrenheit(response.data.list[iIndex].main.temp) + " &#176F";
                  elForecastTempEl.innerHTML = "Temp: " + Math.floor(response.data.list[iIndex].main.temp) + " &degF";; //" &#176F";
                  elForecastEls[i].append( elForecastTempEl );
                
                  let elForecastHumidityEl = document.createElement("p");
                  elForecastHumidityEl.innerHTML = "Humidity: " + response.data.list[iIndex].main.humidity + "%";
                  elForecastEls[i].append( elForecastHumidityEl );
                }
                bRetVal = true;
              })
              bRetVal = true;
        }) // endThen axios.get response for city or city,state
        .catch( function(error) {
            if ( bDebugging )
                console.log( 'Error!' );
            if ( sCityName === "" )
                alert( "Please enter a city name to locate weather for!" );
            else
                alert( "Problem encountered!  Unable to locate \"" + sCityName + "\"\n"
                        + "Error received: " + "[" + error + "]" );
            if ( bDebugging )
                console.log( "Popping: ["+searchHistory.pop( sCityName ) + "]" );
            localStorage.setItem( locStorageKey, JSON.stringify(searchHistory) );
            displaySearchHistory();
        } );
        
        // }

        return( bRetVal );
    }
    
    function displaySearchHistory()
    {
        if ( bDebugging )
            console.log( "displaySearchHistory(length=="+searchHistory.length+")" );
        
        var elCityHistoryEl = document.getElementById("cityHistory");
        elCityHistoryEl.innerHTML = "";

        for( var i=0; i < searchHistory.length; i++ )
        {
            let elHistoryItem = document.createElement( "input" );
            elHistoryItem.setAttribute( "type", "text" );
            elHistoryItem.setAttribute( "readonly", true );
            elHistoryItem.setAttribute( "class", "form-control d-block bg-white text-center" );
            elHistoryItem.setAttribute( "value", searchHistory[i] );
            elHistoryItem.addEventListener( "click", function()
            {
                getWeather( elHistoryItem.value );
            })
            elCityHistoryEl.append( elHistoryItem );
        }
    }
    
    elSelectedCity.addEventListener( "click", function()
    {
        let elCity = document.getElementById( "cityName" );
        let sCity2Query = "";
        var sCityName = elCity.value;
        sCity2Query = sCityName.trim();
        elCity.value = "";
        
        // if ( sCity2Query && (sCity2Query.length > 0) )
        // {
            if ( bDebugging )
                console.log( "Obtaining weather for: " + sCity2Query );
            
            getWeather( sCity2Query );
            if ( bDebugging )
                console.log( "Adding to history: [" + sCity2Query + "]" );
            
            var bFound = false;
            var sCity2Verify = sCity2Query.toLowerCase();
            var sCityInHistory = "";
            for( var i=0; i < searchHistory.length; i++ ) {
                sCityInHistory = searchHistory[i].toLowerCase();
                if ( sCityInHistory === sCity2Verify )
                    bFound = true;
            }
            
            if ( !bFound ) {
                searchHistory.push( sCity2Query );
                localStorage.setItem( locStorageKey, JSON.stringify(searchHistory) );
            }
            
        // }
        
        if ( bDebugging )
            console.log( "displaySearchHistory: elSelectedCity click()" );
        displaySearchHistory();
    })
    
    elClearHistory.addEventListener( "click",function()
    {
        searchHistory = [];
        localStorage.clear();
        // localStorage.setItem( locStorageKey, JSON.stringify(searchHistory) );
        if ( bDebugging )
            console.log( "displaySearchHistory: elClearHistory click()" );
        displaySearchHistory();
        window.location.replace("./index.html");
    })

    if ( bDebugging )
        console.log( "displaySearchHistory: Startup()" );
    displaySearchHistory();
    if ( searchHistory.length > 0 )
        getWeather( searchHistory[searchHistory.length - 1] );


//  Save user's search requests and display them underneath search form
//  When page loads, automatically generate current conditions and 5-day 
//  forecast for the last city the user searched for

}

showPage();
