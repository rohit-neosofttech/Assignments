import React, { PureComponent } from 'react'
import { withRouter } from 'react-router-dom';

const emailRegex = RegExp(
    // /^[a-zA-Z]+([A-Za-z0-9._-])+@([A-Za-z0-9._-])+.([A-Za-z]{2,4})$/
    // /^[a-zA-Z]+([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/
    /^[A-Za-z]{2,}[A-Za-z0-9]{0,}[.]{0,1}[A-Za-z0-9]{1,}[.]{0,1}[A-Za-z0-9]{1,}@[A-Za-z]{2,}[.]{1}[A-za-z]{2,3}[.]{0,1}[a-z]{0,2}$/
  );

class Newsletter extends PureComponent {
    constructor(props) {
        super(props);
        this.state={
            name:'',
            nameError:'',
            valid:false
        }
    }

    onChangeHandler = (e) => {
        if(emailRegex.test(e.target.value)) {
            this.setState({ valid:true, name: e.target.value, nameError: '' })
        }
        else{
            this.setState({ valid:false, name: e.target.value, nameError: 'invalid email address' })
        }
    }

    onSubscribe = (e) => {
        e.preventDefault();
        const { history } = this.props;
        history.push(`/subscribe`,this.state.name);
    }
    
    render() {
        return (
            <>
                <h5 style={{padding: '15px'}}>Newsletter & Subscribe</h5>
                <p>Signup to get exclusive offer from our favorite brands and to be well up in the news</p>
                <form>
                    <input type="text" placeholder="Your Email..." value={this.state.name} onChange={this.onChangeHandler}/><br/>
                    <button className="btn-subscribe" onClick={this.onSubscribe} disabled={!this.state.valid}>Subscribe</button>
                </form>
            </>
        )
    }
}

export default withRouter(Newsletter)
