import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import List from '@material-ui/core/List';
import axios from 'axios'
import sweetalert from 'sweetalert'
import * as api from '../../api'

class Search extends Component {
  constructor(props) {
    super(props);
    this.state={
      text:'',
      productName:[],
      products:[],
      opened: false,
    }
  }

  onFocusHandler = () => {
    axios.get(`${api.baseurl}/getAllProducts`)
        .then((res)=>{
            this.setState({products:res.data.product_details})
        })
        .catch((err) => {
            if (err.response) {
                err.response.data.message 
                ? sweetalert("Oops!", `${err.response.data.message}`, "error",{button:false})
                : sweetalert("Oops!", 'Something Went Wrong getting Products Data', "error",{button:false})
            } else if (err.request) {
                  sweetalert("Oops!", `${err.request}`, "error",{button:false})
            } else {
                  sweetalert("Oops!", `${err.message}`, "error",{button:false})
            }
        })
  }

  onChangeHandler = (e) => {
    e.preventDefault()
    if(e.target.value.length!==0) {
      this.setState({ text:e.target.value.toLowerCase(), opened: true})
    }
    else {
      this.setState({ text:e.target.value.toLowerCase(), opened: false})
    }
  }

  handleSubmit = () => {
    this.setState({ text:'', opened: false})
  }

  crossClicked = () => {
    this.setState({ text:'', opened: false})
  }

  render() {
  // let prodList = this.props.products.map(product=> <Link to={`/productDetail/${product.product_id}`} key={product.product_id}><ListItem button>{product.product_name}</ListItem></Link>)
  const prodList = this.state.products
        .filter(product => this.state.text === '' || product.product_name.toLowerCase().includes(this.state.text))
        .map(product => <Link key={product._id} onClick={this.handleSubmit} to={`/productDetail/${product.product_id}`}><List>{product.product_name}</List></Link>);

    return (
      <form >
        <div className="input-group" style={{border: '1px solid #ced4da',borderRadius:"5px"}}>
          <div className="input-group-prepend">
            <span className="input-group-text"><i id="icon-black" className="fas fa-search"></i></span>
          </div>
          <input type="text" className="form-control" style={{border:'none'}} placeholder="Search..."
            value={this.state.text} onFocus={this.onFocusHandler} onChange={this.onChangeHandler} /><br/>
            {this.state.opened && 
          <div className="input-group-append" onClick={this.crossClicked}>
            <span className="input-group-text"><i id="icon-black" className="fas fa-times-circle"></i></span>
          </div>}
          {this.state.opened && (					
            <div className="floating-list">
              <List>
                {prodList.length>0?prodList:<span style={{margin:'auto',fontWeight:'bold'}}>"No Product Found"</span>}
              </List>
            </div>
				  )}
        </div>
      </form>
    )
  }
}

export default Search
