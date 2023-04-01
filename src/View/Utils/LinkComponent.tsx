import React from 'react'

import { NavLink } from 'react-router-dom'
// @ts-ignore
function LinkComponent({to,action, name, link_class,iconClass, link_active_class, Icon}) {
  return (
    <NavLink className={({isActive})=>{
      return isActive ? `${link_active_class} ${link_class} ` :link_class
    }} to={`/${to}`} end onClick={action}>{Icon && <Icon className={iconClass} />} {name}  </NavLink>
  )
} 

export default LinkComponent