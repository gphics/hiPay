import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import supabase from "../../../Model/supabase";
import { userSliceActions } from "../../../Model/userSlice";
import { FetchTransaction } from "../../../Model/userSlice";
function TransactionPage() {
  // @ts-ignore
  const { transactionList } = useSelector((state:any) => state.userSlice);
  const dispatch = useDispatch();
    useEffect(() => {
        // @ts-ignore
        dispatch(FetchTransaction())
      
  },[])

 
    return <div className="transaction_page">
        <section className="transaction_holder">
            <h2 className="heading">Your Transaction</h2>
            {/* @ts-ignore */}
            {transactionList && transactionList.map((item, i) => {
                 return <EachTransaction {...item} key={i *77} />
            })}            
      </section>
  </div>;
}

export default TransactionPage;

// @ts-ignore
function EachTransaction({ sender, receiver, remarks, amount, created_at }) {
    const [info, setInfo] = useState([])
    // @ts-ignore
    const {user:{accountNumber}} = useSelector(state => state.userSlice)
    async function fetchAll() {
        const All = await Promise.allSettled([
          await supabase
            .from("user")
            .select()
            .eq("accountNumber", sender)
            .single(),
          await supabase
            .from("user")
            .select()
            .eq("accountNumber", receiver)
            .single(),
        ]);  
        // @ts-ignore
        const main = All.map(item => item.value.data).map(elem => ({ fullname: elem.firstname + " " + elem.lastname }))
        // @ts-ignore
        setInfo(main)
      
    }
    useEffect(() => {
        fetchAll()
    },[])
    return (
      <article className="each_transaction">
        <div className="sender">
          <h4>sender {accountNumber === sender && "(me)"} </h4>
          {/* @ts-ignore */}
          <h5> fullname: {info.length > 0 && info[0].fullname} </h5>
          <h5>account Number: {sender} </h5>
        </div>
        <div className="receiver">
          <h4>receiver {accountNumber === receiver && "(me)"} </h4>
          {/* @ts-ignore */}
          <h5>fullname: {info.length > 0 && info[1].fullname} </h5>
          <h5>account Number: {receiver} </h5>
          <h6>Date: {new Date(created_at).toDateString()} </h6>
        </div>
        <div className="last">
          <h4>Info</h4>
          <p>Remark: {remarks} </p>
          <h3> ${amount} </h3>
        </div>
      </article>
    ); 
    
}