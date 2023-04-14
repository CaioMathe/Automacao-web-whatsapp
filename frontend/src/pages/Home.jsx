// Import the react JS packages
import {useEffect, useState} from "react";
import { ToastContainer, toast } from 'react-toastify';
import axios from "axios";
import { Cards } from "../componets/Cards";

// Define the Login function.
export const Home = () => {
     const [contato, setContato] = useState('');
     const [mensagem, setMensagem] = useState('');
     const [dados, setDado] = useState([]);

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
                           ).then(()=>{
                            Consulta()
                           });
                           
          } catch (e) {
            console.log('not auth')
          }
         })()};
     }, []);

    async function Automacao(e){
      e.preventDefault();
     let dados = {}
     dados.contatos = contato.split(',')
     dados.mensagem = mensagem

      await axios.post('http://localhost:8000/api/web/',
      dados ,
      {headers: {'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('access_token')}`}},
      {withCredentials: true}).then((e)=>{
        console.log(e.response)
        if(e.status === 400){
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
           Consulta()
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
           Consulta()
       }

      })

      
     }

     async function Consulta(){
      // e.preventDefault();
      await axios.get('http://127.0.0.1:8000/api/search/',
      {headers: {'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('access_token')}`}},
      {withCredentials: true}).then((data)=>{
        setDado(data.data) 
      })
    }

     return <div className="container">
      <div className="form-signin mt-5 row m-auto gap-5">
      <form className="Auth-form col-md-4" onSubmit={Automacao}>
              <div className="form-group mt-3">
              <label>Contatos: <span>Separados por ","</span></label>
              <input className="form-control mt-1" 
                placeholder="Coloque os nomes dos Contatos/Grupos" 
                name='Contatos'  
                type='text' value={contato}
                required 
                onChange={e => setContato(e.target.value)}/>
            </div>

            <div className="form-group mt-3">
              <label>Mensagem:</label>
              <textarea className="form-control mt-1" 
                placeholder="Coloque sua mensagem" 
                name='Mensagem'  
                type='text' value={mensagem}
                required 
                rows="10"
                onChange={e => setMensagem(e.target.value)}/>
            </div>
            <div className="d-grid gap-2 mt-3">
              <button type="submit" 
                 className="btn btn-primary">Enviar</button>
            </div>
        </form>

       <div className="bg-primary col-md-4 rounded p-2 text-center">
       {dados.map( e =>{
          return (<Cards key={e.id} mensagem={e.mensagem}/>)
        })}
       </div>

      </div>
      <ToastContainer/>

     </div>
}