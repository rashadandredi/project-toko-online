import React, {Component} from "react";
import {Switch, Route} from "react-router-dom";

//load navbar
import Navbar from "./component/Navbar";
import Modal from "./component/Modal";
import Toast from "./component/Toast";
//load halaman
import Products from "./page/Products";
import Product from "./client/Product";
import Cart from "./client/Cart";
import Profil from "./client/Profil";
import User from "./page/User";
import Register from "./page/Register";
import Login from "./page/Login";
import Orders from "./page/Orders";
import Checkout from "./client/Checkout";
import Confirm from "./client/Confirm";



class Main extends Component {
    render = () => {
        return(
           <Switch>
               {/* load component tiap halaman */}

               <Route path="/products">
                 <Navbar />
                 <Products />
                 </Route>

                 <Route path="/product">
                 <Navbar />
                 <Product />
                 </Route>

                 <Route path="/user">
                 <Navbar />
                 <User />
                 </Route>

                 <Route path="/profil">
                  <Navbar />
                  <Profil />
                  </Route>

                 <Route path="/cart">
                 <Navbar />
                 <Cart />
                 </Route>

                 <Route path="/register">
                 <Register />
                 </Route>

                 <Route path="/login">
                 <Login />
                 </Route>

                 <Route path="/orders">
                 <Navbar />
                 <Orders />
                 </Route>

                 <Route path="/checkout">
                 <Navbar />
                 <Checkout />
                 </Route>

                 <Route path="/confirm">
                 <Confirm />
                 </Route>

               </Switch>
        );
    }
}
export default Main;
