import { stationStore } from "../models/station-store.js";
import { readingStore } from "../models/reading-store.js";
import { stationConversions } from "../utils/conversions.js";

export const stationController = {
  async index(request, response) {
    const station = await stationStore.getStationById(request.params.id);
    
    const latestReading = await stationStore.getLatestReading(request.params.id);
    console.log("getLatestReading");
    console.log(latestReading);
    
    // const latestReading.temperatureFahrenheit = 
    
    
    
    const viewData = {
      title: "Station",
      station: station,
      latestReading: latestReading,
    };
    response.render("station-view", viewData);
  },

  async addReading(request, response) {
    const station = await stationStore.getStationById(request.params.id);
    const newReading = {
      code: Number(request.body.code),
      temperature: Number(request.body.temperature),
      windSpeed: Number(request.body.windSpeed),
      windDirection: Number(request.body.windDirection),
      pressure: Number(request.body.pressure),
      temperatureFahrenheit: stationConversions.convertTempToFahrenheit(Number(request.body.temperature)),
      weatherDescription: stationConversions.convertWeatherCodes(Number(request.body.code)),
      compassDirection: stationConversions.convertWindDirection(Number(request.body.windDirection)),
      windBeaufort: stationConversions.convertBeaufort(Number(request.body.windSpeed)),      
      windChill: stationConversions.calculateWindChill(Number(request.body.temperature),Number(request.body.windSpeed)),
      
    };
    console.log(`adding reading ${newReading.title}`);
    await readingStore.addReading(station._id, newReading);
    response.redirect("/station/" + station._id);
  },
};
