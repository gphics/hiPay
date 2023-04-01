import React, {useEffect} from 'react'
import viewUtils from '../../../Utils'
import { useSelector, useDispatch } from 'react-redux'
import { userSliceActions } from '../../../../Model/userSlice'
import { MdEmail } from "react-icons/md"
import { Link } from 'react-router-dom'
import Controllers from '../../../../Controller'
import supabase from '../../../../Model/supabase'
function LoginForm() {
    const { PasswordComponent, InputComponent } = viewUtils
    const {showNotification} = Controllers
    // @ts-ignore 
    const {login} = useSelector(state => state.userSlice)
    const dispatch = useDispatch()
    const {updateAuthInfo,setAuthUserDefault, toggleIsLoading, loginUser} = userSliceActions
    function onChangeHandler(e:any) {
        const { name, value } = e.target
        const type:string = "login"
        dispatch(updateAuthInfo({name, value, type}))
    }

        // set form default
    useEffect(() => {
        // @ts-ignore
        dispatch(setAuthUserDefault())
    }, [])
    // login function
    async function Auth() {
        const { email, password } = login
        const { data, error } = await supabase.from("user")
        .select()
        .eq("email", email)
            .single()
        if (data) {
        dispatch(toggleIsLoading())
            if (data.password === password) {
        dispatch(loginUser(data))
        // @ts-ignore
        dispatch(setAuthUserDefault())
            return 
        } else {
            showNotification("Incorrect password ...")
            return;
        }
    }
    
    }
   function handleSubmit(e:any) {
    e.preventDefault()
       const { email, password } = login
    //    checking id email and password isnt empty
       if (!email || !password) {
        showNotification("Input field can't be empty")
           return;
       }

    //   authenticating
       // @ts-ignore
       dispatch(toggleIsLoading())
        Auth()
       
   }
  return (
      <form className='login_form' onSubmit={handleSubmit}>
          <header className='login_form_header'>
              <h3>welcome back</h3>
          </header>

          <section className="main_login_form">
              <InputComponent customClass="login_input" type="email" value={login.email} Icon={MdEmail} action={onChangeHandler} label="email" name="email"  />
        <PasswordComponent customClass="login_input" action={onChangeHandler} name="password" label="password" value={login.password} />
          </section>
          <footer className="login_form_footer">
              <button type='submit' onClick={handleSubmit}>login</button>
              <small>Not yet a member ? <Link to="/home/register">Register</Link> </small>
          </footer>
          
    </form>
  )
}

export default LoginForm