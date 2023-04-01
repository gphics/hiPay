
// @ts-ignore
function InputComponent({label,dis=false, name, type, action, customClass, value="",Icon }) {
    return (
        <div className={customClass ? `single_input_holder ${customClass}` : 'single_input_holder'}>
          <label htmlFor={name}> {label} </label>
          <section>
              <input readOnly={false || dis} autoComplete="true"  onChange={action} name={name} type={type || "text"} value={value} />

               <Icon className="input_icon"/>  
          </section>
        
    </div> 
  )
}

export default InputComponent