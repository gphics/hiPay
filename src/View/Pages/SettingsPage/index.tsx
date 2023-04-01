import React, {useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { userSliceActions, UserUpdateRemote } from '../../../Model/userSlice'
import {GrUpdate} from 'react-icons/gr'
import viewUtils from '../../Utils'
import supabase from '../../../Model/supabase'
import Controllers from '../../../Controller'
function SettingsPage() {
    const { LinkComponent } = viewUtils
    const [fileState, setFileState] = useState({name:"", img:"", targetName:""})
    const { updateUser, toggleIsLoading } = userSliceActions
    const {showNotification} = Controllers
    const dispatch = useDispatch()
    // @ts-ignore
    const { user: { isActive, userImgName} } = useSelector(state => state.userSlice)
   
    async function handleSubmit(e:any) {
        e.preventDefault()
        if (fileState.name === '') {
            showNotification("select an image")
            return;
        }
        dispatch(toggleIsLoading())
        const {img, name, targetName} = fileState
        if (!userImgName) {
            
            const {data, error} = await supabase.storage.from("user")
                .upload('folder/' + name, img)
            // @ts-ignore
            if (data) {
            const { path } = data
            dispatch(updateUser({ name: targetName, value: path }))
            // @ts-ignore
            dispatch(UserUpdateRemote())
            setFileState({name:"", img:"", targetName:""})
            return 
            }
          
        } else {
                
            const {data, error} = await supabase.storage.from("user")
                .update(userImgName, img)
            // @ts-ignore
            const { path } = data
           
            // @ts-ignore
            dispatch(UserUpdateRemote())
           setFileState({name:"", img:"", targetName:""})
            return;
        }
    }
    function fileChangeHandler(e:any) {
        const { name:targetName, files } = e.target
        const mainFile = files[0]
        const { name } = mainFile
        
        const reader = new FileReader()
        reader.readAsArrayBuffer(mainFile)
        reader.addEventListener("loadend", (e) => {
            console.log(e.target?.result)
            const obj = {
                img: e.target?.result,
                name,
                targetName
            }
            // @ts-ignore
            setFileState(obj)
        })
        
    }
    function onClickHandler(e:any) {
        const content:string = e.target.textContent
        const value: boolean = content === 'on' ? true : false
        if (value === isActive) return;
        const name = "isActive"
        dispatch(updateUser({ name, value }))
        // @ts-ignore
        dispatch(UserUpdateRemote())
        
    }
  return (
      <div className='settings_page'>
          <h1> settings </h1>
          <section className="activate_account">
              <h3> {isActive ? "deactivate": "activate"} account </h3>
              <div className="actions">
                  <button onClick={onClickHandler} id={isActive? "active_act_btn":""} className='act_btn' type="button">on</button>
                  {/* @ts-ignore */}
                  <button onClick={onClickHandler} id={!isActive? "active_act_btn":""} className='act_btn' type="button">off</button>
              </div>
          </section>

          <form className="upload_user_image" onSubmit={handleSubmit}>
              <h2> {userImgName ? "update":"upload"} user image</h2>
              <input type="file" onChange={fileChangeHandler} name="userImgName" className="user_img_input" />
              <button onClick={handleSubmit} className="upload" type='submit'>upload</button>
          </form>

          <section className="update_account_info">
              <h3>update account</h3>
              <LinkComponent to="update" Icon={GrUpdate} name="update account" link_active_class="update_link" iconClass="update_icon" link_class="update_link" />
          </section>
    </div>
  )
}

export default SettingsPage