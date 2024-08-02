import styles from './Header.module.css'
import { NavLink } from 'react-router-dom'

import logo from '../assets/imgs/1-removebg-preview 2.png'

const Header = () => {
  return (
    <header>
    <nav>
    <div className={styles.logo}>
        <img src={logo} alt="" />
    </div>
    <ul>
        <li>
          <NavLink>
            Sobre nós
          </NavLink>
        </li>
        <li>
          <NavLink>
            Fale Conosco
          </NavLink>
        </li>
    </ul>
</nav>
    <div className={styles.login_navBar}>
      <NavLink to="/login" className={styles.login_btn}>
        Login        
      </NavLink>
      <NavLink to="/cadastro" className={styles.cadastro_btn}>
        Cadastro        
      </NavLink>
    </div>
      
</header>
  )
}

export default Header