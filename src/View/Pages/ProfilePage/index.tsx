import React from 'react'
import { useSelector } from 'react-redux'
import allComponents from '../../Components'
function ProfilePage() {
    // Getting user info
    // @ts-ignore
    const { user: { firstname, lastname, contact, email,  password, transactionPin, userImgName, accountBalance, accountNumber,location } } = useSelector(state => state.userSlice)
    const { UserImageComponent } = allComponents;
    const profileObj: { name: string, content: string }[] = [{ name: "firstname", content: firstname },
        { name: "lastname", content: lastname },
        { name: "contact", content: contact },
        { name: "email", content: email },
        { name: "account number", content: accountNumber },
        { name: "password", content: password },
        { name: "location", content: location },
        { name: "transaction pin", content: transactionPin }
    ]
 
  return (
      <div className='profile_page'>
          <header className='profile_page_header'>
              <h2>my profile</h2>
              <div className='img_holder'> <UserImageComponent/> </div>
          </header>

          <section className="profile_info">
              {profileObj.map((item, i) => {
               return <article className="each_profile_info" key={i*4545}>
                  <h6> {item.name}: </h6>
                  <h5 style={{textTransform: item.name === "email" ? "none":"capitalize"}} > {item.content || "not available" } </h5>
              </article>   
              })}
              
          </section>
    </div>
  )
}

export default ProfilePage
