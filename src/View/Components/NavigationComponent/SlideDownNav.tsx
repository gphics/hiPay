import Logo from '../../../assets/Others/SVG/Logo.svg'
import { ImMenu } from 'react-icons/im'
import viewUtils from '../../Utils'
import Controllers from '../../../Controller'
function SlideDownNav() {
    const { LinkComponent } = viewUtils
    const {showLinks} = Controllers
    type link = {
        name: string,
        to:string
    }

    const navLinks: link[] = [
        { name: "home", to: "home" },
        { name: "register", to: "home/register" },
        { name: "login", to: "home/login" }
                  
    ]

    function linkAction(){
  showLinks("slide_down_link_holder", "hide_slide" )
    }
  return (
      <div className='slide_down_nav'>
          <section className="slide_down_visible">
              <img src={Logo} alt="hipay logo" className='logo' />
              <ImMenu className='slide_down_bar' onClick={linkAction} />
          </section>

          <section className="slide_down_link_holder hide_slide">
              {navLinks.map((item, i) => <LinkComponent key={i + 6464} {...item} link_class="slide_down_link" link_active_class="slide_down_active_link" action={linkAction} />)}
          </section>
          
  
    </div>
  )
}

export default SlideDownNav