import React from 'react';
import courseData from '../../data/CourseData';
import './courseDetails.css';

import { Link } from 'react-router-dom';

const CourseDetails = () => {
    const id = new URLSearchParams(window.location.search).get('id');
    const course = courseData.find(x => x.id === id);
    return (
        <div className='course_details_container'>
            <h1 className='course_details_name'>{course.nome}</h1>
            <h2 className='course_details_type'>Tipo di corso: {course.tipo}</h2>
            <h3 className='course_details_department'>Dipartimento: {course.dipartimento}</h3>
            <h3 className='course_details_coordinator'>Coordinatore: {course.coordinatore}</h3>
            <h3 className='course_details_language'>Lingua: {course.lingua}</h3>
            <div className='course_details_table_container'>
                <table>
                    <thead>
                        <tr>
                            <th className='course_details_table_name'>Nome</th>
                            <th className='course_details_table_period'>Periodo</th>
                            <th className='course_details_table_teachers'>Docenti</th>
                        </tr>
                    </thead>
                    <tbody>
                        {course.insegnamenti.map((insegnamento, i) => {
                            return (
                                <tr key={i}>
                                    <td><Link className='toTeaching' to={'/teaching/details/?id=' + insegnamento.idInsegnamento}>{insegnamento.nome}</Link></td>
                                    <td>{insegnamento.periodo}</td>
                                    <td>{insegnamento.docenti}</td>
                                </tr>
                            )})}
                    </tbody>
                </table>
            </div>
            <div className='course_details_buttons'>
                <button>Statistiche Corso</button>
            </div>
        </div>
    )
}

export default CourseDetails