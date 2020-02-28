import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import List from '@material-ui/core/List';

class Search extends Component {
  constructor(props) {
    super(props);
    this.state={
      text:'',
      productName:[],
      opened: false,
    }
  }

  componentDidMount() {
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
  const prodList = this.props.products
        .filter(product => this.state.text === '' || product.product_name.toLowerCase().includes(this.state.text))
        .map(product => <Link onClick={this.handleSubmit} to={`/productDetail/${product.product_id}`} key={product.product_id}><List>{product.product_name}</List></Link>);

    return (
      <form >
        <div className="input-group" style={{border: '1px solid #ced4da',borderRadius:"5px"}}>
          <div className="input-group-prepend">
            <span className="input-group-text"><i id="icon-black" className="fas fa-search"></i></span>
          </div>
          <input type="text" className="form-control" style={{border:'none'}} placeholder="Search..."
            value={this.state.text} onChange={this.onChangeHandler} /><br/>
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
