import React, { useState } from 'react'
import { IoMdContact,IoIosArrowDroprightCircle, IoIosArrowDropleftCircle } from "react-icons/io"
import viewUtils from '../../Utils'
import { HiHome } from 'react-icons/hi'
import { BiTransferAlt } from "react-icons/bi"
import { AiFillSetting } from "react-icons/ai"
import { BsShieldLock } from "react-icons/bs"
import { userSliceActions } from '../../../Model/userSlice'
import { useDispatch } from 'react-redux'
function MainNav() {
    const [isOpen, setIsOpen] = useState(false)
    const { LinkComponent } = viewUtils
    const { logoutUser } = userSliceActions
    const dispatch = useDispatch()
    function toggleIsOpen() {
      setIsOpen(prev =>!prev)
    }
    function logOut() {
        dispatch(logoutUser())
    }
    // link obj
    const navLinks: { to: string, name: string, Icon: any }[] = [{ to: "", name: "dashboard", Icon: HiHome },
        { to: "transactions", name: "transactions", Icon: BiTransferAlt },
    {to:"profile", name:"profile", Icon:IoMdContact},
    { to: "settings", name: "settings", Icon: AiFillSetting },
    { to: "", name: "logout", Icon: BsShieldLock },
        
]
  return (
      <div className={isOpen ? "main_nav_component" : 'main_nav_component hide_main_nav'} >
          
          {/* part one */}
          <section className="nav_list">
              {navLinks.map((item, i) => <LinkComponent action={item.name === 'logout'? logOut : toggleIsOpen} link_class="each_link" iconClass="link_icon" link_active_class="each_link_active" {...item} key={i *3355355} />)}
          </section>
          {/* part two */}
          <section className="nav_control">
              
              {isOpen ? <IoIosArrowDropleftCircle className='nav_control_btn' onClick={toggleIsOpen} />:  <IoIosArrowDroprightCircle className='nav_control_btn' onClick={toggleIsOpen} />}
          </section>
    </div>
  )
}

export default MainNav