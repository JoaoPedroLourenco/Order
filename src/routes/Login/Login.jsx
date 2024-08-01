import { useState } from "react"

import styles from './Login.module.css'

import mockUpLoginImage from '../../assets/imgs/MacBook Pro and iPhone 15 Pro Mockup.png'
import logoBg from '../../assets/imgs/LogoBackground.png'

import Header from "../../components/Header"


const Login = () => {
    const [email, setEmail] = useState("")
    const [senha, setSenha] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault()
    }

  return (
    <>
    <Header />
    <div className={styles.login_container}>
    <div className={styles.form_container}>
        <h1>Login</h1>

        <form onSubmit={handleSubmit}>
            <label>
                E-mail:
                <input type="text" name="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
            </label>
            <label>
                Senha:
                <input type="password" name="senha" value={senha} onChange={(e) => setSenha(e.target.value)}/>
            </label>

            <button className={styles.form_btn}>Confirmar</button>
        </form>
        </div>

        <div style={{backgroundImage: `url(${logoBg})`, backgroundPosition: "center", backgroundSize: "cover", width: "50%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center"}}>
            <img src={mockUpLoginImage} alt="Use Order!" />
        </div>
    
    </div>
    </>
  )
}

export default Login