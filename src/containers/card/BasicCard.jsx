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
      textColor = 'white';
      displayFirst = 'none'; displaySecond = 'none'; displayThird = 'none';
      break;
  }

  return (
    <Card sx={{ 
      width: {sm: 300, md: 320}, 
      height: {sm: 300, md: 320}, 
      }}>
      <CardContent>
        <Typography component="span" sx={{ fontSize: {xs: 26, md:32} }} color="black" gutterBottom>
        <Link className='toClassroom' to={'/classroom/details/?id=' + props.props.idLuogo}>{props.props.luogo}</Link>
          <Typography sx={{ float: 'right', fontSize: {xs: 25, md: 50}}}>
            <MdOutlineDone color='green' display={displayFirst} />
            <AiOutlineWarning color='orange' display={displaySecond}/>
            <MdError color='red' display={displayThird}/>
          </Typography>
        </Typography>
        <Typography sx={{ fontSize: {xs: 18, md:26}}}>
          {props.props.insegnamento}
        </Typography>
        <Typography color="text.secondary">
          Orario: {props.props.orario}
        </Typography>
        <Typography component="span" sx={{ display: 'flex', textAlign:'center', justifyContent:'center', gap: 3}}>
          <Typography component="span" sx={{display: 'flex', flexDirection: 'column', mt: 2.5}}>
            <Typography sx={{fontSize: {xs: 15, md: 20} }}>
              Capienza
            </Typography>
            <Typography sx={{ fontSize: {xs: 35, md: 40}}}>
              {props.props.capienza}
            </Typography>
          </Typography>
          <Typography component="span" sx={{fontSize: {xs: 75, md: 100}}}>
            |
          </Typography>
          <Typography component="span" sx={{display: 'flex', flexDirection: 'column', mt: 2.5}} color={textColor}>
            <Typography sx={{fontSize: {xs: 15, md: 20} }}>
              Presenze
            </Typography>
            <Typography sx={{ fontSize: {xs: 35, md: 40}}}>
              {props.props.presenze}
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