import { stationStore } from "../models/station-store.js";
import { stationConversions } from "./conversions.js";
import { stationTrends } from "./trends.js";

export const stationAnalytics = {
  getMaxTemperature(station) {
    let maxTempReading = null;
    if (station.readings.length > 0) {
      maxTempReading = station.readings[0];
      station.readings.forEach((reading) => {
        if (reading.temperature > maxTempReading.temperature) {
          maxTempReading = reading;
        }
      });
      return maxTempReading.temperature;
    } else {
      return 0;
    }
  },

  getMinTemperature(station) {
    let minTempReading = null;
    if (station.readings.length > 0) {
      minTempReading = station.readings[0];
      station.readings.forEach((reading) => {
        if (reading.temperature < minTempReading.temperature) {
          minTempReading = reading;
        }
      });
      return minTempReading.temperature;
    } else {
      return 0;
    }
  },

  getMaxWindSpeed(station) {
    let maxWindSpeedReading = null;
    if (station.readings.length > 0) {
      maxWindSpeedReading = station.readings[0];
      station.readings.forEach((reading) => {
        if (reading.windSpeed > maxWindSpeedReading.windSpeed) {
          maxWindSpeedReading = reading;
        }
      });
      return maxWindSpeedReading.windSpeed;
    } else {
      return 0;
    }
  },

  getMinWindSpeed(station) {
    let minWindSpeedReading = null;
    if (station.readings.length > 0) {
      minWindSpeedReading = station.readings[0];
      station.readings.forEach((reading) => {
        if (reading.windSpeed < minWindSpeedReading.windSpeed) {
          minWindSpeedReading = reading;
        }
      });
      return minWindSpeedReading.windSpeed;
    } else {
      return 0;
    }
  },

  getMaxPressure(station) {
    let maxPressure = null;
    if (station.readings.length > 0) {
      maxPressure = station.readings[0];
      station.readings.forEach((reading) => {
        if (reading.pressure > maxPressure.pressure) {
          maxPressure = reading;
        }
      });
      return maxPressure.pressure;
    } else {
      return 0;
    }
  },

  getMinPressure(station) {
    let minPressure = null;
    if (station.readings.length > 0) {
      minPressure = station.readings[0];
      station.readings.forEach((reading) => {
        if (reading.pressure < minPressure.pressure) {
          minPressure = reading;
        }
      });
      return minPressure.pressure;
    } else {
      return 0;
    }
  },
  
  async updateStationSummary(id) {
   /**************************************************************
    Update the staion model with all the trends latest readings 
    after the new reading has been added
    **************************************************************/
    const latestReading = await stationStore.getLatestReading(id);
    const station = await stationStore.getStationById(id); // update station after new reading has been added
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
    const apiTempTrend = await latestReading.apiTempTrend;
    const apiTrendLabels = await latestReading.apiTrendLabels;
     
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
      apiTempTrend: apiTempTrend,
      apiTrendLabels: apiTrendLabels,
      
    };

    await stationStore.updateStation(station, updatedStation);
  },
};
