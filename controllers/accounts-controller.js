import { userStore } from "../models/user-store.js";

export const accountsController = {
  index(request, response) {
    const viewData = {
      title: "Login or Signup",
    };
    response.render("index", viewData);
  },

  login(request, response) {
    const viewData = {
      title: "Login to the Service",
    };
    response.render("login-view", viewData);
  },

  logout(request, response) {
    response.cookie("station", "");
    response.redirect("/");
  },

  signup(request, response) {
    const viewData = {
      title: "Login to the Service",
    };
    response.render("signup-view", viewData);
  },

  async register(request, response) {
    const user = request.body;
    await userStore.addUser(user);
    console.log(`registering ${user.email}`);
    const viewData = {
      title: "Login to the Service",
    };
    response.render("login-view", viewData);
  },

  async authenticate(request, response) {
    const user = await userStore.getUserByEmail(request.body.email);
    const passwordEntered = request.body.password;
    if (user && passwordEntered === user.password) {
      response.cookie("playlist", user.email);
      console.log(`logging in ${user.email}`);
      response.redirect("/dashboard");
    } else {
      const viewData = {
        userMessage:
          "Incorrect Email + Password combination, please try again.",
      };
      response.render("login-view", viewData);
    }
  },

  async getLoggedInUser(request) {
    const userEmail = request.cookies.playlist;
    return await userStore.getUserByEmail(userEmail);
  },
};
