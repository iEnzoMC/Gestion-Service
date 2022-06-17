import {React, useEffect, useState} from 'react'
import 'animate.css';
import AddIcon from '@mui/icons-material/Add';
import Fab from '@mui/material/Fab';
import Button from '@mui/material/Button';
import { LSConnection } from '../helper/LSConnection';
import Casos from '../helper/Casos';
import Box from '@mui/material/Box';
import Switch from '@mui/material/Switch';
import TextField from '@mui/material/TextField';

function Configmenu({setError, error, setErrorMessage, errorMessage}) {

    const [categorias, setCategorias] = useState(false)
    const [category, setCategory] = useState(false)

    useEffect(()=>{
        let baseDatos = LSConnection("GET", "categorias")
        Array.isArray(baseDatos) && setCategorias(baseDatos)
        console.log(baseDatos);
    }, [])

    const [checked, setChecked] = useState(false)

    const handleChange = (event) => {
        let check = event.target.checked
        setChecked(check);
    };

    const [names, setNames] = useState(false)
    useEffect(()=>{
        console.log(names)
    }, [names])

    const handleAddName = e =>{
        let id = new Date().getTime()
        if(names !== false){
            setNames(element =>{
                return[...element, id]
            })
        }else{
            setNames([id])
        }
    }

    const handleRemoveName = e =>{
        e.preventDefault();


        let id = parseFloat(e.target.name);
        
        let filter = names.filter(x=> x !== id);

        setNames(filter)

    }

    const handleCrearCategoria = e =>{

        let baseDato = LSConnection("GET", "categorias")
        let json = {
            name: category,
            datos: []

        }

        if(category === false){
            setError(true);
            setErrorMessage("El campo no puede estar vacio.")
            return
        }
       
        if(Array.isArray(baseDato)){ 
            let busqueda = baseDato.filter(x=> x.name === category)
            console.log(busqueda);
            if(busqueda.length > 0){
                setError(true)
                setErrorMessage("Ese nombre ya existe. Intenta con otro.")
            }else{
                console.log("Categoria creada22 "+category);
                setCategorias(element =>{
                    return[...element, json]
                })
                LSConnection("SAVE", "categorias", json)
            }
            
        }else{
            console.log("Categoria creada "+category);
            setCategorias([json])
            LSConnection("SAVE", "categorias", json)
        }
    }

    const handleCategory = e =>{
        let valor = e.target.value
        setCategory(valor.toLowerCase())

    }

    const handleRemoveCategory = e =>{
        console.log(e.target.name);

        let name = e.target.name

        let element = categorias.filter(x => x.name !== name)
        LSConnection("SAVE.STATIC", "categorias", element)
        setCategorias(element)
    }



  return (


    <form className='formulario-menu'>

        <div className='nombre-y-espesificacion'>
        
            <label>Nombre(*)</label>
            <input type='text' placeholder='E.j: Muzza' name='nombre'/>
            <Fab color="primary" aria-label="add">
            <AddIcon />
            </Fab>

            <label>Espesificacion(*)</label>
            <textarea type='text' placeholder='E.j: Muzza de 10 porciones' name='info'/>
        
        </div>
        
        <div className='crear-y-agregar'>

            <label>Crear / Agregar Categoria(*)</label>

            <div className='crear-y-agregar-unirInput'>
                <TextField id="standard-basic" variant="standard" />     
                <Button style={{marginLeft: '5px', width: '20px'}} variant="contained" color="success">
                    Crear
                </Button>
            </div>

            <div className='crear-y-agregar-unirPromocion'>
                <span style={{display: 'block', marginTop: '5px'}}>Promocion</span>
                <Switch
                    checked={checked}
                    onChange={handleChange}
                    inputProps={{ 'aria-label': 'controlled' }}
                />
            </div>
            

            <label style={{display: 'block', marginTop: '10px'}}>Contacto</label>
            <input type='number' placeholder='E.j: 3834213594' name='celular'/>


        </div>

        <div className='precio-final'>
            <label>Precio Final</label>
            <input type='number' placeholder='E.j: 50' name='celular'/>
            <input type='submit' value='GUARDAR'/>
        </div>
 


    </form>


  );
}


export default Configmenu;
