import React from 'react'
import { useSelector } from 'react-redux'

function UserImageComponent() {
  const date = new Date().getMilliseconds()
  
    // @ts-ignore
  const { user: { firstname, userImgName } } = useSelector(state => state.userSlice)
     const imgUrl = `https://mpeotfxpmxwbrovptxkx.supabase.co/storage/v1/object/public/user/${userImgName}?${date}`
  return (
      <div className='profile_image_component'>
      {userImgName ? <img src={imgUrl}  alt="user image" /> : <h1> {firstname.slice(0,1)} </h1>}
    </div>
  )
}

export default UserImageComponent