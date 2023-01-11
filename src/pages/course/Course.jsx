import React from 'react';
import './course.css';

import courseData from '../../data/CourseData';
import { Link } from 'react-router-dom';

const courses = courseData.map((course) => <li key={course.id}><Link to={'/course/details/?id=' + course.id}>{course.nome}</Link></li>);

const Course = () => {
  return (
    <>
    <div className='course_container_list'>
      <div className='course_container'>
        <h1 className='course_title'>Corsi</h1>
        <ul className='course_list'>{courses}</ul>
      </div>
    </div>
    </>
  );
}

export default Course