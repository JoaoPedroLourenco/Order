import React from 'react'
import '../components/ErrorPage.css'
import erroImage from '../assets/imgs/erro.png'
import { Link } from 'react-router-dom'

const ErrorPage = () => {
  return (
    <div className='container'>
      <div class="titulo-erro">
                <p>Volte para à <Link to="/">Página Inicial</Link></p>
            </div>

            <div class="img-erro">
                <img src={erroImage} alt="" class="erroImage"/>
            </div>

            <div class="paragrafo-erro">
                <p>Parece que ocorreu um <span class="cor"> erro...</span></p>
            </div>
    </div>
  )
}

export default ErrorPage
