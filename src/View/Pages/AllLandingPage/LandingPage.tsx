import React, { useEffect } from 'react'
import firstImage from "../../../assets/Others/jpeg/firstLandingPageImage.jpg"
import secondImage from "../../../assets/Others/jpeg/secondLandingPageImage.jpg"
import { Link, useNavigate } from 'react-router-dom'
import allComponents from '../../Components'
import { useSelector } from 'react-redux'

function LandingPage() {
const {FirstSection, SecondSection, ThirdSection} = allComponents
//  @ts-ignore
  const { user } = useSelector(state => state.userSlice)
  const Navigate = useNavigate()
  useEffect(() => {
    if (user.firstname) {
         console.log("kig")
      Navigate("/")
      return;
    }
    // console.log(user)
      // console.log("king")
 },[])
  return (
    <div className='main_landing_page'>
      {/* section one */}

      <FirstSection firstImage={firstImage} />

      {/* Section two */}
      <SecondSection secondImage={secondImage} />
      {/* section three */}
     <ThirdSection/>
    </div>
  )
}

export default LandingPage