import {React, useState} from 'react'
import 'animate.css';
import Switch from '@mui/material/Switch';
import { LSConnection } from './LSConnection';
function Casos({objeto, setNames, names}) {

    const [checked, setChecked] = useState(false)

    const handleChange = (event) => {
        let check = event.target.checked
        setChecked(check);
    };

    const baseDatos = LSConnection("GET", "categorias")

    if(checked === true){
        if(Array.isArray(baseDatos)){
            

            let filtrado = baseDatos.filter(x => x.name === objeto.name)[0]
            filtrado.datos.push("tes")
            filtrado.datos.push("te2s")
            console.log(filtrado);
            console.log(names)
        }
    }



  return (


    <Switch
    checked={checked}
    onChange={handleChange}
    inputProps={{ 'aria-label': 'controlled' }}
    />


  );
}

export default Casos;


// VER LOS NAMES PARA GUARDARLOS EN LAS CATEGORIAS
