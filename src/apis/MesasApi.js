import axios from 'axios'

export const registerMesa = async (arrayFalsa) => {
    for (let index = 0; index < mesas.length; index++) {
     const element = mesas[index];
   await axios.post('http://localhost:4000/api/mesas/new/table', {id: element.id, number: element.number, url: element.url})
         .then(result =>{
             console.log(result)
         })
         .catch(e => {console.log(e)})
   }
 } 

export const eliminarTodasMesa = async () => {

    for (let index = 0; index < mesasDelBack.length; index++) {
     const element = mesasDelBack[index];
   await axios.put('http://localhost:4000/api/mesas/delete/table', {id: element.id, number: element.number, url: element.url})
         .then(result =>{
             console.log(result)
             traerMesas()
         })
         .catch(e => {console.log(e)})
   }
 } 

 export  const traerMesas = async () => {
    await axios.get('http://localhost:4000/api/mesas/get/table')
          .then(result =>{
              setMesasDelBack( result.data.data)
          })
          .catch(e => {console.log(e)})
  } 