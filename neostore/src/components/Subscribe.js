import React from 'react'

function Subscribe(props) {
    return (
        <div className="center p-5 hand-bkgd" style={{height:"500px"}}>
            <h1>Thank you <br/>{props.location.state}<br/>for Subscribing</h1>
        </div>
    )
}

export default Subscribe
