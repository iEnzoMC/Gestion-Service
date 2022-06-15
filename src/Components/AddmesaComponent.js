import Backdrop from '@mui/material/Backdrop';
import React, { useEffect, useState } from 'react'
//import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';
import { LSConnection } from '../helper/LSConnection';

export const AddmesaComponent= ({setError, error, setErrorMessage, errorMessage, setMesas, mesas, setDominio, dominio}) => {
    const [open, setOpen] = useState(false);


    useEffect(()=>{

        // ESTO VERIFICA SI HAY ALGUNA MESA QUE TENGA LA MISMA ID
        if(Array.isArray(mesas) === true){
          const busqueda = mesas.reduce((acc, mesa) => {
              acc[mesa.id] = ++acc[mesa.id] || 0;
              return acc;
            }, {});
            
            const duplicados = mesas.filter( (mesa) => {
                return busqueda[mesa.id];
            });

            if(duplicados.length > 0){
              setError(true)
              setErrorMessage("Se encontro una mesa con un mismo ID. [Contactar al Soporte]")
            }
        }
        

    }, [mesas])

    const handleClose = () => {
      setOpen(false);
    };
    const handleToggle = () => {
      setOpen(!open);
    };

    const handleForm = e =>{
        e.preventDefault();

        let target = e.target;

        let campoMesa = target.mesa.value;

        if(campoMesa >= 1){
            if(campoMesa > 200){
              setError(true);
              setErrorMessage("No puedes cargar 200 mesas en una sola ejecucion.")
              return handleClose()
            }
            let countData = LSConnection("GET", "mesas")
            let mesac = 0
            if(Array.isArray(countData)){
                if(countData.length > 0){
                  let sumados = countData[countData.length-1];
                  mesac = sumados.number
                }
            }
            let arrayFalsa = [];
             for (let i = 0; i < campoMesa; i++) {
                let suma = mesac+i+1;
                let id = Math.floor(Math.random() * new Date().getTime()) + suma
                let mesaBase = {
                    number: suma,
                    id: id,
                    url: dominio+id
                }

                if(Array.isArray(mesas)){
                    setMesas(elements =>{
                        return[...elements, mesaBase]
                    })
                }else{
                    arrayFalsa.push(mesaBase)
                    setMesas(arrayFalsa)
                }
                LSConnection("save", `mesas`, mesaBase);
             }
        }else{
          setError(true);
          setErrorMessage("No puedes colocar un numero inferior a 1")         
        }
        handleClose()
        

    }
  
    return (
      <div>
        <Button onClick={handleToggle} sx={{color: '#fff', margin: '10px'}}>Agregar mesa</Button>
        <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={open}
            
        >
            
            <form className='menu-login form-addmesa' onSubmit={e=> handleForm(e)}>
            <span onClick={handleClose}>X</span>
              Mesas<input type='number' placeholder='cant.' name='mesa' />
              <input type='submit' value="Confirmar"/>

            </form>
        </Backdrop>
  
      </div>
  
    );
}
