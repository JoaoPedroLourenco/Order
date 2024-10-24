import React, { useRef } from "react";

import emailjs from "@emailjs/browser";

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
    <div>
      <form ref={form} onSubmit={sendEmail}>
        <input type="text" name="user_name" />
        <input type="email" name="user_email" />
        <select name="user_choice">
          <option value="duvida">Dúvida</option>
          <option value="ajuda">Ajuda</option>
          <option value="outro">Outro</option>
        </select>
        <textarea name="message"></textarea>
        <input type="submit" value="Send" />
      </form>
    </div>
  );
};

export default FaleConosco;
