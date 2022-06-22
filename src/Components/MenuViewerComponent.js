import {React, useEffect, useState} from 'react'
import 'animate.css';
import { LSConnection } from '../helper/LSConnection';
import { isElementOfType } from 'react-dom/test-utils';
function MenuViewerComponent() {

    const categoriaGeneral = LSConnection('GET', 'categoriaGeneral')

    console.log(categoriaGeneral)

  return (

    <div className='articuloMenuContenedor'>
    {Array.isArray(categoriaGeneral) &&
    
    categoriaGeneral.map((element, i) => (
      <div key={i}>
        <h1>{element.name}</h1>
        {element.datos.map((datos, j) => (
            <article key={j} className='articuloMenu'>
                <h2>{datos.info}</h2>
                {datos.title.length > 0 &&
                datos.title.map((nombres, k) =>
                    <h2 key={k}>{nombres}</h2>
                )}
                <h2>{datos.price}</h2>
            </article>
        ))}
      </div>
    ))}
  </div>

  );

}

export default MenuViewerComponent;


// VER LOS NAMES PARA GUARDARLOS EN LAS CATEGORIAS
