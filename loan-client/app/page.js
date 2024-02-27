"use client"
import Image from "next/image"
import styles from "./page.module.css"
import { Header } from "./header"
import {Form1, Form2, Form3, detailsExtractor, getAndPostData} from "./form"
import { useState, useEffect } from "react"
import { ConfirmationComponent } from "./confirmation"

export default function Home() {
	const [page, setPage] = useState(1)
	const [submitted, setSubmitted] = useState(false)
	const [showMessage, setShowMessage] = useState(false)
	const [loading, setLoading] = useState(false)
	const [stater, setStater] = useState(0)
	useEffect(() => {
        if (submitted) {
            setShowMessage(true)
            setTimeout(() => {
                setShowMessage(false)
            }, 3000); // Hide the message after 3 seconds
        }
    }, [submitted])

	const resetPage = () => {
		setPage(1)
		setSubmitted(false)
		setShowMessage(false)
		setLoading(false)
	}

  	return (
		<main className={styles.main}>
		<Header />
		{page === 1 && <Form1 />}
		{page === 2 && <Form2 />}
		{page === 3 && <Form3 />}
		{page <=3 && <div className="d-flex justify-content-between">
			<button onClick={() => setPage(page - 1)} disabled={page === 1} className="btn btn-primary">Previous</button>
			<button onClick={() => {setPage(page + 1); detailsExtractor()}} style={
				{display: page === 3 ? "none" : "block"}
			} className="btn btn-primary">Next</button>
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
