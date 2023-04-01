import { useEffect } from "react"
import { useSelector } from "react-redux"
import { Outlet, useNavigate, Navigate } from "react-router-dom"
import viewUtils from "."
// @ts-ignore
function ProtectedLayout({Nav, holderClass}) {
    // @ts-ignore
    const {isAuthenticated, isLoading} = useSelector(state => state.userSlice)
   
   if(!isAuthenticated) return <Navigate to="/home"/>
    const {LoadingComponent, NotificationComponent} = viewUtils
  
  return <div className={holderClass}>
    {Nav &&<Nav />}
    {isLoading && <LoadingComponent />}
    <NotificationComponent/>
  <Outlet/>
  </div>
}

export default ProtectedLayout