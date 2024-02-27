import React from "react"
import 'bootstrap/dist/css/bootstrap.min.css'
import { collectWalletData } from "./metamask-signing"
import './metamask_login.css'
import axios from "axios"

export function MetaMaskLogin({nextPage , login}) {
    return (
        <div className="login-container">
            <h1 className="welcome-message">Welcome to the new & easier way of applying for a loan</h1>
            <button className="login-button" onClick = {
                async () => {
                    const accounts = await collectWalletData()
                    if(accounts){
                        axios.post('http://localhost:5050/api/metamask-login', {accounts})
                        .then((response) => {
                            console.log(response.data)
                            localStorage.setItem("metaMaskData", JSON.stringify(response.data))
                        })
                        .catch((error) => {
                            console.error(error)
                        })
                        nextPage()
                        login()
                        console.log(accounts)
                    } else alert('Please install Metamask to use metamask login feature. If you have Metamask installed, please login and try again.')
                }
            }>Login Metamask</button><br />
            <p className="login-help">Logging in with Metamask will allow us to fill the most of the form for you with the data available to us</p>
            <span className="login-help">Don't have Metamask? <a href="https://metamask.io/download" target="_blank" rel="noreferrer">Download it here</a></span>
            <span className="login-help">Want to fill the form manually? Click <a href="#next-button">Next</a></span>
        </div>
    )
}