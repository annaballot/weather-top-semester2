import { stationStore } from "../models/station-store.js";
import { readingStore } from "../models/reading-store.js";
import { stationConversions } from "../utils/conversions.js";
import { stationAnalytics } from "../utils/analytics.js";

export const stationController = {
  async index(request, response) {
    const station = await stationStore.getStationById(request.params.id);

    const latestReading = await stationStore.getLatestReading(
      request.params.id
    );
    const title = await station.title;
    const latitude = await station.latitude;
    const longitude = await station.longitude;
    const latestWeatherDescription = await station.latestWeatherDescription;
    const latestTempC = await station.latestTempC;
    const latestTempF = await station.latestTempF;
    const latestBFT = await station.latestBFT;
    const latestCompassDirection = await station.latestCompassDirection;
    const latestWindChill = await station.latestWindChill;
    const latestPressure = await station.latestPressure;
    const maxTemperature = await station.maxTemperature;
    const minTemperature = await station.minTemperature;
    const maxWindSpeed = await station.maxWindSpeed;
    const minWindSpeed = await station.minWindSpeed;
    const maxPressure = await station.maxPressure;
    const minPressure = await station.minPressure;

    console.log(
      `station.latestWeatherDescription ${station.latestWeatherDescription}`
    );

    const viewData = {
      // title: "Station",
      title: title,
      station: station,
      latitude: latitude,
      longitude: longitude,
      latestReading: latestReading,
      latestWeatherDescription: latestWeatherDescription,
      latestTempC: latestTempC,
      latestTempF: latestTempF,
      latestBFT: latestBFT,
      latestCompassDirection: latestCompassDirection,
      latestWindChill: latestWindChill,
      latestPressure: latestPressure,
      maxTemperature: maxTemperature,
      minTemperature: minTemperature,
      maxWindSpeed: maxWindSpeed,
      minWindSpeed: minWindSpeed,
      maxPressure: maxPressure,
      minPressure: minPressure,
    };
    response.render("station-view", viewData);
  },

  async addReading(request, response) {
    let station = await stationStore.getStationById(request.params.id);
    const newReading = {
      code: Number(request.body.code),
      temperature: Number(request.body.temperature),
      windSpeed: Number(request.body.windSpeed),
      windDirection: Number(request.body.windDirection),
      pressure: Number(request.body.pressure),
      // temperatureFahrenheit: stationConversions.convertTempToFahrenheit(
      //   Number(request.body.temperature)
      // ),
      // weatherDescription: stationConversions.convertWeatherCodes(
      //   Number(request.body.code)
      // ),
      // compassDirection: stationConversions.convertWindDirection(
      //   Number(request.body.windDirection)
      // ),
      // windBeaufort: stationConversions.convertBeaufort(
      //   Number(request.body.windSpeed)
      // ),
      // windChill: stationConversions.calculateWindChill(
      //   Number(request.body.temperature),
      //   Number(request.body.windSpeed)
      // ),
    };

    console.log(`adding reading ${newReading.title}`);

    await readingStore.addReading(station._id, newReading);

    const latestReading = await stationStore.getLatestReading(
      request.params.id
    );

    station = await stationStore.getStationById(request.params.id);
    const maxTemperature = await stationAnalytics.getMaxTemperature(station);
    const minTemperature = await stationAnalytics.getMinTemperature(station);
    const maxWindSpeed = await stationAnalytics.getMaxWindSpeed(station);
    const minWindSpeed = await stationAnalytics.getMinWindSpeed(station);
    const maxPressure = await stationAnalytics.getMaxPressure(station);
    const minPressure = await stationAnalytics.getMinPressure(station);
    
    const updatedStation = {
      title: station.title,
      latitude: station.latitude,
      longitude: station.longitude,
      userid: station.userid,
      latestWeatherDescription: stationConversions.convertWeatherCodes(
        latestReading.code
      ),
      latestTempC: latestReading.temperature,
      latestTempF: stationConversions.convertTempToFahrenheit(
        latestReading.temperature
      ),
      latestBFT: stationConversions.convertBeaufort(latestReading.windSpeed),
      latestCompassDirection: stationConversions.convertWindDirection(
        latestReading.windDirection
      ),
      latestWindChill: stationConversions.calculateWindChill(
        latestReading.temperature,
        latestReading.windSpeed
      ),
      latestPressure: latestReading.pressure,
      maxTemperature: maxTemperature,
      minTemperature: minTemperature,
      maxWindSpeed: maxWindSpeed,
      minWindSpeed: minWindSpeed,
      maxPressure: maxPressure,
      minPressure: minPressure,
    };
    // console.log(`updating station ${updatedStation.temperature}`);
    console.log(`updating station ${latestReading.code}`);

    await stationStore.updateStation(station, updatedStation);
    response.redirect("/station/" + station._id);
  },
};
