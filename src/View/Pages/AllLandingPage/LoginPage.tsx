import React,{useEffect} from 'react'
import allComponents from '../../Components'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
function LoginPage() {
  const { LoginForm, LoginHero } = allComponents

  // @ts-ignore
   const { user } = useSelector(state => state.userSlice)
  const Navigate = useNavigate()
  useEffect(() => {
    if (user?.firstname) {
     Navigate("/")
   }
 },[user])
  return (
    <div className='login_page'>
      {/* Hero */}
      <LoginHero />
      {/* Form */}
      <LoginForm/>
    </div>
  )
}

export default LoginPage