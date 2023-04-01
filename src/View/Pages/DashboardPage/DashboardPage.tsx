import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { MdVisibilityOff, MdVisibility } from "react-icons/md"
import { BiTransfer } from "react-icons/bi"
import {AiFillCreditCard} from "react-icons/ai"
import viewUtils from '../../Utils'
import Controllers from '../../../Controller'
import showNotification from '../../../Controller/Notification/Notification'
function DashboardPage() {
  const { LinkComponent } = viewUtils
  const {AccountNumberFormatter} = Controllers
     // @ts-ignore
  const { user } = useSelector(state => state.userSlice)
  const [showBalance, setShowBalance] =  useState(false)
  const Navigate = useNavigate()

  // toggling the visibility of the account balance
  function toggleBalance() {
    setShowBalance(prev => !prev)
  }
  // protecting this page
  useEffect(() => {
    if (user?.isAuthenticated === false) {
      Navigate("/login")
      return;
    }
    if (!user?.transactionPin) {
      Navigate("/settings")
      showNotification("Kindly complete your registration by updating your account")
      return
    }
  }, [user])
  
  // link obj
  const linkObj: {name:string, to:string, Icon:any}[] = [
    { name: "transfer", to: "transfer", Icon: BiTransfer },
    {name:"virtual card", to:"card", Icon:AiFillCreditCard}
  ]
  // @ts-ignore
  return (
    <div className='dashboard_page'>
      <header className="dashboard_header">
        <div className="acc_info">
          <h5>Hipay</h5>
          <h4> {user.firstname} {user.lastname} </h4>
          {/* @ts-ignore */}
          <h6> {AccountNumberFormatter(user.accountNumber).map((item, i) =>{
return <span key={i}>
            {item} {" "}
          </span>
          })} </h6>
          <h5> $ {showBalance ? user.accountBalance : "******"} </h5>
              {showBalance ? <MdVisibilityOff className="control_bal_visible" onClick={toggleBalance} /> : <MdVisibility className="control_bal_visible" onClick={toggleBalance} />}
        </div>
        
      </header>

      <div className="dashboard_actions">
        {linkObj.map((item, i)=> <LinkComponent link_class="each_action" iconClass="icon" {...item} key={i *66} />)}
      </div>
    </div>
  )
}

export default DashboardPage