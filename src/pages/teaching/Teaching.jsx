import React from 'react';
import './teaching.css';

import teachingData from '../../data/TeachingData';
import { Link } from 'react-router-dom';

const teaching = teachingData.map((teaching) => <li key={teaching.id}><Link to={'/teaching/details/?id=' + teaching.id}>{teaching.nome}</Link></li>);

const Teaching = () => {
  return (
    <>
    <div className='teaching_container_list'>
      <div className='teaching_container'>
        <h1 className='teaching_title'>Insegnamenti</h1>
        <ul className='teaching_list'>{teaching}</ul>
      </div>
    </div>
    </>
  );
}

export default Teaching