export const stationConversions = {
  convertTempToFahrenheit(temperature) {
    return temperature * (9 / 5) + 32;
  },

  calculateWindChill(temperature, windSpeed) {
    //to round to 1 decimal place, this multiplys the calculation by 10, rounds, then divides by 10
    return (
      Math.round(
        (13.12 +
          0.6215 * temperature -
          11.37 * Math.pow(windSpeed, 0.16) +
          0.3965 * temperature * Math.pow(windSpeed, 0.16)) *
          10
      ) / 10.0
    );
  },

  convertBeaufort(windSpeed) {
    let beaufort = null;

    if (windSpeed >= 0 && windSpeed <= 1) {
      beaufort = 0;
    } else if (windSpeed > 1 && windSpeed < 6) {
      beaufort = 1;
    } else if (windSpeed >= 6 && windSpeed < 12) {
      beaufort = 2;
    } else if (windSpeed >= 12 && windSpeed < 20) {
      beaufort = 3;
    } else if (windSpeed >= 20 && windSpeed < 29) {
      beaufort = 4;
    } else if (windSpeed >= 29 && windSpeed < 39) {
      beaufort = 5;
    } else if (windSpeed >= 39 && windSpeed < 50) {
      beaufort = 6;
    } else if (windSpeed >= 50 && windSpeed < 62) {
      beaufort = 7;
    } else if (windSpeed >= 62 && windSpeed < 75) {
      beaufort = 8;
    } else if (windSpeed >= 75 && windSpeed < 89) {
      beaufort = 9;
    } else if (windSpeed >= 89 && windSpeed < 103) {
      beaufort = 10;
    } else if (windSpeed >= 103 && windSpeed <= 117) {
      beaufort = 11;
    } else {
      beaufort = 999;
    }
    return beaufort;
  },

  convertWindDirection(windDegree) {
    let compassDirection = null;

    if (windDegree >= 348.75 && windDegree <= 360) {
      compassDirection = "North";
    } else if (windDegree >= 0 && windDegree <= 11.25) {
      compassDirection = "North";
    } else if (windDegree >= 11.25 && windDegree < 33.75) {
      compassDirection = "North-Northeast";
    } else if (windDegree >= 33.75 && windDegree < 56.25) {
      compassDirection = "Northeast";
    } else if (windDegree >= 56.25 && windDegree < 78.75) {
      compassDirection = "East-Northeast";
    } else if (windDegree >= 78.75 && windDegree < 101.25) {
      compassDirection = "East";
    } else if (windDegree >= 101.25 && windDegree < 123.75) {
      compassDirection = "East-Southeast";
    } else if (windDegree >= 123.75 && windDegree < 146.25) {
      compassDirection = "Southeast";
    } else if (windDegree >= 146.25 && windDegree < 168.75) {
      compassDirection = "South-Southeast";
    } else if (windDegree >= 168.75 && windDegree < 191.25) {
      compassDirection = "South";
    } else if (windDegree >= 191.25 && windDegree < 213.75) {
      compassDirection = "South-Southwest";
    } else if (windDegree >= 213.75 && windDegree < 236.25) {
      compassDirection = "Southwest";
    } else if (windDegree >= 236.25 && windDegree < 258.75) {
      compassDirection = "West-Southwest";
    } else if (windDegree >= 258.75 && windDegree < 281.25) {
      compassDirection = "West";
    } else if (windDegree >= 281.25 && windDegree < 303.75) {
      compassDirection = "West-Northwest";
    } else if (windDegree >= 303.75 && windDegree < 326.25) {
      compassDirection = "North-West";
    } else if (windDegree >= 326.25 && windDegree < 348.75) {
      compassDirection = "North-Northwest";
    } else {
      compassDirection = "ERROR";
    }
    return compassDirection;
  },

  convertWeatherCodes(code) {
    let weatherDescription = null;
    switch (code) {
      case 200:
        weatherDescription = "Thunderstorm";
        break;
      case 201:
        weatherDescription = "Thunderstorm";
        break;
      case 202:
        weatherDescription = "Thunderstorm";
        break;
      case 210:
        weatherDescription = "Thunderstorm";
        break;
      case 211:
        weatherDescription = "Thunderstorm";
        break;
      case 212:
        weatherDescription = "Thunderstorm";
        break;
      case 221:
        weatherDescription = "Thunderstorm";
        break;
      case 230:
        weatherDescription = "Thunderstorm";
        break;
      case 231:
        weatherDescription = "Thunderstorm";
        break;
      case 232:
        weatherDescription = "Thunderstorm";
        break;
      case 300:
        weatherDescription = "Drizzle";
        break;
      case 301:
        weatherDescription = "Drizzle";
        break;
      case 302:
        weatherDescription = "Drizzle";
        break;
      case 310:
        weatherDescription = "Drizzle";
        break;
      case 311:
        weatherDescription = "Drizzle";
        break;
      case 312:
        weatherDescription = "Drizzle";
        break;
      case 313:
        weatherDescription = "Drizzle";
        break;
      case 314:
        weatherDescription = "Drizzle";
        break;
      case 321:
        weatherDescription = "Drizzle";
        break;
      case 500:
        weatherDescription = "Rain";
        break;
      case 501:
        weatherDescription = "Rain";
        break;
      case 502:
        weatherDescription = "Rain";
        break;
      case 503:
        weatherDescription = "Rain";
        break;
      case 504:
        weatherDescription = "Rain";
        break;
      case 511:
        weatherDescription = "Rain";
        break;
      case 520:
        weatherDescription = "Rain";
        break;
      case 521:
        weatherDescription = "Rain";
        break;
      case 522:
        weatherDescription = "Rain";
        break;
      case 531:
        weatherDescription = "Rain";
        break;
      case 600:
        weatherDescription = "Snow";
        break;
      case 601:
        weatherDescription = "Snow";
        break;
      case 602:
        weatherDescription = "Snow";
        break;
      case 611:
        weatherDescription = "Snow";
        break;
      case 612:
        weatherDescription = "Snow";
        break;
      case 613:
        weatherDescription = "Snow";
        break;
      case 615:
        weatherDescription = "Snow";
        break;
      case 616:
        weatherDescription = "Snow";
        break;
      case 620:
        weatherDescription = "Snow";
        break;
      case 621:
        weatherDescription = "Snow";
        break;
      case 622:
        weatherDescription = "Snow";
        break;
      case 701:
        weatherDescription = "Mist";
        break;
      case 711:
        weatherDescription = "Smoke";
        break;
      case 721:
        weatherDescription = "Haze";
        break;
      case 731:
        weatherDescription = "Dust";
        break;
      case 741:
        weatherDescription = "Fog";
        break;
      case 751:
        weatherDescription = "Sand";
        break;
      case 761:
        weatherDescription = "Dust";
        break;
      case 762:
        weatherDescription = "Ash";
        break;
      case 771:
        weatherDescription = "Squall";
        break;
      case 781:
        weatherDescription = "Tornado";
        break;
      case 800:
        weatherDescription = "Clear";
        break;
      case 801:
        weatherDescription = "Clouds";
        break;
      case 802:
        weatherDescription = "Clouds";
        break;
      case 803:
        weatherDescription = "Clouds";
        break;
      case 804:
        weatherDescription = "Clouds";
        break;
    }
    return weatherDescription;
  },
};
