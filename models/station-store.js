/*
  This station-store model contains methods to add, delete, update, and find stations
*/

import { v4 } from "uuid";
import { initStore } from "../utils/store-utils.js";
import { readingStore } from "./reading-store.js";
import { stationAnalytics } from "../utils/analytics.js";
import { stationController } from "../controllers/station-controller.js";

const db = initStore("stations");

export const stationStore = {
  async getAllStations() {
    await db.read();
    return db.data.stations;
  },

  async addStation(station) {
    await db.read();
    station._id = v4();
    db.data.stations.push(station);
    await db.write();
    return station;
  },

  async getStationById(id) {
    await db.read();
    const list = db.data.stations.find((station) => station._id === id);
    list.readings = await readingStore.getReadingsByStationId(list._id);
    return list;
  },

  async deleteStationById(id) {
    await db.read();
    const index = db.data.stations.findIndex((station) => station._id === id);
    db.data.stations.splice(index, 1);
    await db.write();
  },

  async deleteAllStations() {
    db.data.stations = [];
    await db.write();
  },

  async getLatestReading(id) {
    await db.read();
    const list = db.data.stations.find((station) => station._id === id);
    list.readings = await readingStore.getReadingsByStationId(list._id);
    return list.readings[list.readings.length - 1];
  },

  async getStationsByUserId(userid) {
    await db.read();
    return db.data.stations.filter((station) => station.userid === userid);
  },

  async updateStation(station, updatedStation) {
    station.title = updatedStation.title;
    station.latitude = updatedStation.latitude;
    station.longitude = updatedStation.longitude;
    station.userid = updatedStation.userid;
    station.latestWeatherDescription = updatedStation.latestWeatherDescription;
    station.latestTempC = updatedStation.latestTempC;
    station.latestTempF = updatedStation.latestTempF;
    station.latestBFT = updatedStation.latestBFT;
    station.latestCompassDirection = updatedStation.latestCompassDirection;
    station.latestWindChill = updatedStation.latestWindChill;
    station.latestPressure = updatedStation.latestPressure;
    station.maxTemperature = updatedStation.maxTemperature;
    station.minTemperature = updatedStation.minTemperature;
    station.maxWindSpeed = updatedStation.maxWindSpeed;
    station.minWindSpeed = updatedStation.minWindSpeed;
    station.maxPressure = updatedStation.maxPressure;
    station.minPressure = updatedStation.minPressure;
    station.temperatureTrend = updatedStation.temperatureTrend;
    station.windSpeedTrend = updatedStation.windSpeedTrend;
    station.pressureTrend = updatedStation.pressureTrend;
    (station.apiTempTrend = updatedStation.apiTempTrend),
      (station.apiHumidityTrend = updatedStation.apiHumidityTrend),
      (station.apiWindSpeedTrend = updatedStation.apiWindSpeedTrend),
      (station.apiTrendLabels = updatedStation.apiTrendLabels),
      await db.write();
  },

  async sortStations(stations) {
    //sorts stations alphabetically by title, ignoring the case
    return stations.sort((a, b) =>
      a.title.toLowerCase() > b.title.toLowerCase() ? 1 : -1
    );
  },
};
