import {useEffect} from 'react'
import allComponents from '../../Components'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
function RegisterPage() {
  const { RegHeroComponent, RegFormComponent } = allComponents
   // @ts-ignore
   const { user } = useSelector(state => state.userSlice)
  const Navigate = useNavigate()
  useEffect(() => {
    if (user.firstname) {
     Navigate("/")
   }
 },[user])
  return (
    <div className='register_page'>
      {/* Hero section */}
      <RegHeroComponent />
      {/* Form Section */}
      <RegFormComponent/>
    </div>
  )
}

export default RegisterPage