import React from 'react';
import './classroom.css';

import classroomData from '../../data/ClassroomData';

const classes = classroomData.filter((classroom) => classroom.tipo === "aula").map((classroom) => <li key={classroom.luogo}><a href='/clasroom/specific'>{classroom.luogo}</a></li>);
const laboratories = classroomData.filter((classroom) => classroom.tipo === "lab").map((classroom) => <li key={classroom.luogo}><a href='/classroom/specific'>{classroom.luogo}</a></li>);

const Classroom = () => {
  return (
    <>
    <div className='classroom_container_list'>
      <div className='classroom_container'>
        <h1 className='classroom_title'>Aule</h1>
        <ul className='classroom_list'>{classes}</ul>
      </div>
      <div className='laboratory_container'>
        <h1 className='laboratory_title'>Laboratori</h1>
        <ul className='laboratory_list'>{laboratories}</ul>
      </div>
    </div>
    </>
  );
}

export default Classroom