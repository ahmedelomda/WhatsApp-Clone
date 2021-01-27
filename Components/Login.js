import React from 'react';
import { Button } from "@material-ui/core";
import "../Styles/Login.css";
import { auth, provider } from '../Server/firebase';
import { actionTypes } from './Reducer';
import { useStateValue }  from "./StateProvider";

function Login() {

    const [{}, dispatch] = useStateValue();

    const signIn = () => {
        auth.signInWithPopup(provider)
        .then(result => {
            dispatch({
                type: actionTypes.SET_USER,
                user: result.user
            });
        })
        .catch(error => alert(error.messagw));
    };

    return (
        <div className="login">
            <div className="login-container">
                <img 
                    src="https://assets.stickpng.com/images/580b57fcd9996e24bc43c543.png"
                    alt=""
                />
                <div className="login-text">
                    <h1>Sign in to WhatsApp</h1>
                </div>
                <Button onClick={signIn}>
                    Sign In With Google
                </Button>
            </div>
        </div>
    );
}

export default Login;
