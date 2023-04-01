import {useState} from 'react'
import { MdVisibility, MdVisibilityOff } from 'react-icons/md'

// @ts-ignore
function PasswordComponent({label, name, action, customClass, value }) {
    const [inputType, setInputType] = useState("password")
    function toggleState() {
        setInputType(prev => prev === "password" ? "text": "password")
    }
    return (
      <div
        className={
          customClass
            ? `single_input_holder ${customClass}`
            : "single_input_holder"
        }
      >
        <label htmlFor={name}> {label} </label>
        <section>
          <input
            placeholder="..."
            onChange={action}
            autoComplete="true"
            name={name}
            type={inputType}
            value={value}
          />

          {inputType === "password" ? (
            <MdVisibility className="input_icon" onClick={toggleState} />
          ) : (
            <MdVisibilityOff className="input_icon" onClick={toggleState} />
          )}
        </section>
      </div>
    );
    
}

export default PasswordComponent



