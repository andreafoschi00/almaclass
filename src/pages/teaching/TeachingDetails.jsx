import React from 'react';

import teachingData from '../../data/TeachingData';
import './teachingDetails.css';

import { MdOutlineDone, MdError } from 'react-icons/md';
import { AiOutlineWarning } from 'react-icons/ai';
import { Link } from 'react-router-dom';

const TeachingDetails = () => {
    const id = new URLSearchParams(window.location.search).get('id');
    const teaching = teachingData.find(x => x.id === id);
    let displayFirst, displaySecond, displayThird;
    return (
        <div className='teaching_details_container'>
            <h1 className='teaching_details_name'>{teaching.nome}</h1>
            <h1 className='teaching_details_course'>Corso: {teaching.corso}</h1>
            <h2 className='teaching_details_teachers'>Docenti: {teaching.docenti}</h2>
            <h3 className='teaching_details_dates'>Periodo di svolgimento: {teaching.periodo}</h3>
            <div className='teaching_details_table_container'>
                <table>
                    <thead>
                        <tr>
                            <th className='teaching_details_table_dates'>Data</th>
                            <th className='teaching_details_table_times'>Orario</th>
                            <th className='teaching_details_table_classrooms'>Luogo</th>
                            <th className='teaching_details_table_attendances'>Presenze</th>
                            <th className='teaching_details_table_status'>Stato</th>
                        </tr>
                    </thead>
                    <tbody>
                        {teaching.aule.map((classroom, i) => {
                            switch(classroom.stato){ case 'ok': displayFirst = 'inline'; displaySecond = 'none'; displayThird = 'none'; break;
                                case 'attenzione': displayFirst = 'none'; displaySecond = 'inline'; displayThird = 'none'; break;
                                case 'anomalia': displayFirst = 'none'; displaySecond = 'none'; displayThird = 'inline'; break; 
                                default: displayFirst = 'none'; displaySecond = 'none'; displayThird = 'none'; break; }
                            return (
                                <tr key={i}>
                                    <td>{classroom.giorno}</td>
                                    <td>{classroom.orario}</td>
                                    <td><Link className='toClassroom' to={'/classroom/details/?id=' + classroom.idLuogo}>{classroom.luogo}</Link></td>
                                    <td>{classroom.presenze}</td>
                                    <td><MdOutlineDone color='green' display={displayFirst} /><AiOutlineWarning color='orange' display={displaySecond}/><MdError color='red' display={displayThird}/></td>
                                </tr>
                            )})}
                    </tbody>
                </table>
            </div>
            <div className='teaching_details_buttons'>
                <button>Statistiche Aule</button>
                <button>Statistiche Insegnamento</button>
            </div>
        </div>
    )
}

export default TeachingDetails