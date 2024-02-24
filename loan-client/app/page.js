"use client"
import Image from "next/image"
import styles from "./page.module.css"
import { Header } from "./header"
import {Form1, Form2, Form3, detailsExtractor, getAndPostData} from "./form"
import { useState } from "react"

export default function Home() {
	const [page, setPage] = useState(1)
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
			<button onClick={() => {setPage(page + 1); getAndPostData()}} style={{display: page === 3 ? "block" : "none"}} className="btn btn-primary">Submit</button>
		</div>}
		{page === 4 && <div className="alert alert-success mt-3">Form submitted successfully</div>}
    </main>
  );
}
