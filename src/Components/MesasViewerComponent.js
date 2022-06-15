import {React, useState} from 'react'
import { RemovemesaComponent } from './RemovemesaComponent'
import Button from '@mui/material/Button';
import 'animate.css';
export const MesasViewerComponent = ({setMesas, mesas, setError, error, setDominio, dominio}) => {

    

  return (

    <>



    {Array.isArray(mesas) ?
            mesas.map(element =>{
                return(    
                <article className="mesas animate__animated animate__bounce" key={element.id}>

                    <div className="mesa-info">
                    <Button style={{cursor: "default"}} variant="contained" disableElevation>
                     Mesa #{element.number} ID: {element.id}
                    </Button>
                    </div>

                    <RemovemesaComponent
                        setMesas={setMesas}
                        mesas={mesas}
                        setError={setError}
                        error={error}
                        id={element.id}
                        setDominio={setDominio}
                        dominio={dominio}

                    />


                </article>
                
                
                
            )

            })
        :                 <article className="mesas">

        <div className="mesa-info">
            <span>No hay mesas cargadas</span>
        </div>

        <div className="mesa-config">
            <button className='pedido-comidaCurso' title='Esperando el pedido'>.</button>
            <button className='pedido-mozoRequired' title='Responder peticion'>.</button>
            <button id='edit-config-mesa'>EDIT</button>
            <button id='delete-config-mesa'>X</button>
        </div>

    </article>
    }
    </>


  )
}
