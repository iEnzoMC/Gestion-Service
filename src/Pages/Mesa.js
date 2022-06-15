import {React} from 'react'
import 'animate.css';
import { Link, useParams } from 'react-router-dom';
function Mesa() {

    const { id } = useParams();

  return (

    <div>
      <h1>This is the mesa page</h1>
      <h2>DATO: {id}</h2>
      <Link to="/">Inicio</Link>
    </div>


  );
}

export default Mesa;
