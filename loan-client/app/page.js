"use client"
import styles from "./page.module.css"
import { Header } from "./header"
import {Form1, Form2, Form3, detailsExtractor, getAndPostData} from "./form"
import { useState, useEffect } from "react"
import { ConfirmationComponent } from "./confirmation"
import { MetaMaskLogin } from "./metamask_login"
import './buttons.css'

export default function Home() {
	const [page, setPage] = useState(0)
	const [submitted, setSubmitted] = useState(false)
	const [showMessage, setShowMessage] = useState(false)
	const [loading, setLoading] = useState(false)
	const [stater, setStater] = useState(0)
	const [loggedIn, setLoggedIn] = useState(false)
	const [formData, setFormData] = useState({})
	const [formDisabled, setFormDisabled] = useState(false)

	useEffect(() => {
        if (submitted) {
            setShowMessage(true)
            setTimeout(() => {
                setShowMessage(false)
            }, 3000); // Hide the message after 3 seconds
        }
    }, [submitted])

	function disableForm() {
		setFormDisabled(true)
	}

	// useEffect(() => {
	// 	const metaMaskData = JSON.parse(localStorage.getItem('metaMaskData'));
    //     setFormData(metaMaskData);

    //     if (metaMaskData && metaMaskData.age < 18) {
    //         setFormDisabled(true);
	// 		localStorage.removeItem('metaMaskData');
    //         alert('You must be logged in and at least 18 years old to fill out this form.');
			
    //     }
	// 	else if(metaMaskData && metaMaskData.age >= 18){
	// 		setFormDisabled(false);
	// 	}
	// }, [loggedIn])

	const login = () => {
		if (loggedIn)
			setLoggedIn(false) 
		else 
			setLoggedIn(true)
	}
	const nextPage = () => {
		setPage(page + 1)
	}

	const resetPage = () => {
		setPage(1)
		setSubmitted(false)
		setShowMessage(false)
		setLoading(false)
	}

  	return (
		<main className={styles.main}>
		<Header />
		{page === 0 && <MetaMaskLogin nextPage={nextPage} login={login} disableForm={disableForm}/>}
		{page === 1 && !formDisabled && <Form1 />}
		{page === 2 && !formDisabled && <Form2 />}
		{page === 3 && !formDisabled && <Form3 />}
		{page <=3 && <div className="nav-div">
			<button onClick={() => setPage(page - 1)} disabled={page < 1} style={
				{display: page < 1 ? "none" : "block"}
			} className="btn btn-primary">Previous</button>
			<button onClick={() => {setPage(page + 1); detailsExtractor()}} style={
				{display: page === 3 ? "none" : "block"}
			} className="btn btn-primary" id="next-button">Next</button>
			<button onClick={async () => {
				setPage(page + 1)
				setLoading(true)
				setSubmitted(true)
				let res = await getAndPostData()
				if (res!==false){
					res = res[0]
					setLoading(false)
					setStater(res)
				}
			}} style={{display: page === 3 ? "block" : "none"}} className="btn btn-primary">Submit</button>
		</div>}
		{showMessage && <div className="alert alert-success mt-3">Form submitted successfully</div>}
		{loading && <div className="spinner-border text-primary" role="status"></div>}
		{!loading && submitted && <ConfirmationComponent stater={stater} resetPage={resetPage} />}
	</main>
  );
}
