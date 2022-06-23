import {React, useEffect, useState} from 'react'
import 'animate.css';
import Switch from '@mui/material/Switch';
function Casos({objeto, setNames, names, setCategorias, categorias}) {

  const [checked, setChecked] = useState(false)

    const handleChange = (event) => {
        let check = event.target.checked
        setChecked(check);

    };

    
    useEffect(() => {

          if(checked){
            objeto.datos = names

            if ( Array.isArray(categorias) ) {
              setCategorias(element => {
                return[...element, objeto]
              })
            }else {
              setCategorias([objeto])
            }



          } else {
            if ( Array.isArray(categorias) ) {
              let filtro = categorias.filter(x => x.name !== objeto.name)
              setCategorias(filtro)
            }
          }

      }, [checked])



    





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
