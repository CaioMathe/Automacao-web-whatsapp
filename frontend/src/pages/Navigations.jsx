import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import React, { useState, useEffect} from 'react';


export function Navigation() {
   const [isAuth, setIsAuth] = useState(false);
   useEffect(() => {
     if (localStorage.getItem('access_token') !== null) {
        setIsAuth(true); 
      }
    }, [isAuth]);
     return ( 
      < >
        <Navbar bg="primary" variant="dark" className='nav'>
          <Navbar.Brand href="/">Automação</Navbar.Brand>            
          <Nav className="me-auto sticky-top"> 
          {isAuth ? <Nav.Link href="/">Home</Nav.Link> : null}
          </Nav>
          <Nav>
          {isAuth ? <Nav.Link href="/logout">Sair</Nav.Link> :  
                    <Nav.Link href="/login">Login</Nav.Link>}
          </Nav>
          <Nav>
          {isAuth ? null : <Nav.Link href="/singup">Cadastrar</Nav.Link>}
          </Nav>
        </Navbar>
       </>
     );
}