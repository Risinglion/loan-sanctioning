"use client"
import React from "react"
import { useState, useEffect } from "react"

export function ConfirmationComponent({stater, resetPage}){
    let [page, setPage] = useState(false)
    useEffect(() => {
        if(stater==1) setPage(true)
    }, [stater]);
    return (
        <div>
            <div className="alert alert-warning" role="alert" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: 'auto' }}>
                <h1>Would you like to confirm the application?</h1>
                {page && <p>(According to the data provided there is a good chance of approval)</p>}
                {!page && <p>(According to the data provided there is only a low chance of approval)</p>}
                <button className="btn btn-primary">Confirm</button><br />
                <button className="btn btn-danger" onClick={()=>{
                    resetPage()
                    console.log('reset')
                }}>Cancel</button>
            </div>
            
        </div>
    )
}