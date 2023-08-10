/*
  This accounts-controller helps control all actions related to the users account 
  such as logging in, checking passwords, registering, finding the user etc
*/

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

  async viewAccountDetails(request, response) {
    const loggedInUser = await accountsController.getLoggedInUser(request);
    const userID = await loggedInUser._id;
    const firstName = await loggedInUser.firstName;
    const lastName = await loggedInUser.lastName;
    const email = await loggedInUser.email;
    const password = await loggedInUser.password;
    const viewData = {
      title: "User Update",
      userID: userID,
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
    };
    console.log(firstName);
    response.render("user-view", viewData);
  },

  async updateAccountDetails(request, response) {
    const loggedInUser = await accountsController.getLoggedInUser(request);

    const updatedUser = {
      firstName: request.body.firstName,
      lastName: request.body.lastName,
      email: request.body.email,
      password: request.body.password,
    };

    console.log(updatedUser);

    await userStore.updateUserDetails(loggedInUser, updatedUser);
    response.redirect("/myAccount");
  },
};
