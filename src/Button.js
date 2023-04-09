import React from "react"


export default function Button(props){
    

    return(
            <div className="button">
                <button className="button_btn" onClick={props.handleOnClick}>{props.tenzies}</button>
            </div>
    )
}