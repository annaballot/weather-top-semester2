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
