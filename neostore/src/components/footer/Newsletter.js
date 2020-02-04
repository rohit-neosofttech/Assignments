import React, { Component } from 'react'

export class Newsletter extends Component {
    constructor(props) {
        super(props);
        this.state={
            name:''
        }
    }

    onChangeHandler = (e) => {
        this.setState({
            name: e.target.value
        })
    }

    onSubscribe = (e) => {
        e.preventDefault();
        alert("Subscribe Clicked"+this.state.name)
        }
    
    render() {
        const name=this.state.name
        return (
            <>
                <h5>Newsletter & Subscribe</h5>
                <p>Signup to get exclusive offer from our favorite brands and to be well up in the news</p>
                <form>
                    <input type="text" placeholder="Your Email..." value={name} onChange={this.onChangeHandler}/><br/>
                    <button type="submit" onClick={this.onSubscribe}>Subscribe</button>
                </form>
            </>
        )
    }
}

export default Newsletter
