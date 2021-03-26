import React from "react";
import classes from "./Modal.module.css";


const Modal = props => {
    return (
        <React.Fragment>
            <div onClick={props.close} className={classes.Backdrop}></div>
            <div className={classes.Modal}>
                    {props.children}
            </div>
        </React.Fragment>
    )
}

export default Modal;