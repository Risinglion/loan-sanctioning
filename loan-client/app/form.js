import React from "react"
import 'bootstrap/dist/css/bootstrap.min.css'
import axios from "axios"

export function Form1(){
    return (
        <form>
            <div className="mb-3">
                <label htmlFor="name" className="form-label">Full Name</label>
                <input type="text" className="form-control" id="name" required />
                <span id="nameHelp" className="form-text form-help">Enter your full name</span>
            </div>
            <div className="mb-3">
                <label htmlFor="email" className="form-label">Email</label>
                <input type="email" className="form-control" id="email" required/>
                <span id="emailHelp" className="form-text form-help">Enter your email address</span>
            </div>
            <div className="mb-3">
                <label htmlFor="phone" className="form-label">Phone</label>
                <input type="tel" className="form-control" id="phone" required/>
                <span id="phoneHelp" className="form-text form-help">Enter your phone number</span>
            </div>
            <div className="mb-3">
                <label htmlFor="address" className="form-label">Address</label>
                <input type="text" className="form-control" id="address" required/>
                <span id="addressHelp" className="form-text form-help">Enter your full address</span>
            </div>
        </form>
    )
}

export function Form2(){
    return (
        <form>
            <div className="mb-3">
                <label htmlFor="number-of-dependents" className="form-label">Number of Dependents</label>
                <input type="number" className="form-control" id="number-of-dependents" required/>
                <span id="number-of-dependentsHelp" className="form-text form-help">Enter the number of dependents</span>
            </div>
            <div className="mb-3">
                <label htmlFor="education" className="form-label">Education</label>
                <select className="form-select" id="education" required>
                    <option value="1">Graduate</option>
                    <option value="0">Not Graduate</option>
                </select>
                <span id="educationHelp" className="form-text form-help">Select your education level</span>
            </div>
            <div className="mb-3">
                <label htmlFor="self-employed" className="form-label">Self Employed</label>
                <select className="form-select" id="self-employed" required>
                    <option value="1">Yes</option>
                    <option value="0">No</option>
                </select>
                <span id="self-employedHelp" className="form-text form-help">Select if you are self employed</span>
            </div>
            <div className="mb-3">
                <label htmlFor="income" className="form-label">Income</label>
                <input type="number" className="form-control" id="income" required/>
                <span id="incomeHelp" className="form-text form-help">Enter your income</span>
            </div>
        </form>
    )
}

export function Form3(){
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
    axios.post("http://localhost:5050/api/model-run", data)
    .then((response) => {
        console.log(response)
    })
}