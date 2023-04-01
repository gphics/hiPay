import React from 'react'
import { useSelector } from 'react-redux'
import Icon from "../../../assets/Others/SVG/Icon.svg"
import {BsFillCalendarCheckFill} from "react-icons/bs"
import Controllers from '../../../Controller'
function VirtualCardPage() {
  // @ts-ignore
  const { user } = useSelector(state => state.userSlice)
const {AccountNumberFormatter} = Controllers
  const date = new Date()
  const expiryDate = `${(date.getFullYear()+2).toString().slice(2)}/${date.getMonth().toString().padStart(2,"0")}`


  return (
    <div className='virtual_card_page'>
      <main>
        <div className="icon_holder">
<img src={Icon} alt="hiPay icon" />
        </div>
        <div className="main_info">
          {/* Account Number */}
 {/* @ts-ignore */}
          <h6> {AccountNumberFormatter(user.accountNumber).map((item, i) =>{
return <span key={i}>
            {item} {" "}
          </span>
          })} </h6>
          <h6> {expiryDate} </h6>
          <h6> {user.firstname} {user.lastname} </h6>
        </div>

      </main>
    </div>
  )
}

export default VirtualCardPage