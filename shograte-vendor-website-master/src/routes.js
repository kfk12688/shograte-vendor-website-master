import Index from "views/Index.js";
import Login from "views/Login.js";
import Register from "views/Register.js";
import ForgetPassword from "views/ForgetPassword.js";
import ForgetPasswordVerifyOtp from "views/ForgetPasswordVerifyOtp";
import UpdatePassword from "views/UpdatePassword";
import Categories from "views/categories";
import SubCategories from "views/SubCategories";
import Vendors from "views/Vendors";
import Products from "views/Products";
// import Productss from "views/forms/Productss";
import Deals from "views/Deals";
import Orders from "views/Orders";

//create component registery to load components and call it in the router

const componentRegistry = {
  "Login": Login,
  "Register": Register,
  "Index": Index,
  "ForgetPassword": ForgetPassword,
  "ForgetPasswordVerifyOtp": ForgetPasswordVerifyOtp,
  "UpdatePassword": UpdatePassword,
  "Vendors": Vendors,
  "Products": Products,
  "Deals": Deals
}


//create default routes this is the default routes for all the venodor

var routes = [
  {
    path: "/index",
    name: "Dashboard",
    icon: "ni ni-tv-2 text-primary",
    component: Index,
    layout: "/admin",
  },
  {
    path: "/register",
    name: "Register",
    icon: "ni ni-circle-08 text-pink",
    component: Register,
    layout: "/auth",
  },
  {
    path: "/login",
    name: "Login",
    icon: "ni ni-key-25 text-info",
    component: Login,
    layout: "/auth",
  },

  {
    path: "/forget-password",
    name: "Forget Password",
    icon: "ni ni-key-25 text-info",
    component: ForgetPassword,
    layout: "/auth",
  },
  {
    path: "/verify-otp",
    name: "Verify Password OTP",
    icon: "ni ni-key-25 text-info",
    component: ForgetPasswordVerifyOtp,
    layout: "/auth",
  },
  {
    path: "/update-password",
    name: "Update Password",
    icon: "ni ni-key-25 text-info",
    component: UpdatePassword,
    layout: "/auth",
  },
  {
    path: "/profile",
    name: "My Profile",
    icon: "ni ni-single-02",
    component: Vendors,
    layout: "/admin",
    
  },
  {
    path: "/products",
    name: "Products",
    icon: "ni ni-archive-2",
    component: Products,
    layout: "/admin",
    
  },

  {
    path: "/deals",
    name: "Deals",
    icon: "ni ni-money-coins",
    component: Deals,
    layout: "/admin",
  },

  {
    path: "/orders",
    name: "Orders",
    icon: "ni ni-money-coins",
    component: Orders,
    layout: "/admin",
  },

  // {
  //   path: "/produc",
  //   name: "products",
  //   icon: "ni ni-money-coins",
  //   component: Productss,
  //   layout: "/admin",
    
  // },


];
export default routes;
