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
import MenuViewerComponent from '../Components/MenuViewerComponent';
import { Alert, Stack } from '@mui/material';
import { Completed } from '../helper/Completed';

function Configmenu({setError, error, setErrorMessage, errorMessage}) {

    const [categorias, setCategorias] = useState(true)
    const [categoriaGeneral, setCategoriaGeneral] = useState(false)
    const [category, setCategory] = useState(false)
    const [newName, setNewName] = useState('nada')
    const [names, setNames] = useState(false)
    const [completed, setCompleted] = useState(false)
    const [completedMessage, setCompletedMessage] = useState('Has completado la operacion exitosamente')
    

    const handleNewName = e =>{
        let newname = e.target.value
        setNewName(newname)
    }

    useEffect(()=>{
        let baseDatos = LSConnection("GET", "categoriaGeneral")
        Array.isArray(baseDatos) && setCategoriaGeneral(baseDatos)
        console.log(baseDatos);
    }, [])

    useEffect(()=>{
        let allCategorias = categorias

        if(Array.isArray(allCategorias)) {

            allCategorias.forEach(element =>{
            element.datos = names
            })

            console.log(allCategorias);
        }

    }, [names])

    useEffect(() =>{
        console.log(categorias)
    }, [categorias])


    const handleAddName = e =>{
        let key = new Date().getTime()

        if(names.length > 0){


            if(names.includes(newName)){
                setError(true) 
                setErrorMessage('Ese nombre ya fue agregado')
                return;
            }
            setNames(element =>{
                return[...element, newName.toLowerCase()]
            })
        }else{
            setNames([newName.toLowerCase()])
        }
    }

    const handleRemoveName = e =>{
        e.preventDefault();

        console.log(e.target.name);


        let name = e.target.name;
        
        let filter = names.filter(x=> x !== name);

        setNames(filter)

    }

    const handleCrearCategoria = e =>{

        let baseDato = LSConnection("GET", "categoriaGeneral")
        let json = {
            name: category,
            datos: [],
            cel: ''

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
                setCategoriaGeneral(elemento =>{
                    return[...elemento, json]
                })
                LSConnection("SAVE", "categoriaGeneral", json)
            }
            
        }else{
            console.log("Categoria creada "+category);
            setCategoriaGeneral([json])
            LSConnection("SAVE", "categoriaGeneral", json)
        }
    }

    const handleCategory = e =>{
        let valor = e.target.value
        setCategory(valor.toLowerCase())

    }

    const handleRemoveCategory = e =>{
        console.log(e.target.name);
        e.preventDefault()

        let name = e.target.name

        let element = categoriaGeneral.filter(x => x.name !== name)
        let element2 = false
        Array.isArray(categorias) ? element2 = categorias.filter(x => x.name !== name) :
        LSConnection("SAVE.STATIC", "categoriaGeneral", element)
        setCategoriaGeneral(element)
        setCategorias(element2)
    }

    const handleSubmit = e =>{
        e.preventDefault();

        // Obtenemos todos los datos de campos

        let target = e.target

        // names > contiene los nombres del menu
        let info = target.info.value;
        // categorias > contiene las categorias a las cual se van a asignar
        let cel = target.celular.value;
        let price = target.price.value;
        let urlImg = target.urlImg.value;

        // Comprobamos si hay categorias asignadas
        
        let baseDatos = LSConnection("GET", "categoriaGeneral")

        let objectName = {
            title: names,
            info: info,
            price: price,
            cel: cel,
            urlImg: urlImg
            
        }

        if(!Array.isArray(categorias) || !Array.isArray(names) || names.length <= 0 || price === "" || categorias.length <= 0 || names.length <= 0){
            setError(true)

            !Array.isArray(categorias) ? setErrorMessage('Por favor seleciona o crea una categoria.') : setErrorMessage('Por favor agrega un Nombre.')

            names.length <= 0 && setErrorMessage('Por favor coloca un Nombre')
            price === "" && setErrorMessage('Por favor coloca un precio')

            categorias <= 0 && setErrorMessage('Por favor seleciona o crea una categoria.')
            names <= 0 && setErrorMessage('Por favor agrega un Nombre.')
            return;
        }

        console.log(names)
        
        if(Array.isArray(baseDatos)){
            //Entonces si contiene categorias, vamos a agregar o colocar
            // los names a las categorias general
            let baseDatosGeneral = LSConnection("GET", "categoriaGeneral")

            if(Array.isArray(baseDatosGeneral)){
                categorias.forEach(element => {
                    
                    let encontrada = baseDatosGeneral.filter(x => x.name === element.name);
                    if(encontrada.length > 0){
                        encontrada[0].datos.push(objectName)
                        encontrada[0].cel = cel
                        let eliminar = baseDatosGeneral.filter( x => x.name !== element.name)
                        eliminar.push(encontrada[0])
                        LSConnection('SAVE.STATIC', 'categoriaGeneral', eliminar)
                    }

                });
            }else{
                let newCategorias = [];

                categorias.forEach(element =>{
                    let newObjet = {
                        name: element.name,
                        datos: element.datos,
                        info: info,
                        cel: cel,
                        price: price,
                        urlImg: urlImg
                    }

                    newCategorias.push(newObjet)
                })

                LSConnection('SAVE.STATIC', 'categoriaGeneral', newCategorias)
                console.log(newCategorias)

            }

            setCompleted(true)
            setCompletedMessage('El menu se registro correctamente.')

        }

    }



  return (

    <>
    <form onSubmit={e => handleSubmit(e)} className='formulario-menu'>

        <div className='nombre-y-espesificacion'>
        
            <label>Nombre(*)</label>
            <input onChange={e => handleNewName(e)} type='text' placeholder='E.j: Muzza' name='nombre'/>
            <Fab color="primary" aria-label="add">
            <AddIcon onClick={e => handleAddName(e)} />
            </Fab>
            <div>
            {
                Array.isArray(names) &&
                names.map(element => {

                    return (
                        <div key={element} style={{marginBottom: '4px'}}>
                            <span style={{color: 'white', marginRight: '10px'}}>- {element}</span>
                            <button onClick={e => handleRemoveName(e)} name={element} style={{color: 'red', background: 'black', cursor: 'pointer'}}>X</button>
                        </div>
                    )
                })
            }
            </div>

            <label>Espesificaciones(*)</label>
            <textarea type='text' placeholder='E.j: Muzza de 10 porciones' name='info'/>

            <label style={{display:'block'}}>Imagen URL</label>
            <input type='text' name='urlImg'/>

        
        </div>
        
        <div className='crear-y-agregar'>

            <label>Crear / Agregar Categoria(*)</label>

            <div className='crear-y-agregar-unirInput'>
                <TextField onChange={e => handleCategory(e)} id="standard-basic" variant="standard" />     
                <Button onClick={e => handleCrearCategoria(e)} style={{marginLeft: '5px', width: '20px'}} variant="contained" color="success">
                    Crear
                </Button>
            </div>

            <div className='crear-y-agregar-unirPromocion'>
            <div>
            {Array.isArray(categoriaGeneral) &&
                    categoriaGeneral.map(element => {
                        return(
                            <div key={element.name}>
                                
                                <div style={{display: 'flex', flexDirection:'row', alignItems: 'center', marginBottom:'10px'}}>
                                    <span style={{display: 'block', marginTop: '5px'}}>{element.name}</span>
                                    <Casos 
                                        objeto={element}
                                        setNames={setNames}
                                        names={names}
                                        setCategorias={setCategorias}
                                        categorias={categorias}
                                    />
                                    <button onClick={e => handleRemoveCategory(e)} name={element.name} style={{color: 'red', background: 'black', cursor: 'pointer'}}>X</button>
                                </div>
                            </div>
                        )

                    })
                }
                </div>

            </div>
            

            <label style={{display: 'block', marginTop: '10px'}}>Contacto</label>
            <input type='number' placeholder='E.j: 3834213594' name='celular'/>


        </div>

        <div className='precio-final'>
            <label>Precio Final</label>
            <input type='number' placeholder='E.j: 50' name='price'/>
            <input type='submit' value='GUARDAR'/>
        </div>
 


    </form>

    <MenuViewerComponent
        setCategoriaGeneral={setCategoriaGeneral}
        categoriaGeneral={categoriaGeneral}

    />
    <Completed
        
        setCompleted={setCompleted}
        completed={completed}
        
        setCompletedMessage={setCompletedMessage}
        completedMessage={completedMessage}
    
    />

    </>

  );
}


export default Configmenu;
