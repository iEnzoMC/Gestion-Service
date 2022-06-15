export const LSConnection = (flag, key, element) => {


    const dato = flag.toUpperCase();

    const errors = () =>{
        console.log(`El item [${key}] no se encontro en el LocalStorage`);
    }
    

    if(dato === "SAVE"){
        // GUARDAR DATOS EN BASE DE DATOS
        let baseDatos = JSON.parse(localStorage.getItem(key));

        if(Array.isArray(baseDatos)){
            baseDatos.push(element)
        }else{

            baseDatos = [element];    
        }

        localStorage.setItem(key, JSON.stringify(baseDatos))



    }else if(dato === "GET"){
        // DEVOLVER DATOS DE BASE DE DATOS
        let baseDatos = JSON.parse(localStorage.getItem(key));
        if(baseDatos === null ||  baseDatos === 'undefined'){
            return errors();
        }
        return baseDatos;
    }else if(dato === "SAVE.STATIC"){
        localStorage.setItem(key, JSON.stringify(element))
    }
}
