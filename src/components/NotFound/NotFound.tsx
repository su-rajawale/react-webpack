import React from 'react'
import { Link } from 'react-router-dom'
import Button from '@mui/material/Button'
import './NotFound.css'

function NotFound() {
  return (
    <section id='notfound'>
        <article className='notfound'>
            <h1>404</h1>
            <h2>Requested page not found</h2>
            <h3>Please go back</h3>
            <Link to='/'><Button variant="contained" color='primary'>Go Home</Button></Link>
        </article>
    </section>
  )
}

export default NotFound