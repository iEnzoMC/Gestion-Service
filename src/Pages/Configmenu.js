import {React, useEffect, useState} from 'react'
import 'animate.css';
import AddIcon from '@mui/icons-material/Add';
import Fab from '@mui/material/Fab';
import Button from '@mui/material/Button';
import Switch from '@mui/material/Switch';
import { LSConnection } from '../helper/LSConnection';
import TextField from '@mui/material/TextField';
import Casos from '../helper/Casos';

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
        e.preventDefault();
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


    <div className='fondoConfigMenu contenerConfigMenu'>
        <form className='formularioConfigMenu'>

            <label>Nombre</label>
            <div className='divisionConfigMenu'>
                <div>
                    <input className='hoverConfigMenu' type='text' placeholder='E.j: Pizza' name='name' />
                    <Fab color="primary" aria-label="add" className='iconaddConfigMenu'>
                        <AddIcon onClick={e => handleAddName(e)}/>
                    </Fab>
                </div>               
                {names !== false &&
               
                names.map((element, i) =>{
                    return(
                    <div className='testt' key={element}>
                        <input className='hoverConfigMenu' type='text' placeholder={"E.j Pizza "+(i+1)} name={"name"+i} />
                        <Button name={element} onClick={e => handleRemoveName(e)} variant="outlined" color="error" className='botonEliminarConfigMenu'>
                            Eliminar
                        </Button>
                    </div>
                    )         
                })
                
                
                }
                
             </div>

            <div className='divisionConfigMenu'>
             <label>Espesificaciones</label>
             <textarea className='hoverConfigMenu' type='text' placeholder='Muzarela 8 porciones'  name='info'/>
            </div>

            <div className='divisionConfigMenu'>
                <label>Crear / Agregar Categoria</label>
                
                <div onSubmit={e => handleCrearCategoria(e)} id='tasd'>
                    <TextField id="standard-basic" label="Crear" variant="standard" onChange={e => handleCategory(e)} />
                    <Button variant="outlined" color="success" className='botonCrearConfigMenu' onClick={e => handleCrearCategoria()}>
                        CREAR
                    </Button>
                </div>


                
                    {Array.isArray(categorias) &&
                    categorias.map(element =>{
                        return(
                            <div key={element.name} className='categorias-divisionConfigMenu'>
                                <span>{element.name}</span>
                                <Casos
                                    objeto={element}
                                    setNames={setNames}
                                    names={names}
                                />
                                <Button name={element.name} onClick={e => handleRemoveCategory(e)} variant="outlined" color="error" className='botonEliminarConfigMenu'>
                                    Eliminar
                                </Button>
                            </div>
                        )
                    })
                 }
                

            </div>

            <div className='divisionConfigMenu'>
                <label>Precio Final</label>
                <input className='hoverConfigMenu' type='number' placeholder='50$'  name='price'/>
            </div>

            <input type="submit" value='Agregar' />



        </form>
    </div>


  );
}

export default Configmenu;
