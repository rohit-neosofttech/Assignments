import React from 'react';
import './App.css';
import { Provider } from 'react-redux'
import store from './components/redux/store'
// import { createStore } from 'redux';
import {Switch,Route} from 'react-router-dom'

import { ProtectedRoute } from './components/helper/protected.route'

// import Header from './components/header/Header'
import Footer from './components/footer/Footer'
import Home from './components/home/Home'
import ProductsPage from './components/product/ProductsPage'
import ProductDetail from './components/product/ProductDetail'
import Cart from './components/cart/MainCart'
import Order from './components/user/Order'
import Address from './components/user/Address'
import AddAddress from './components/user/AddAddress'
import EditAddress from './components/user/EditAddress'
import ChangePass from './components/user/ChangePass'
import Profile from './components/user/Profile'
import EditProfile from './components/user/EditProfile'
import MainCart from './components/cart/MainCart';
import OrderPlaced from './components/cart/OrderPlaced';
import Subscribe from './components/footer/Subscribe';
import Login from './components/userModules/Login'
import Logout from './components/userModules/Logout'
import Register from './components/userModules/Register'
import ForgotPass from './components/userModules/ForgotPass'
import RecoverPass from './components/userModules/RecoverPass'
import Contact from './components/userModules/Contact'
import Location from './components/footer/Location'

import Default from './components/modules/Default'

function App() {
  return (
    <Provider store={store}>
      { console.log(store.getState()) }
    <div className="App">
      {/* <Header/> */}
      <Switch>
        <Route path='/' component={Home} exact/>
        <Route path='/productsPage' component={ProductsPage}/>
        {/* <Route path='/productsPage/:category_id' component={ProductsPage}/> */}
        <Route path='/cart' component={Cart}/>
        <ProtectedRoute path='/order' component={Order}/>
        <ProtectedRoute path='/address' component={Address}/>
        <ProtectedRoute path='/addAddress' component={AddAddress}/>
        <ProtectedRoute path='/editAddress/:address_id' component={EditAddress}/>
        <ProtectedRoute path='/changePass' component={ChangePass}/>
        <ProtectedRoute path='/profile' component={Profile}/>
        <ProtectedRoute path='/editProfile' component={EditProfile}/>
        <ProtectedRoute path='/orderPlaced' component={OrderPlaced}/>
        <Route path='/maincart' component={MainCart}/>
        <Route path='/login' component={Login}/>
        <Route path='/logout' component={Logout}/>
        <Route path='/register' component={Register}/>
        <Route path='/forgotPass' component={ForgotPass}/>
        <Route path='/recoverPass' component={RecoverPass}/>
        <Route path='/contact' component={Contact}/>
        <Route path='/location' component={Location}/>
        <Route path='/subscribe' component={Subscribe}/>
        <Route path='/productDetail/:product_id' component={ProductDetail}/>
        <Route component={Default}/>
      </Switch>
      <Footer/>
    </div>
    </Provider>
  );
}

export default App;
