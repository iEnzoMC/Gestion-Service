import React, { useState } from 'react'
import { LSConnection } from '../helper/LSConnection';
import { Link } from 'react-router-dom';
import DashboardIcon from '@mui/icons-material/Dashboard';
import DeleteIcon from '@mui/icons-material/Delete';
import CircleIcon from '@mui/icons-material/Circle';
import Backdrop from '@mui/material/Backdrop';
import { Imprimir } from './Imprimir';
import { forwardRef, useRef } from "react";
import ReactToPrint, { PrintContextConsumer } from "react-to-print";
import QRCode from 'react-qr-code';

// HACER ESTE COMPONENTE


export const RemovemesaComponent = ({setMesas, mesas, setError, error, id, setDominio, dominio}) => {



  const ref = useRef();
  
  const [edit, setEdit] = useState(false)

  let urlMesa = mesas.filter(x => x.id === id)[0].url

  let mesa = mesas.filter(x=> x.id === id)[0]

  let peticionMesa = mesas.filter(x => x.id === id)[0].peticion

  let pedidoMesa = mesas.filter(x => x.id === id)[0].pedido

  let componentRef = useRef();

  const ComponentToPrint = forwardRef((props, ref) => {
    return <div ref={ref}>
      <h1>MESA {mesa.number}</h1>
      <QRCode ref={ref} style={{ margin: '0 auto', border: '1px solid white'}} size={132} value={urlMesa} />
      </div>;
  });


  

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
  const handleClose = () =>{

    setEdit(false)

  }





  return (

    <>


    <div className="mesa-config">
        {pedidoMesa === true ? <CircleIcon className='pedido-comidaCurso' title='Esperando el pedido' sx={{color: 'orange'}} /> : <CircleIcon className='pedido-comidaCurso' title='Esperando el pedido' sx={{color: '#ccc'}} />}
        {peticionMesa === true ? <CircleIcon className='pedido-mozoRequired' title='Responder peticion' sx={{color: 'green'}} /> : <CircleIcon className='pedido-mozoRequired' title='Responder peticion' sx={{color: '#ccc'}} />}
        
        <DashboardIcon id='edit-config-mesa' onClick={e => handleEdit(e)} sx={{marginLeft: '10px', color: "blue", marginTop: '10px'}}/>
        <DeleteIcon id='delete-config-mesa' onClick={e => handleRemove(e)} sx={{color: 'red'}}/>

      
      {edit === true &&
/*           <div style={{marginTop: "10px"}}>
              <hr style={{marginBottom: "10px"}} />
              <div style={{display: "flex", flexDirection: "column", textAlign:"center"}}>
                <span><QRCode size={132} value={dominio+urlMesa} /></span>
                <Link to={urlMesa}> Click para ver plantilla </Link>
              </div>
         </div> */
             <div>
             <Backdrop
               sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
               open={edit}
               onClick={handleClose}
             >
                <div style={{width: '250px', height: '250px',borderRadius: '10px' , backgroundColor:'#0A1929'}}>
                  <div style={{display: "flex", flexDirection: "column", textAlign:"center"}}>
                    <ReactToPrint content={() => ref.current}>
                    <PrintContextConsumer>
                      {({ handlePrint }) => (
                        <a onClick={handlePrint}><ComponentToPrint ref={ref} /></a>
                      )}
                    </PrintContextConsumer>
                  </ReactToPrint>
                    <Link style={{marginTop: '5px', color: 'yellow'}} to={urlMesa}> Click para ver plantilla </Link>
                  </div>  
                </div>            
             </Backdrop>
           </div>

      }

    </div>
    </>

  )
}
