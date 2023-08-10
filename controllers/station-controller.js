import axios from "axios";

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
    const apiTempTrend = await station.apiTempTrend;
    const apiHumidityTrend = await station.apiHumidityTrend;
    const apiWindSpeedTrend = await station.apiWindSpeedTrend;
    const apiTrendLabels = await station.apiTrendLabels;

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
      apiTempTrend: apiTempTrend,
      apiHumidityTrend: apiHumidityTrend,
      apiWindSpeedTrend: apiWindSpeedTrend,
      apiTrendLabels: apiTrendLabels,
    };
    response.render("station-view", viewData);
  },

  async addReadingAPI(request, response) {
    let station = await stationStore.getStationById(request.params.id);
    let submittedDate = await dateTimeHelpers.getCurrentDate();
    console.log("rendering new report");
    const lat = station.latitude;
    const lng = station.longitude;
    const oneCallRequest = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lng}&units=metric&&appid=b64b22cb633461dbbcaff5f9f58b837d`;
    let newReading = {};
    const result = await axios.get(oneCallRequest);

    if (result.status == 200) {
      console.log(`API DATA AB`);
      console.log(result.data);
      const APIreading = result.data.current;
      newReading.submittedDate = submittedDate;
      newReading.code = APIreading.weather[0].id;
      newReading.temperature = APIreading.temp;
      newReading.windSpeed = APIreading.wind_speed;
      newReading.pressure = APIreading.pressure;
      newReading.windDirection = APIreading.wind_deg;

      newReading.apiTempTrend = [];
      newReading.apiHumidityTrend = [];
      newReading.apiWindSpeedTrend = [];
      newReading.apiTrendLabels = [];
      const trends = result.data.daily;
      for (let i = 0; i < trends.length; i++) {
        newReading.apiTempTrend.push(trends[i].temp.day);
        newReading.apiHumidityTrend.push(trends[i].humidity);
        newReading.apiWindSpeedTrend.push(trends[i].wind_speed);
        const date = new Date(trends[i].dt * 1000).toLocaleDateString("en-uk");
        newReading.apiTrendLabels.push(`${date}`);
      }
    }

    await readingStore.addReading(station._id, newReading);
    await stationAnalytics.updateStationSummary(request.params.id);
    response.redirect("/station/" + station._id);
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

    await stationAnalytics.updateStationSummary(request.params.id);
    response.redirect("/station/" + station._id);
  },

  async deleteReading(request, response) {
    const stationId = request.params.stationid;
    const readingId = request.params.readingid;
    console.log(`Deleting Reading ${readingId} from Station ${stationId}`);
    await readingStore.deleteReading(readingId);
    await stationAnalytics.updateStationSummary(stationId);
    response.redirect("/station/" + stationId);
  },
};
