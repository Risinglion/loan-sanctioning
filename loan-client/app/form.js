import React from "react"
import 'bootstrap/dist/css/bootstrap.min.css'
import axios from "axios"

export function Form1(){
    // name and email
    return (
        <form>
            <div className="mb-3">
                <label htmlFor="name" className="form-label">Name</label>
                <input type="text" className="form-control" id="name" />
            </div>
            <div className="mb-3">
                <label htmlFor="email" className="form-label">Email</label>
                <input type="email" className="form-control" id="email" />
            </div>
        </form>
    )
}

export function Form2(){
    // address and phone
    return (
        <form>
            <div className="mb-3">
                <label htmlFor="address" className="form-label">Address</label>
                <input type="text" className="form-control" id="address" />
            </div>
            <div className="mb-3">
                <label htmlFor="phone" className="form-label">Phone</label>
                <input type="tel" className="form-control" id="phone" />
            </div>
        </form>
    )
}

export function Form3(){
    // income and loan amount
    return (
        <form>
            <div className="mb-3">
                <label htmlFor="income" className="form-label">Income</label>
                <input type="number" className="form-control" id="income" />
            </div>
            <div className="mb-3">
                <label htmlFor="loan" className="form-label">Loan Amount</label>
                <input type="number" className="form-control" id="loan" />
            </div>
        </form>
    )
}

let formData = {
    name: "",
    email: "",
    address: "",
    phone: "",
    income: "",
    loan: ""
}

export function detailsExtractor(){
    // get the form fields first
    let currentFormFields = []
    let formFields = document.querySelectorAll("form")
    formFields.forEach((form) => {
        currentFormFields.push(form)
    })
    // get the form fields values
    let formValues = []
    currentFormFields.forEach((form) => {
        let formValue = {}
        form.querySelectorAll("input").forEach((input) => {
            formValue[input.id] = input.value
        })
        formValues.push(formValue)
    })
    // set the form values to the form data
    for (let i = 0; i < formValues.length; i++){
        console.log(formValues[i])
        formData = {...formData, ...formValues[i]}
    }
    setLocalStorage()
}

export const setLocalStorage = () => {
    localStorage.setItem("formData", JSON.stringify(formData))
}

export const getAndPostData = () => {   
    let data = JSON.parse(localStorage.getItem("formData"))
    axios.post("http://localhost:5050/api", data)
    .then((response) => {
        console.log(response)
    })
}