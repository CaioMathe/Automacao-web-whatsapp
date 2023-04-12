// Import the react JS packages 
import axios from "axios";
import {useState} from "react";
import { ToastContainer, toast } from 'react-toastify';

// Define the Login function.
export const Login = () => {
     const [password, setPassword] = useState('');
     const [email, setEmail] = useState('');

     // Create the submit method.
     const submit = async e => {
          e.preventDefault();
          const user = {
                email: email,
                password: password
               };
          // Create the POST requuest
          
                (async () => {
                  try {
                    const {data} =  await  axios.post('http://localhost:8000/token/',
                         user ,
                         {headers: {'Content-Type': 'application/json'}},
                         {withCredentials: true});

                          // Initialize the access & refresh token in localstorage.      
                          localStorage.clear();
                          localStorage.setItem('access_token', data.access);
                          localStorage.setItem('refresh_token', data.refresh);
                          axios.defaults.headers.common['Authorization'] = 
                                                          `Bearer ${data['access']}`;
                          window.location.href = '/'
                  } catch (e) {
                    toast.error('Erro, verifique seu email e/ou senha!', {
                      position: "top-right",
                      autoClose: 5000,
                      hideProgressBar: false,
                      closeOnClick: true,
                      pauseOnHover: true,
                      draggable: true,
                      progress: undefined,
                      theme: "colored",
                      });
                  }
                  })()
    }
    return(
      <div className="Auth-form-container w-50 m-auto mt-4">
        <form className="Auth-form" onSubmit={submit}>
          <div className="Auth-form-content">
            <h3 className="Auth-form-title">Login</h3>
            <div className="form-group mt-3">
              <label>Email</label>
              <input className="form-control mt-1" 
                placeholder="Coloque seu email" 
                name='Email'  
                type='text' value={email}
                required 
                onChange={e => setEmail(e.target.value)}/>
            </div>
            <div className="form-group mt-3">
              <label>Senha</label>
              <input name='password' 
                type="password"     
                className="form-control mt-1"
                placeholder="Coloque sua senha"
                value={password}
                required
                onChange={e => setPassword(e.target.value)}/>
            </div>
            <div className="d-grid gap-2 mt-3">
              <button type="submit" 
                 className="btn btn-primary">Logar</button>
            </div>
          </div>
       </form>
       <ToastContainer/>
     </div>
     )
}