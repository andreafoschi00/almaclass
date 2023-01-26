import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

import { MdOutlineDone, MdError } from 'react-icons/md';
import { AiOutlineWarning } from 'react-icons/ai';
import { Link } from 'react-router-dom';

import './basiccard.css';

const BasicCard = props => {
  let textColor, displayFirst, displaySecond, displayThird;
  switch(props.props.stato){
    case 'ok':
      textColor = 'green';
      displayFirst = 'inline'; displaySecond = 'none'; displayThird = 'none';
      break;
    case 'attenzione':
      textColor = 'orange';
      displayFirst = 'none'; displaySecond = 'inline'; displayThird = 'none';
      break;
    case 'anomalia':
      textColor = 'red';
      displayFirst = 'none'; displaySecond = 'none'; displayThird = 'inline';
      break;
    default:
      textColor = 'grey';
      displayFirst = 'none'; displaySecond = 'none'; displayThird = 'none';
      break;
  }

  const dateFormat = new Date(props.props.inizio);
  const dateFormat2 = new Date(props.props.fine);
  const ora_inizio = dateFormat.getHours()+":"+String(dateFormat.getMinutes()).padStart(2, '0');
  const ora_fine = dateFormat2.getHours()+":"+String(dateFormat.getMinutes()).padStart(2, '0');

  let font_aula;
  if(props.props.aula_nome.length > 16) {
    font_aula = 24;
  } else {
    font_aula = 32;
  }
  
  return (
    <Card sx={{ 
      width: {sm: 300, md: 320}, 
      height: {sm: 300, md: 320},
      }}>
      <CardContent>
        <Typography component="span" sx={{ fontSize: {xs: font_aula-6, md:font_aula} }} color="black" gutterBottom>
        <Link className='toClassroom' to={'/classroom/details/?aula_codice=' + props.props.aula_codice}>{props.props.aula_nome}</Link>
          <Typography sx={{ float: 'right', fontSize: {xs: 25, md: 50}}}>
            <MdOutlineDone color='green' display={displayFirst} />
            <AiOutlineWarning color='orange' display={displaySecond}/>
            <MdError color='red' display={displayThird}/>
          </Typography>
        </Typography>
        <Typography sx={{ fontSize: {xs: 12, md:14} }}>
          {props.props.componente_id === 0 ? <Typography color="text.secondary">{props.props.materia_descrizione}</Typography> : <Link className='toTeaching' to={'/teaching/details/?componente_id=' + props.props.componente_id}>{props.props.materia_descrizione}</Link>
          }
        </Typography>
        {props.props.inizio === '' && props.props.fine === '' ? <br /> : <Typography color="text.secondary">
          Orario: {ora_inizio} - {ora_fine}
        </Typography>
        }
        <Typography component="span" sx={{ display: 'flex', textAlign:'center', justifyContent:'center', gap: 3}}>
          <Typography component="span" sx={{display: 'flex', flexDirection: 'column', mt: 2.5}}>
            <Typography sx={{fontSize: {xs: 15, md: 20} }}>
              Capienza
            </Typography>
            <Typography sx={{ fontSize: {xs: 35, md: 40}}}>
              {props.props.capienza_aula}
            </Typography>
          </Typography>
          <Typography component="span" sx={{fontSize: {xs: 75, md: 100}}}>
            |
          </Typography>
          <Typography component="span" sx={{display: 'flex', flexDirection: 'column', mt: 2.5}} color={textColor}>
            <Typography sx={{fontSize: {xs: 15, md: 20} }}>
              Presenze
            </Typography>
            <Typography sx={{ fontSize: {xs: 35, md: 40} }}>
              {/*props.props.presenze*/}0
            </Typography>
          </Typography>
        </Typography>
        <Typography sx={{ fontSize: {xs: 12, md: 16}, textAlign: 'center'}} color='text.secondary'>
            Ultimo aggiornamento: {props.props.aggiornamento}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default BasicCard