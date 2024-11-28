import React, { useRef } from "react";

import emailjs from "@emailjs/browser";

import  "../FaleConosco/FaleConosco.css";
import Header from "../../components/Header";

const FaleConosco = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_hjmcwcu",
        "template_vcy7wjd",
        form.current,
        "yLWT42pG87rmMBPOO"
      )
      .then(
        function (response) {
          console.log("SUCCESS!", response.status, response.text);
        },
        function (err) {
          console.log("FAILED...", err);
        }
      );
  };

  return (
    <div className='faleConosco'>
      <Header />

      <div className='ladoEsq'>
        <h1>Fale Conosco</h1>
        <form ref={form} onSubmit={sendEmail}>
          <label>
            Nome:
            <input type="text" name="user_name" />
          </label>

          <label>
            Email:
            <input type="email" name="user_email" />
          </label>

          <label>
            Tópico:
            <select name="user_choice">
              <option value="duvida">Dúvida</option>
              <option value="ajuda">Ajuda</option>
              <option value="outro">Outro</option>
            </select>
          </label>
          <label>
            Mensagem:
            <textarea name="message"></textarea>
          </label>

          <button className="form_btn">Enviar</button>
        </form>
      </div>

      <div className="ladoDir">
        <h2>
          Nos dê <span>seu feedback</span> e ajude-nos a <span>melhorar</span>{" "}
          cada vez mais!
        </h2>
        <h2>
          Envie suas <span>dúvidas</span> e será respondido em{" "}
          <span>pouco tempo!</span>
        </h2>
      </div>
    </div>
  );
};

export default FaleConosco;
