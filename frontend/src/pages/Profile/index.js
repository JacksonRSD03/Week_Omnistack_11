import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { FiPower, FiTrash2 } from "react-icons/fi";

import api from "../../services/api";

import logoImg from "../../assets/logo.svg";
import "./styles.css";
function Profile() {
  const [incidents, setIncidents] = useState([]);
  const OngId = localStorage.getItem("OngId");
  const OngName = localStorage.getItem("OngName");
  const history = useHistory();

  useEffect(() => {
    api
      .get("profile", { headers: { Authorization: OngId } })
      .then((response) => {
        setIncidents(response.data);
      });
  }, [OngId]);

  async function handleDeleteIncident(id) {
    try {
      await api.delete(`incidents/${id}`, {
        headers: { Authorization: OngId },
      });
      setIncidents(incidents.filter((incident) => incident.id !== id));
    } catch (err) {
      alert("Erro ao deletar o caso!");
    }
  }
  function handleLogout() {
    localStorage.clear();
    history.push("/");
  }
  return (
    <div className="profile-container">
      <header>
        <img src={logoImg} alt="The Be Hero" />
        <span>Bem Vinda {OngName}</span>
        <Link className="button" to="/incidents/new">
          Cadastrar Novo Caso
        </Link>
        <button onClick={handleLogout} type="button">
          <FiPower size={18} color="#E02041" />
        </button>
      </header>
      <h1>Casos Cadastrados</h1>
      <ul>
        {incidents.map((incident) => (
          <li key={incident.id}>
            <strong>CASO:</strong>
            <p>{incident.title}</p>
            <strong>DESCRIÇÃO:</strong>
            <p>{incident.description} </p>

            <strong>VALOR:</strong>
            <p>
              {Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
              }).format(incident.value)}
            </p>
            <button
              onClick={() => handleDeleteIncident(incident.id)}
              type="button"
              size={20}
              color="#A8A8B3"
            >
              <FiTrash2 />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Profile;
