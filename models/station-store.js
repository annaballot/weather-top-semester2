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
    return list.readings[list.readings.length-1];    
  },
  
  async getStationsByUserId(userid) {
    await db.read();
    return db.data.stations.filter((station) => station.userid === userid);
  },
  
  //   async updateStationWeather(id) {
  //   stationAnalytics.updateWeather(id);
  //   await db.write();
  // },
  
  
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
    station.pressureTrend = updatedStation.pressureTrend;

      
    await db.write();
  },
  
  
};
