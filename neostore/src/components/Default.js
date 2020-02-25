import React, { Component } from 'react'
import Header from './header/Header'

export class Default extends Component {
    render() {
        return (
            <>
            <Header/>
            <div className="div-default">
                <div className="container center">
                    <br/><br/><br/>
                    <img src='logo192.png' alt=""/><br/>
                    <h1>Error 404 : Page Not Found</h1>
                </div>
            </div>
            </>
        )
    }
}

export default Default
