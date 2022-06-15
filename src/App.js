import { useEffect, useState } from 'react';
import './App.css';
import LoginComponent from './Components/loginComponent';
import { AddmesaComponent } from './Components/AddmesaComponent';
import { MesasViewerComponent } from './Components/MesasViewerComponent';
import { Errors } from './helper/Errors';
import { LSConnection } from './helper/LSConnection';


function App() {

    const [mesas, setMesas] = useState([]);

    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("Algo hiciste mal")

    const [dominio, setDominio] = useState("http://localhost:3000/")

    useEffect(()=>{
        let baseDatos = LSConnection("GET", "mesas")
        setMesas(baseDatos)
        console.log(baseDatos)
    }, [])

  return (

  <div className="layout">

    <Errors
        setError={setError} 
        error={error}
        setErrorMessage={setErrorMessage}
        errorMessage={errorMessage}
    />

    {/* HEADER  */}
    <div className="header">
        <LoginComponent

        />
        <h1>Sistema de gestion de negocio</h1>
    </div>


    {/* CONTENEDOR */}
    <div className="contener">


        <MesasViewerComponent
            setMesas={setMesas}
            mesas={mesas}
            setError={setError}
            error={error}
            
            setDominio={setDominio}
            dominio={dominio}
        />
        
    </div>

    {/* LATERAL */}
    <div className="lateral">

        <h2>Administrador</h2>
        <AddmesaComponent 
        setError={setError} 
        error={error}
        setErrorMessage={setErrorMessage}
        errorMessage={errorMessage}

        setMesas={setMesas}
        mesas={mesas}

        setDominio={setDominio}
        dominio={dominio}
        />
        <a href="/">Configurar Menu de comida</a>
        <a href="/">Gestionar Ventas</a>
        <a href="/">Pedidos en curso</a>
  </div>





  </div>

  

  );
}

export default App;
