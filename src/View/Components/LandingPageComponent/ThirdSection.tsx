import React from 'react'
import { Link } from 'react-router-dom'
function ThirdSection() {
  return (
    <section className="third_part_landing_page">
        <h1>we are there for you always</h1>
        <Link to="/home/register" className='acc_create_link'>get started</Link>
      </section>
  )
}

export default ThirdSection