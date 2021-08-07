import React , { useState } from 'react';
import { Link } from "react-router-dom";

const API = process.env.REACT_APP_API;


export const SignupComButton = () => {


  const [emailAdmin, setEmail] = useState('');
  const [name, setName] = useState('');
  const [nameCommunity, setNameCommunity] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');



  const signupCom = async (e) => {
      e.preventDefault();
      console.log('form submitted')
      const response = await fetch(`${API}/api/signup_community`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          emailAdmin,
          password,
          nameCommunity,
          name
        }),
      });
      const data = await response.json();
      console.log(data)
    }


  function showPass() {
    var x = document.getElementById("signupCom-password");
    if (x.type === "password") {
      x.type = "text";
    } else {
      x.type = "password";
    }
  }
  
  return (
    <div className="container-fluid">
      <Link
        className="nav-link active"
        to="/#"
        data-toggle="modal"
        data-target="#signupCom"
      >
        Regístra tu comunidad
      </Link>
      <div className="modal fade" id="signupCom" tabIndex={-1} role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalCenterTitle">Regístra tu comunidad y ganen todos.</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
            <form autoComplete="on" id="signupCom-form" onSubmit={signupCom} >
            <div className="form-group">
                <input
                  type="text"
                  id="signupCom-name"
                  className="form-control"
                  placeholder="Nombre de la comunidad"
                  required
                  onChange={(e) => setNameCommunity(e.target.value)} value={nameCommunity} 
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  id="signupCom-name"
                  className="form-control"
                  placeholder="Nombre del administrador"
                  required
                  onChange={(e) => setName(e.target.value)} value={name} 
                />
              </div>
              <div className="form-group">
                <input
                  type="email"
                  id="signupCom-email"
                  className="form-control"
                  placeholder="Email administrador"
                  required
                  onChange={(e) => setEmail(e.target.value)} value={emailAdmin} 
                />
              </div>
              <div className="form-group">
                <input
                  type="password"
                  id="signupCom-password"
                  className="form-control"
                  placeholder="Contraseña"
                  required
                  onChange={(e) => setPassword(e.target.value)} value={password} 
                 />
                <input type="checkbox" onClick={showPass}/> Mostrar contraseña
                <div style={{textAlign: 'center'}}> 
                <button type="submit" className="btn btn-primary" >Entrar</button>
                </div>
              </div>
            </form>
             {error && <span className='error-msg'>{error}</span>} 
          </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupComButton;
