import React, {useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { MdEmail } from "react-icons/md"
import { BsFillHouseLockFill} from 'react-icons/bs'
import { ImLocation2 } from "react-icons/im"
import {BsPersonHeart,BsPersonHearts} from "react-icons/bs"
import viewUtils from '../../Utils'
import { UserUpdateRemote, userSliceActions } from '../../../Model/userSlice'
import {BiUserPin} from 'react-icons/bi'
function UserUpdatePage() {
    // @ts-ignore
    const { user } = useSelector(state => state.userSlice)
    const dispatch = useDispatch()
    const { InputComponent, PasswordComponent } = viewUtils
    const {updateUser} = userSliceActions
    type inputObj = { name: string, label: string, Icon: any, type: any, value: string | number}
    const first: inputObj[] = [
        { name: "firstname", value: user.firstname, label: "firstname", type: "text", Icon: BsPersonHeart },
        { name: "lastname", value: user.lastname, label: "lastname", type: "text", Icon: BsPersonHearts },
        { name: "email", value: user.email, label: "email", type: "email", Icon: MdEmail },
        
    ]

    const second: inputObj[] = [
        { name: "location", value: user.location, label: "location", type: "text", Icon: ImLocation2 },
        { name: "transactionPin", value: user.transactionPin, label: "transaction pin", type: "number", Icon: BiUserPin },
           
    ]

    function handleSubmit(e:any) {
        e.preventDefault()
        // @ts-ignore
        dispatch(UserUpdateRemote())
    }

    function onChangeHandler(e:any) {
        const { name, value } = e.target
        dispatch(updateUser({name, value}))
    }
    const [section, setSection] = useState(1)
  return (
      <div className='update_profile_page'>
          <h2>update profile</h2>
          <form className="update_profile_form" onSubmit={handleSubmit}>
              {/* part one */}
              {section === 1 &&
                  <section className="update_one">
                      {first.map((item, i) => {
                          return <InputComponent action={onChangeHandler} customClass="update_input" {...item} key={i * 887} />
                      })}
                  </section>
              }
              {/* part two */}
              {section === 2 &&
                  <section className="update_two">
                      {second.map((item, i) => {
                          return <InputComponent action={onChangeHandler}customClass="update_input" {...item} key={i * 97} />
                      })}
                      <PasswordComponent name="password" action={onChangeHandler}customClass="update_input"label="password" value={user.password} />
                  </section>
              }
              {/* btn holder */}
              <div className="btn_holder">
                  {section === 2 &&
                      <button className="update_btn" type="button" onClick={(e) => {
                          e.preventDefault()
                          setSection(1)
                      }}>back</button>
                  }
                  {section === 1 &&
                      <button className="update_btn" type="button"
                          onClick={(e) => {
                              e.preventDefault()
                              setSection(2)
                          }}>next</button>
                  }
                  {section === 2 &&
                      <button className="update_btn" onClick={handleSubmit} type="submit">update</button>
                  }
              </div>
          </form>
    </div>
  )
}

export default UserUpdatePage