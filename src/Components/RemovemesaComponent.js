import React, { useState } from 'react'
import { LSConnection } from '../helper/LSConnection';
import QRCode from "react-qr-code";
import { Link } from 'react-router-dom';

// HACER ESTE COMPONENTE

export const RemovemesaComponent = ({setMesas, mesas, setError, error, id, setDominio, dominio}) => {

  const [edit, setEdit] = useState(false)

  let urlMesa = mesas.filter(x => x.id === id)[0].url


  

  const handleRemove = e =>{
    e.preventDefault();


    let mesaEliminada;
    console.log(mesas);

    // ELIMINA EL OBJETO
    if(Array.isArray(mesas)){
      mesaEliminada = mesas.filter(x => x.id !== id);

    }

    //ORDENA EL OBJETO
    if(Array.isArray(mesaEliminada)){
      for (let i = 0; i < mesaEliminada.length; i++) {
        mesaEliminada[i].number = i+1;
        
      }
      setMesas(mesaEliminada);
      LSConnection("SAVE.STATIC", "mesas", mesaEliminada)
    }

    // **********  EDIT ***********
    



  }

  const handleEdit = e =>{
    e.preventDefault();

    setEdit(!edit)

  }




  return (

    <>
    <div className="mesa-config">
        <button className='pedido-comidaCurso' title='Esperando el pedido'>.</button>
        <button className='pedido-mozoRequired' title='Responder peticion'>.</button>
        <button id='edit-config-mesa' onClick={e => handleEdit(e)}>EDIT</button>
        <button id='delete-config-mesa' onClick={e => handleRemove(e)}>X</button>

      
      {edit === true &&
          <div style={{marginTop: "10px"}}>
              <hr style={{marginBottom: "10px"}} />
              <div style={{display: "flex", flexDirection: "column", textAlign:"center"}}>
                <span><QRCode size={132} value={dominio+urlMesa} /></span>
                <Link to={urlMesa}> Click para ver plantilla </Link>
              </div>
         </div>

      }

    </div>
    </>

  )
}
