import React , { useState } from 'react';
import { Link } from "react-router-dom";




export const LoginButton = () => {


  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const login = (e) => {
      e.preventDefault();
      console.log('form submitted')
      console.log(email,password)
    }


   


  function showPass() {
    var x = document.getElementById("signin-password");
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
        data-target="#login"
      >
        Entrar
      </Link>
      <div className="modal fade" id="login" tabIndex={-1} role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalCenterTitle">Ingresa y encarga tu parte</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
            <form autoComplete="on" id="signin-form" onSubmit={login} >
              <div className="form-group">
                <input
                  type="email"
                  id="signin-email"
                  className="form-control"
                  placeholder="Email"
                  required
                  onChange={(e) => setEmail(e.target.value)} value={email} 
                />
              </div>
              <div className="form-group">
                <input
                  type="password"
                  id="signin-password"
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

export default LoginButton;
