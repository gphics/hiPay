import React from 'react'
import ErrorImage from "../../../assets/Others/jpeg/23581938_2104.i301.004.S.m004.c13.404 error isometric composition.jpg"
import { Link } from 'react-router-dom'
// @ts-ignore

function ErrorPage() {
  return (
      <div className='error_page'>
       <img className='error_img' src={ErrorImage} alt="error image" />

          <div className="fallback_link">
              <Link to="/" className='back_home'>Back home</Link>
        </div>
    </div>
  )
}

export default ErrorPage