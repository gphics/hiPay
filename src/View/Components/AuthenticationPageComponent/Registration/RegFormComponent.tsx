import viewUtils from "../../../Utils"
import { MdEmail } from "react-icons/md"
import { IoMdContact} from 'react-icons/io'
import { ImLocation2 } from "react-icons/im"
import {BsPersonHeart,BsPersonHearts} from "react-icons/bs"
import { Link } from "react-router-dom"
import { RegisterUser, userSliceActions } from "../../../../Model/userSlice"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import Controllers from "../../../../Controller"
import supabase from "../../../../Model/supabase"
function RegFormComponent() {
    const { InputComponent, PasswordComponent } = viewUtils
    const {showNotification} = Controllers
    // @ts-ignore
    const { register } = useSelector(state => state.userSlice)
    const dispatch = useDispatch()
    const {updateAuthInfo, setAuthUserDefault, toggleIsLoading} = userSliceActions
    interface requiredObj{
        name: string,
        type: string,
        label: string,
        value: string,
        Icon:any,
    }
    const requiredInputsArr:requiredObj[] = [
        { name: "email", type: "email", label: "email", value: register.email, Icon: MdEmail },
        {name:"firstname", type:"text", label:"firstname", value:register.firstname, Icon:BsPersonHeart},
        {name:"lastname", type:"text", label:"lastname", value:register.lastname, Icon:BsPersonHearts},
        { name: "contact", type: "number", label: "contact", value:register.contact, Icon: IoMdContact },
       
    ]
    // user input change handler
 function onChangeHandler(e:any) {
     const { name, value } = e.target
     if (name === 'contact') {
         if (value.length > 11) {
             showNotification("contact must be 11 characters long")
             return;
         }
     }
     const type:string = "register"
     dispatch(updateAuthInfo({name, value, type}))
    }

    // set form default
    
useEffect(() => {
        // @ts-ignore
    dispatch(setAuthUserDefault())

    },[])
    
   
    async function checkExistence(item:string | number, key:string) {
        const {data, error} = await supabase.from("user")
            .select()
            .eq(key, item)
        if (data?.length === 0) return false
     
        return true
    }
  async  function submitHandler(e: any) {
        e.preventDefault()
        const { email, firstname, lastname, contact, password } = register
        // making sure no field is empty
        if (!email || !firstname || !lastname || !contact) {
            showNotification("Input field cant be empty")
            return;
        }
        // making sure password length is greater than or equals 8
        if (password.length < 8) {
            showNotification("password length is less than eight ")
            return;
      }
    //   checking if user already exist
      dispatch(toggleIsLoading())
        const accountNumber = +contact
        const check = await Promise.allSettled([
            checkExistence(email, "email") , checkExistence(accountNumber, "accountNumber") 
        ]) 


    //   @ts-ignore
      const final = await check.some(elem => elem.value === true)
    //   showing notification
    //   console.log(final)
      if (final) {
           dispatch(toggleIsLoading())
          showNotification("Email or contact already exist")
          return;
      } else {
     //   when user does not exist
    //   @ts-ignore
          dispatch(RegisterUser())
           dispatch(setAuthUserDefault())
      }

        
   }
  return (
      <form action="" onSubmit={submitHandler} className="reg_form_component">
          <header className="reg_form_header
          ">
              <h4>sign up for an account</h4>
          </header>
          <div className="reg_forms">
              {requiredInputsArr.map((elem, i) => <InputComponent {...elem} action={onChangeHandler} key={i * 53535} />)}
              <PasswordComponent value={register.password} name="password" label="password" action={onChangeHandler} />
          </div>
          <footer className="reg_form_footer">
              <button type="submit" onClick={submitHandler}>sign up</button>
              <small>Already have an account ? <Link to="/home/login">Sign in</Link></small>
          </footer>
    </form>
  )
}

export default RegFormComponent