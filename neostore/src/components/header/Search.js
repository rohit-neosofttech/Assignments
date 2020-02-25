import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';

class Search extends Component {
  constructor(props) {
    super(props);
    this.state={
      text:'',
      productName:[],
      visible:false
    }
  }

  componentDidMount() {
  }

  onChangeHandler = (e) => {
    e.preventDefault()
    this.setState({ text:e.target.value })
  }

  render() {
  let prodList = this.props.products.map(product=> <Link to={`productDetail/${product.product_id}`} key={product.product_id}><ListItem button>{product.product_name}</ListItem></Link>)

    console.log(this.props.products)
    return (
      <form>
        <div className="input-group" style={{border: '1px solid #ced4da',borderRadius:"5px"}}>
          <div className="input-group-prepend">
            <span className="input-group-text"><i id="icon-black" className="fas fa-search"></i></span>
          </div>
          <input type="text" className="form-control" value={this.state.text} onChange={this.onChangeHandler} placeholder="Search..."/><br/>
          {/* <List style={{backgroundColor:'white',width:'230px'}}>
            {prodList}
          </List> */}
        </div>
      </form>
      
    )
  }
}

export default Search
