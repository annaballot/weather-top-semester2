import { stationStore } from "../models/station-store.js";
import { readingStore } from "../models/reading-store.js";
import { stationConversions } from "../utils/conversions.js";
import { stationAnalytics } from "../utils/analytics.js";
import { stationTrends } from "../utils/trends.js";
import { dateTimeHelpers } from "../utils/date-time.js";

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
    const temperatureTrend = await station.temperatureTrend;
    const windSpeedTrend = await station.windSpeedTrend;
    const pressureTrend = await station.pressureTrend;
    
    console.log(
      `station.latestWeatherDescription ${station.latestWeatherDescription}`
    );

    const viewData = {
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
      temperatureTrend: temperatureTrend,
      windSpeedTrend: windSpeedTrend,
      pressureTrend: pressureTrend,
    };
    response.render("station-view", viewData);
  },

  async addReading(request, response) {
    let station = await stationStore.getStationById(request.params.id);
    let submittedDate = await dateTimeHelpers.getCurrentDate();
    const newReading = {
      submittedDate: submittedDate,
      code: Number(request.body.code),
      temperature: Number(request.body.temperature),
      windSpeed: Number(request.body.windSpeed),
      windDirection: Number(request.body.windDirection),
      pressure: Number(request.body.pressure),
    };

    await readingStore.addReading(station._id, newReading);

    
    /**************************************************************
    Update the staion model with all the trends latest readings 
    after the new reading has been added
    **************************************************************/
    const latestReading = await stationStore.getLatestReading(request.params.id);
    station = await stationStore.getStationById(request.params.id); // update station after new reading has been added
    const maxTemperature = await stationAnalytics.getMaxTemperature(station);
    const minTemperature = await stationAnalytics.getMinTemperature(station);
    const maxWindSpeed = await stationAnalytics.getMaxWindSpeed(station);
    const minWindSpeed = await stationAnalytics.getMinWindSpeed(station);
    const maxPressure = await stationAnalytics.getMaxPressure(station);
    const minPressure = await stationAnalytics.getMinPressure(station);
    const latestWeatherDescription = await stationConversions.convertWeatherCodes(latestReading.code);
    const latestTempC = await latestReading.temperature;
    const latestTempF = await stationConversions.convertTempToFahrenheit(latestReading.temperature);
    const latestBFT = await stationConversions.convertBeaufort(latestReading.windSpeed);
    const latestCompassDirection = await stationConversions.convertWindDirection(latestReading.windDirection);
    const latestWindChill = await stationConversions.calculateWindChill(latestReading.temperature,latestReading.windSpeed);
    const pressureTrend = await stationTrends.pressureTrend(station);
    const temperatureTrend = await stationTrends.temperatureTrend(station);
    const windSpeedTrend = await stationTrends.windSpeedTrend(station);
    
    const updatedStation = {
      title: station.title,
      latitude: station.latitude,
      longitude: station.longitude,
      userid: station.userid,
      latestWeatherDescription: latestWeatherDescription,
      latestTempC: latestTempC,
      latestTempF: latestTempF,
      latestBFT: latestBFT,
      latestCompassDirection: latestCompassDirection,
      latestWindChill: latestWindChill,
      latestPressure: latestReading.pressure,
      maxTemperature: maxTemperature,
      minTemperature: minTemperature,
      maxWindSpeed: maxWindSpeed,
      minWindSpeed: minWindSpeed,
      maxPressure: maxPressure,
      minPressure: minPressure,
      temperatureTrend: temperatureTrend,
      windSpeedTrend: windSpeedTrend,
      pressureTrend: pressureTrend,
    };

    await stationStore.updateStation(station, updatedStation);
    response.redirect("/station/" + station._id);
  },
  
  
  //   public static List<Station> sortStations(List<Station> station) {
  //   station.sort(Comparator.comparing(Station::getName, String.CASE_INSENSITIVE_ORDER));
  //   Logger.info("Sorting Stations Alphabetically by Name");
  //   return station;
  // }

  
  async deleteReading(request, response) {
    const stationId = request.params.stationid;
    const readingId = request.params.readingid;
    console.log(`Deleting Reading ${readingId} from Station ${stationId}`);
    await readingStore.deleteReading(readingId);
    response.redirect("/station/" + stationId);
  },

};
