import React from 'react'
import { Link } from 'react-router-dom'

// @ts-ignore
function FirstSection({firstImage}) {
  return (
 <section className="first_part_landing_page">
        <article>
          <h2>
            <span>
              online financial
            </span>
            <span >
                 platform for
            </span>
            <span>  easy payment.</span>
         
          </h2>
          <p>
            <li>create virtual account.</li>
            <li>payment automation.</li>
            <li>virtual card.</li>
            <li>secure payment gateway.</li>
            <Link to="/home/register" className='acc_create_link'>create account</Link>
          </p>
        </article>
        <img src={firstImage} alt="banking image" />
      </section>
  )
}

export default FirstSection