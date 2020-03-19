import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Header from '../header/Header'

/**
 * Default page that is to be rendered if the url does not match the routes.
 */
class Default extends Component {
    render() {
        return (
            <>
            <Header/>
            <div className="div-default">
                <div className="container center">
                    <br/><br/>
                    <img src='https://www.interserver.net/tips/wp-content/uploads/2016/10/404error.jpeg'  alt="" style={{width:'auto',height:'300px'}} /><br/>
                    <h1>Error 404 : Page Not Found</h1>
                    <br/>
                    <Link to="/"><button className="btn btn-primary">Return To Home Page</button></Link>
                </div>
            </div>
            </>
        )
    }
}

export default Default
