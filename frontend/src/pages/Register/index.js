import React, { useState } from "react";

import logoImg from "../../assets/logo.svg";
import { Link, useHistory } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";

import api from "../../services/api";

import "./styles.css";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [whatsapp, setWahtsapp] = useState("");
  const [city, setCity] = useState("");
  const [uf, setUf] = useState("");

  const history = useHistory();

  async function handleRegister(e) {
    e.preventDefault();
    const data = {
      name,
      email,
      whatsapp,
      city,
      uf,
    };
    try {
      const response = await api.post("ongs", data);
      alert(`Seu ID é: ${response.data.id}`);
      history.push("/");
    } catch (err) {
      alert("Erro no cadastro, tente novamente :(");
    }
  }
  return (
    <div className="register-container">
      <div className="content">
        <section>
          <img src={logoImg} alt="The Be Hero" />

          <h1>Cadastro</h1>
          <p>
            Faça seu Cadastro, entre na plataforma e ajude as pessoas a
            encontrar casos de sua ONG.
          </p>
          <Link className="back-link" to="/">
            <FiArrowLeft size={16} color="#E02041" />
            Voltar para o início
          </Link>
        </section>
        <form onSubmit={handleRegister}>
          <input
            type="text"
            placeholder="Nome da ONG"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            placeholder="Whatsapp"
            value={whatsapp}
            onChange={(e) => setWahtsapp(e.target.value)}
          />
          <div className="input-group">
            <input
              placeholder="Cidade"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
            <input
              placeholder="UF"
              style={{ width: 80 }}
              value={uf}
              onChange={(e) => setUf(e.target.value)}
            />
          </div>
          <button className="button" type="submit">
            Cadastrar
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;
