import { stationStore } from "../models/station-store.js";

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
};
