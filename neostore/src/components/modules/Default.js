import React, { Component } from 'react'
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
                    <br/><br/><br/>
                    <img src='https://i.dlpng.com/static/png/6815287_thumb.webp'  alt="" style={{width:'auto',height:'300px'}} /><br/>
                    <h1>Error 404 : Page Not Found</h1>
                </div>
            </div>
            </>
        )
    }
}

export default Default
