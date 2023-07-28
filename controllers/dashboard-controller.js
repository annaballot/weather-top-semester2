import { stationStore } from "../models/station-store.js";
import { accountsController } from "./accounts-controller.js";
import { stationConversions } from "../utils/conversions.js";
import { stationAnalytics } from "../utils/analytics.js";

export const dashboardController = {
  async index(request, response) {
    const loggedInUser = await accountsController.getLoggedInUser(request);
    const unsortedStations = await stationStore.getStationsByUserId(loggedInUser._id);
    const stations = await stationStore.sortStations(unsortedStations);
    
    const viewData = {
      title: "Station Dashboard",
      stations: stations,
    };
    console.log("dashboard rendering");
    response.render("dashboard-view", viewData);
  },

  async addStation(request, response) {
    const loggedInUser = await accountsController.getLoggedInUser(request);
    const newStation = {
      title: request.body.title,
      latitude: Number(request.body.latitude),
      longitude: Number(request.body.longitude),
      userid: loggedInUser._id,
    };
    console.log(`adding station ${newStation.title}`);
    await stationStore.addStation(newStation);
    response.redirect("/dashboard");
  },
};
