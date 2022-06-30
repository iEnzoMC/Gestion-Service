import 'animate.css';
import { LSConnection } from '../helper/LSConnection';
import { isElementOfType } from 'react-dom/test-utils';
import { Skeleton, Stack } from '@mui/material';
import Test from './Test';
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

function MenuViewerComponent() {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

    const categoriaGeneral = LSConnection('GET', 'categoriaGeneral')

    console.log(categoriaGeneral)

  return (

    <>

    <div className='articuloMenuContenedor'>

    {Array.isArray(categoriaGeneral) &&
    
    categoriaGeneral.map((element, i) => (
      <div key={i}>
        <h1>{element.name}</h1>
        {element.datos.map((datos, j) => (
            <article key={j} className='articuloMenu'>
              <Card sx={{ maxWidth: 345 }}>
                  <CardMedia
                    component="img"
                    height="194"
                    image={datos.urlImg}
                    alt="Imagen del menu"
                  />
                  <CardContent  className="card-articles">
                    <Typography variant="body2" color="text.secondary">
                      <div className='card-names'>
                      {datos.title.length > 0 &&
                      datos.title.map((nombres, k) =>                         
                          <span key={k} >● {nombres}</span>
                      )}
                      </div>
                      <h1 className="card-h1">Informacion</h1>
                      <span className="card-info">{datos.info}</span>
                      <span className='card-price'>${datos.price}</span>
                    </Typography>
                  </CardContent>
                  <CardActions className='card-footer' disableSpacing>
                    <IconButton aria-label="add to favorites">
                    <Stack direction="row" spacing={1}>
                    <IconButton color="primary" aria-label="add to shopping cart">
                    <AddShoppingCartIcon />
                  </IconButton>
                  </Stack>
                    </IconButton>
                    <ExpandMore
                      expand={expanded}
                      onClick={handleExpandClick}
                      aria-expanded={expanded}
                      aria-label="show more"
                    >
                      <ExpandMoreIcon />
                    </ExpandMore>
                  </CardActions>
                  <Collapse in={expanded} timeout="auto" unmountOnExit>
                    <CardContent>
                      <Typography paragraph>Method:</Typography>
                      <Typography paragraph>
                        Heat 1/2 cup of the broth in a pot until simmering, add saffron and set
                        aside for 10 minutes.
                      </Typography>
                      <Typography paragraph>
                        Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet over
                        medium-high heat. Add chicken, shrimp and chorizo, and cook, stirring
                        occasionally until lightly browned, 6 to 8 minutes. Transfer shrimp to a
                        large plate and set aside, leaving chicken and chorizo in the pan. Add
                        pimentón, bay leaves, garlic, tomatoes, onion, salt and pepper, and cook,
                        stirring often until thickened and fragrant, about 10 minutes. Add
                        saffron broth and remaining 4 1/2 cups chicken broth; bring to a boil.
                      </Typography>
                      <Typography paragraph>
                        Add rice and stir very gently to distribute. Top with artichokes and
                        peppers, and cook without stirring, until most of the liquid is absorbed,
                        15 to 18 minutes. Reduce heat to medium-low, add reserved shrimp and
                        mussels, tucking them down into the rice, and cook again without
                        stirring, until mussels have opened and rice is just tender, 5 to 7
                        minutes more. (Discard any mussels that don&apos;t open.)
                      </Typography>
                      <Typography>
                        Set aside off of the heat to let rest for 10 minutes, and then serve.
                      </Typography>
                    </CardContent>
                  </Collapse>
                </Card>
{/*                 {datos.title.length > 0 &&
                datos.title.map((nombres, k) =>
                    <h2 key={k}>{nombres}</h2>
                )} */}
            </article>
        ))}
      </div>
    ))}

    
  </div>

  <div className='category-footer'>
      {Array.isArray(categoriaGeneral) &&
      categoriaGeneral.map((nombres, k) =>
            <div key={k} >        
              <h3>CONTACTO</h3>      
              <span>{nombres.cel}</span>
            </div>
        )}
    </div>

  </>

  );

}

export default MenuViewerComponent;


// VER LOS NAMES PARA GUARDARLOS EN LAS CATEGORIAS
// TU HERMANA ME LA MAMA EN LA CAMA 
