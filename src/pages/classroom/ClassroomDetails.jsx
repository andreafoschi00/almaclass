import React from 'react';

import classroomData from '../../data/ClassroomData';
import './classroomDetails.css';

import { MdOutlineDone, MdError } from 'react-icons/md';
import { AiOutlineWarning } from 'react-icons/ai';

const ClassroomDetails = () => {
    const id = new URLSearchParams(window.location.search).get('id');
    const classroom = classroomData.find(x => x.id === id);
    let displayFirst, displaySecond, displayThird;
    return (
        <div className='classroom_details_container'>
            <h1 className='classroom_details_title'>{classroom.luogo}</h1>
            <h2 className='classroom_details_description'>{classroom.dettagli}</h2>
            <h3 className='classroom_details_capacity'>Capienza: {classroom.capienza}</h3>
            <div className='classroom_details_table_container'>
                <table>
                    <thead>
                        <tr>
                            <th className='classroom_details_table_days'>Giorno</th>
                            <th className='classroom_details_table_times'>Orario</th>
                            <th className='classroom_details_table_teachings'>Insegnamento</th>
                            <th className='classroom_details_table_attendances'>Presenze</th>
                            <th className='classroom_details_table_status'>Stato</th>
                        </tr>
                    </thead>
                    <tbody>
                        {classroom.corsi.map((course, i) => {
                            switch(course.stato){ case 'ok': displayFirst = 'inline'; displaySecond = 'none'; displayThird = 'none'; break;
                                case 'attenzione': displayFirst = 'none'; displaySecond = 'inline'; displayThird = 'none'; break;
                                case 'anomalia': displayFirst = 'none'; displaySecond = 'none'; displayThird = 'inline'; break; 
                                default: displayFirst = 'none'; displaySecond = 'none'; displayThird = 'none'; break; }
                            return (
                                <tr key={i}>
                                    <td>{course.giorno}</td>
                                    <td>{course.orario}</td>
                                    <td>{course.insegnamento}</td>
                                    <td>{course.presenze}</td>
                                    <td><MdOutlineDone color='green' display={displayFirst} /><AiOutlineWarning color='orange' display={displaySecond}/><MdError color='red' display={displayThird}/></td>
                                </tr>
                            )})}
                    </tbody>
                </table>
            </div>
            <div className='classroom_details_buttons'>
                <button>Statistiche</button>
                <button>Mappa</button>
            </div>
        </div>
    )
}

export default ClassroomDetails