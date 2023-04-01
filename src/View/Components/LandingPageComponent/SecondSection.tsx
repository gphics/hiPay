import React from 'react'
// @ts-ignore
function SecondSection({secondImage}) {
  return (
    <section className="second_part_landing_page">
        <article>
          <h3>go cashless and cardless with us.</h3>
          <p>with hipay, it's possible and easy to spend across the world with just your virtual account. </p>
        </article>
        <img src={secondImage} alt="landing page image" />
      </section>
  )
}

export default SecondSection