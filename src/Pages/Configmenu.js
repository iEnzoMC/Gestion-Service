import {React, useEffect, useState} from 'react'
import 'animate.css';
import AddIcon from '@mui/icons-material/Add';
import Fab from '@mui/material/Fab';
import Button from '@mui/material/Button';
import Switch from '@mui/material/Switch';
function Configmenu() {



    const [checked, setChecked] = useState(false)

    const handleChange = (event) => {
        let check = event.target.checked
      setChecked(check);
      console.log(check)
    };

    const [names, setNames] = useState(false)
    useEffect(()=>{
        console.log(names)
    }, [names])

    const handleAddName = e =>{
        e.preventDefault();
        if(names !== false){
            setNames(element =>{
                return[...element, 1]
            })
        }else{
            setNames([1])
        }
    }

    const handleRemoveName = e =>{
        e.preventDefault();


        console.log(names.pop())
        // TERMINAR EL BOTON ELIMINAR

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
                    <div className='testt'>
                        <input key={element+i} className='hoverConfigMenu' type='text' placeholder='E.j: Pizza' name={"name"+i} />
                        <Button key={element+i+1} onClick={e => handleRemoveName(e)} variant="outlined" color="error" className='botonEliminarConfigMenu'>
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
                <label>Agregar a Categoria Promocion</label>
                <Switch
                checked={checked}
                onChange={handleChange}
                inputProps={{ 'aria-label': 'controlled' }}
                />
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
