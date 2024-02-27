import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'

export function Header(){
    return (<div className="container">
    <header className="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom">
        <div className="col-md-3 mb-2 mb-md-0">
        <a
            href="/"
            className="d-inline-flex link-body-emphasis text-decoration-none"
        >
            <img src='https://media.discordapp.net/attachments/1088524641179533404/1212033718470975528/536bread_100562.png?ex=65f05d5c&is=65dde85c&hm=44c351faca2e0858110c1b9f0487bc7a76fda059ad363ca5649d8fc9d32390ce&=&format=webp&quality=lossless&width=120&height=120' alt="Bread-Loans" width="40" height="40" />
        </a>
        </div>
        <ul className="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
        <li>
            <a href="#" className="nav-link px-2 link-secondary">
            Home
            </a>
        </li>
        <li>
            <a href="#" className="nav-link px-2">
            Features
            </a>
        </li>
        <li>
            <a href="#" className="nav-link px-2">
            Pricing
            </a>
        </li>
        <li>
            <a href="#" className="nav-link px-2">
            FAQs
            </a>
        </li>
        <li>
            <a href="#" className="nav-link px-2">
            About
            </a>
        </li>
        </ul>
    </header>
    </div>)
}
