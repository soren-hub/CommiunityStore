import React , { useState } from 'react';
import { Link } from "react-router-dom";


export const SignupButton = () => {


  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [nameCommunity, setNameCommunity] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const signup = (e) => {
      e.preventDefault();
      console.log('form submitted')
      console.log(email,password,name,nameCommunity)
    }


  function showPass() {
    var x = document.getElementById("signup-password");
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
        data-target="#signup"
      >
        Regístrate
      </Link>
      <div className="modal fade" id="signup" tabIndex={-1} role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalCenterTitle"> Organízate y compra junto a tu comunidad.</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
            <form autoComplete="on" id="signup-form" onSubmit={signup} >
            <div className="form-group">
                <input
                  type="text"
                  id="signup-name"
                  className="form-control"
                  placeholder="Nombre"
                  required
                  onChange={(e) => setName(e.target.value)} value={name} 
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  id="signup-name-community"
                  className="form-control"
                  placeholder="Nombre de tu comunidad"
                  required
                  onChange={(e) => setNameCommunity(e.target.value)} value={nameCommunity} 
                />
              </div>
              <div className="form-group">
                <input
                  type="email"
                  id="signup-email"
                  className="form-control"
                  placeholder="Email"
                  required
                  onChange={(e) => setEmail(e.target.value)} value={email} 
                />
              </div>
              <div className="form-group">
                <input
                  type="password"
                  id="signup-password"
                  className="form-control"
                  placeholder="Contraseña"
                  required
                  onChange={(e) => setPassword(e.target.value)} value={password} 
                 />
                <input type="checkbox" onClick={showPass}/> Mostrar contraseña
                <div style={{textAlign: 'center'}}> 
                <button type="submit" className="btn btn-primary">Empezar a organizarte</button>
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

export default SignupButton;
