import React from 'react';
import './App.css';
import {Switch,Route} from 'react-router-dom'

import Header from './components/header/Header'
import Footer from './components/footer/Footer'
import Home from './components/home/Home'
import ProductsPage from './components/product/ProductsPage'
import ProductDetail from './components/product/ProductDetail'
import Cart from './components/cart/MainCart'
import Order from './components/user/Order'
import Address from './components/user/Address'
import ChangePass from './components/user/ChangePass'
import Profile from './components/user/Profile'
import MainCart from './components/cart/MainCart';
import Subscribe from './components/Subscribe';
import Login from './components/Login'
import Register from './components/Register'
import ForgotPass from './components/ForgotPass'
import Contact from './components/Contact'
import Location from './components/Location'

import Default from './components/Default'

function App() {
  return (
    <div className="App">
      <Header/>
      <Switch>
        <Route path='/' component={Home} exact/>
        <Route path='/productsPage' component={ProductsPage}/>
        {/* <Route path='/productsPage/:category_id' component={ProductsPage}/> */}
        <Route path='/cart' component={Cart}/>
        <Route path='/order' component={Order}/>
        <Route path='/address' component={Address}/>
        <Route path='/changePass' component={ChangePass}/>
        <Route path='/profile' component={Profile}/>
        <Route path='/maincart' component={MainCart}/>
        <Route path='/login' component={Login}/>
        <Route path='/register' component={Register}/>
        <Route path='/forgotPass' component={ForgotPass}/>
        <Route path='/contact' component={Contact}/>
        <Route path='/location' component={Location}/>
        <Route path='/subscribe' component={Subscribe}/>
        <Route path='/productDetail/:product_id' component={ProductDetail}/>
        <Route component={Default}/>
      </Switch>
      <Footer/>
    </div>
  );
}

export default App;
