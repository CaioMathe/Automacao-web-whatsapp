// Import the react JS packages 
import axios from "axios";
import {useState} from "react";
import { ToastContainer, toast } from 'react-toastify';

// Define the Login function.
export const SingUp = () => {
     const [username, setUsername] = useState('');
     const [password, setPassword] = useState('');
     const [email, setEmail] = useState('');

     // Create the submit method.
     const submit = async e => {
          e.preventDefault();
          const user = {
                username: username,
                password: password,
                email: email,
               };
          // Create the POST requuest

          await axios.post('http://localhost:8000/create/',
                         user ,
                         {headers: {'Content-Type': 'application/json'}},
                         {withCredentials: true}).then((e)=>{
                           if(e.response.status === 400){
                            toast.error("Erro! Email já está sendo utilizado",{
                              position: "top-right",
                              autoClose: 5000,
                              hideProgressBar: false,
                              closeOnClick: true,
                              pauseOnHover: true,
                              draggable: true,
                              progress: undefined,
                              theme: "colored",
                              });

                          }else{

                            toast.success("Conta criada com sucesso!",{
                              position: "top-right",
                              autoClose: 5000,
                              hideProgressBar: false,
                              closeOnClick: true,
                              pauseOnHover: true,
                              draggable: true,
                              progress: undefined,
                              theme: "colored",
  
                              });
                              setTimeout(()=>{
                                window.location.href = '/login'
                              }, 5000)
                          }

                         })

    }
    return(
      <div className="Auth-form-container w-50 m-auto mt-4">
        <form className="Auth-form" onSubmit={submit}>
          <div className="Auth-form-content">
            <h3 className="Auth-form-title">Cadastro</h3>
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
              <label>Nome</label>
              <input className="form-control mt-1" 
                placeholder="Coloque seu nome" 
                name='username'  
                type='text' value={username}
                required 
                onChange={e => setUsername(e.target.value)}/>
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
                 className="btn btn-primary">Cadastrar</button>
            </div>
          </div>
       </form>
       <ToastContainer/>
     </div>
     )
}