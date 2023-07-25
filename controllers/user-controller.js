import { userStore } from "../models/user-store.js";
import { accountsController } from "./accounts-controller.js";

export const userController = {
  
  async index(request, response) {
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
  
  

//   login(request, response) {
//     const viewData = {
//       title: "Login to the Service",
//     };
//     response.render("login-view", viewData);
//   },

//   logout(request, response) {
//     response.cookie("playlist", "");
//     response.redirect("/");
//   },

//   signup(request, response) {
//     const viewData = {
//       title: "Login to the Service",
//     };
//     response.render("signup-view", viewData);
//   },

//   async register(request, response) {
//     const user = request.body;
//     await userStore.addUser(user);
//     console.log(`registering ${user.email}`);
//     response.redirect("/");
//   },

//   async authenticate(request, response) {
//     const user = await userStore.getUserByEmail(request.body.email);
//     if (user) {
//       response.cookie("playlist", user.email);
//       console.log(`logging in ${user.email}`);
//       response.redirect("/dashboard");
//     } else {
//       response.redirect("/login");
//     }
//   },

//   async getLoggedInUser(request) {
//     const userEmail = request.cookies.playlist;
//     return await userStore.getUserByEmail(userEmail);
//   },
  
//     async updateAccount(request, response) {
    
//     const viewData = {
//       title: "User Update Dashboard",
//     };
//     console.log("dashboard rendering");
//       response.render("user-view", viewData);
    
//   },
};
