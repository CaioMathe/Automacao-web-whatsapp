// Import the react JS packages
import {useEffect, useState} from "react";
import { ToastContainer, toast } from 'react-toastify';
import axios from "axios";

// Define the Login function.
export const Home = () => {
     const [contato, setContato] = useState('');
     const [mensagem, setMensagem] = useState('');
     useEffect(() => {
        if(!localStorage.getItem('access_token')){                   
            window.location.href = '/login'
        }
        else{
         (async () => {
           try {
              await axios.get(   
                            'http://localhost:8000/home/', {
                             headers: {
                                'Content-Type': 'application/json',
                                'Authorization': `Bearer ${localStorage.getItem('access_token')}`
                             }}
                           );
             
          } catch (e) {
            console.log('not auth')
          }
         })()};
     }, []);

    async function Automacao(e){
      e.preventDefault();
     let dados = {}
     dados.contatos = contato.trim().split(',')
     dados.mensagem = mensagem

      await axios.post('http://localhost:8000/api/web/',
      dados ,
      {headers: {'Content-Type': 'application/json'}},
      {withCredentials: true}).then((e)=>{
        console.log(e.response)
        if(e.response.status === 400){
         toast.error("Erro ao enviar",{
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

         toast.success("Enviado com Sucesso! ",{
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

      })
      
     }

     return <div className="form-signin mt-5 ">
      <form className="Auth-form" onSubmit={Automacao}>
              <div className="form-group mt-3">
              <label>Contatos: <span>Separados por ","</span></label>
              <input className="form-control mt-1 w-25" 
                placeholder="Coloque os nomes dos Contatos/Grupos" 
                name='Contatos'  
                type='text' value={contato}
                required 
                onChange={e => setContato(e.target.value)}/>
            </div>

            <div className="form-group mt-3">
              <label>Mensagem:</label>
              <textarea className="form-control mt-1 w-25" 
                placeholder="Coloque sua mensagem" 
                name='Mensagem'  
                type='text' value={mensagem}
                required 
                onChange={e => setMensagem(e.target.value)}/>
            </div>
            <div className="d-grid gap-2 mt-3 w-25">
              <button type="submit" 
                 className="btn btn-primary">Enviar</button>
            </div>
        </form>
       <ToastContainer/>

            </div>
}