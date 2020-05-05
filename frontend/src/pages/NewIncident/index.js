import React, { useState } from "react";

import api from "../../services/api";

import logoImg from "../../assets/logo.svg";
import { Link, useHistory } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import "./styles.css";

function NewIncident() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [value, setValue] = useState("");
  const OngId = localStorage.getItem("OngId");
  const history = useHistory();
  async function handleNewIncident(e) {
    e.preventDefault();
    const data = {
      title,
      description,
      value,
    };
    try {
      await api.post("incidents", data, {
        headers: {
          Authorization: OngId,
        },
      });
      history.push("/profile");
    } catch (err) {
      alert("Erro na criação do incident :(");
    }
  }
  return (
    <div className="new-incident-container">
      <div className="content">
        <section>
          <img src={logoImg} alt="The Be Hero" />

          <h1>Cadastrar novo caso</h1>
          <p>
            Descreva o caso detalhadamente para encontrar um herói para resolver
            isso.
          </p>
          <Link className="back-link" to="/profile">
            <FiArrowLeft size={16} color="#E02041" />
            Voltar para a home
          </Link>
        </section>
        <form onSubmit={handleNewIncident}>
          <input
            type="text"
            placeholder="Título do caso"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            placeholder=" Descrição"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <input
            placeholder="Valor em reais"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />

          <button className="button" type="submit">
            Cadastrar
          </button>
        </form>
      </div>
    </div>
  );
}

export default NewIncident;
