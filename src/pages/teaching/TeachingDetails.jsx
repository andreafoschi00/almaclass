import React from 'react';
import './teachingDetails.css';

import { MdOutlineDone, MdError } from 'react-icons/md';
import { AiOutlineWarning } from 'react-icons/ai';
import { Link } from 'react-router-dom';

class TeachingDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          componente_id: new URLSearchParams(window.location.search).get('componente_id'),
          error: null,
          isLoaded: false,
          items: []
        }
    }

    componentDidMount() {
        fetch("/api/teachings/details/?componente_id="+this.state.componente_id, {
          method: 'GET',
          headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            }
        })
          .then(res => res.json())
          .then(
            (result) => {
              this.setState({
                isLoaded: true,
                items: result.body.result.records
              });
            },
            (error) => {
              this.setState({
                isLoaded: true,
                error
              });
            }
          )
    }

    render() {
        let displayFirst, displaySecond, displayThird;
        const { error, isLoaded, items } = this.state;
        const teaching = items[0];

        if (error) {
            return <div>Error: {error.message}</div>;
          } else if (!isLoaded) {
            return <div>Loading...</div>;
          } else if (!teaching) {
            return <div>Error: no teaching found</div>
          } else {
            return (
                <div className='teaching_details_container'>
                <h1 className='teaching_details_name'>{teaching.materia_descrizione}</h1>
                <h1 className='teaching_details_course'>Corso: <Link className='toCourse' to={'/course/details/?corso_codice=' + teaching.corso_codice}>{teaching.corso_descrizione}</Link></h1>
                <h2 className='teaching_details_teachers'>Docente: {teaching.docente_nome}</h2>
                <h3 className='teaching_details_language'>Lingua: {teaching.lingua}</h3>
                <div className='teaching_details_table_container'>
                    {/*<table>
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
                                </table>*/}
                </div>
                <div className='teaching_details_buttons'>
                    <button>Statistiche Aule</button>
                    <button>Statistiche Insegnamento</button>
                </div>
            </div>
            )
        }
    }
}

export default TeachingDetails