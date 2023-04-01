import {BrowserRouter, Routes, Route } from 'react-router-dom'
import "../src/assets/Styles/Main.scss"
import AllLandingPage from './View/Pages/AllLandingPage'
import ErrorPage from './View/Pages/ErrorPage/ErrorPage'
import viewUtils from './View/Utils'
import allComponents from './View/Components'
import DashboardPage from './View/Pages/DashboardPage/DashboardPage'
import VirtualCardPage from './View/Pages/VirtualCardPage'
import ProfilePage from './View/Pages/ProfilePage'
import SettingsPage from './View/Pages/SettingsPage'
import UserUpdatePage from './View/Pages/UserUpdatePage'
import TransferPage from './View/Pages/TransferPage'
import TransactionPage from './View/Pages/TransactionPage'
function App() {
 
  const { LandingPage, LoginPage, RegisterPage } = AllLandingPage
  const { SharedLayout, ProtectedLayout } = viewUtils
  const {SlideDownNav, MainNav} = allComponents
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {/* All Landing Pages */}
          <Route path="/home" element={<SharedLayout Nav={SlideDownNav} />} >
            <Route index element={<LandingPage />} />
              <Route path='login' element={<LoginPage/>} />
          <Route path='register' element={<RegisterPage />} />
            </Route>
          {/* Ending of landing paged route */}
          {/* Error Page */}
          <Route path="*" element={<ErrorPage />} />
      {/* Ending of error page route */}
          {/* main route */}
          <Route path="/" element={<ProtectedLayout Nav={MainNav} holderClass="dashboard_holder_class" />} >
            <Route index element={<DashboardPage />} />
            <Route path="card" element={<VirtualCardPage />} />
            <Route path="profile" element={<ProfilePage />} />
            <Route path="settings" element={<SettingsPage />} />
            <Route path="update" element={<UserUpdatePage />} />
            <Route path="transfer" element={<TransferPage />} />
            <Route path="transactions" element={<TransactionPage/>} />
          </Route>
          {/* Ending of main route */}
      </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
