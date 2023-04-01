import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import viewUtils from ".";
import { Navigate, useNavigate } from "react-router-dom";
// @ts-ignore
function SharedLayout({ Nav, holderClass="" }) {
  // @ts-ignore
  const { isLoading, isAuthenticated } = useSelector(state => state.userSlice)
  const { LoadingComponent, NotificationComponent } = viewUtils
   if(isAuthenticated) return <Navigate to="/" />
  return <div className={holderClass}>
    {Nav &&<Nav />} 
    {isLoading && <LoadingComponent />}
    <NotificationComponent/>
  <Outlet/>
  </div>
}

export default SharedLayout