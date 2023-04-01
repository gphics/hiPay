import React,{useEffect, useState} from 'react'
import viewUtils from '../../Utils'
import { MdConfirmationNumber } from 'react-icons/md'
import { BsFillPersonFill } from "react-icons/bs"
import { BiUserPin } from 'react-icons/bi'
import {FcMoneyTransfer} from "react-icons/fc"
import Controllers from '../../../Controller'
import { TransactionRemote, userSliceActions } from '../../../Model/userSlice'
import { useDispatch, useSelector } from 'react-redux'
import supabase from '../../../Model/supabase'
import { SlNote } from "react-icons/sl"
import shortUUID from 'short-uuid'
function TransferPage() {
    const { InputComponent } = viewUtils
    const { showNotification } = Controllers
    const { updateTransaction, toggleIsLoading, setTransactionDefault } = userSliceActions
    const [receipient, setReipient] = useState({})
    // @ts-ignore
    const {user, transaction} = useSelector(state => state.userSlice)
    const dispatch = useDispatch()
    // setting the default
    useEffect(() => {
        dispatch(setTransactionDefault())
        setReipient({})
        const name = "id"
        const value: string = shortUUID.generate()
      
        dispatch(updateTransaction({name, value}))
    },[])

    function allOnChangeHandler(e:any) {
        const { name, value } = e.target
        if (name === 'amount') {
            if (+value > user.accountBalance) {
                showNotification("insufficient balance")
                return;
            }
        }
        dispatch(updateTransaction({name, value}))
    }

    function accountOnChangeHandler(e:any) {
        const { name, value } = e.target
        dispatch(updateTransaction({ name, value }))
        if (+value === user.accountNumber) {
            showNotification("you cant be the receipient")
            return;
        }
        if (value.length >= 10) {
            fetchAccount(value)
            dispatch(updateTransaction({ name:"accountName", value: "loading ..." }))
        }
        
    }

    async function fetchAccount(x: any) {
        const { data, error } = await supabase.from("user")
            .select()
            .eq("accountNumber", +x)
            .single()
        const name = 'accountName'

        if (error) {
            dispatch(updateTransaction({ name, value:"" }))
            setReipient({})
            showNotification("account not found")
            return;
        };
        if (data) {
          
            const value = `${data.firstname} ${data.lastname}`
            dispatch(updateTransaction({ name, value }))
            setReipient(data)
        }
    }

    async function submitHandler(e:any) {
        e.preventDefault()

        if (!transaction.accountName) {
            showNotification("receipient account does not exist")
            return
        }
          
        if (transaction.pin !== user.transactionPin) {
            showNotification("incorrect transaction pin")
            return;
        }
        // @ts-ignore
        const recepientAccBalance =+transaction.amount + receipient.accountBalance  
        const you = { ...receipient, accountBalance: recepientAccBalance }
        const myAccountBalance = user.accountBalance - +transaction.amount
        const me = { ...user, accountBalance: myAccountBalance }
        // @ts-ignore
        dispatch(TransactionRemote({you, me}))
    }
    const inputObj = [{
         action:accountOnChangeHandler, name:"accountNumber", type:"number", label:"account number" ,Icon:MdConfirmationNumber ,value:transaction.accountNumber
    },
        { action: allOnChangeHandler, dis: true, name: "accountName", type: "text", label: "account name", Icon: BsFillPersonFill, value: transaction.accountName },
        { action: allOnChangeHandler, name: "amount", type: "number", label: "amount", Icon: FcMoneyTransfer, value: transaction.amount },
          { action: allOnChangeHandler, name: "remarks", type: "text", label: "remark", Icon: SlNote, value: transaction.remarks },
        { action: allOnChangeHandler, name: "pin", type: "number", label: "transaction pin", Icon: BiUserPin, value: transaction.pin },
          
        
    ]
  return (
      <div className='transfer_page'>
          <h2>payment</h2>
          <form className="transfer_form" onSubmit={submitHandler}>
              {inputObj.map((item, i)=> <InputComponent {...item} key={i +36363} />)}
               <button onClick={submitHandler} className="transaction_btn" type='submit'>send</button>
          </form>
    </div>
  )
}

export default TransferPage