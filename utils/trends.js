import { stationStore } from "../models/station-store.js";

export const stationTrends = {

    pressureTrend(station) {
    let trend = 0;
    if (station.readings.length > 2) {
      let values = [station.readings[station.readings.length-3].pressure, station.readings[station.readings.length-2].pressure, station.readings[station.readings.length-1].pressure];
      console.log(values);
      trend = stationTrends.calcTrend(values);
    }
    return trend;
  },

  calcTrend(values) {
    let trend = 0;
    if (values.length > 2) {
      if (( values[2] > values[1] ) && (values[1] > values[0])) {
        trend = 1;
      } else if (( values[2] < values[1] ) && (values[1] < values[0])) {
        trend = -1;
      }
    }
    return trend;
  },



};
