import React from 'react';

import classroomData from '../../data/ClassroomData';
import './classroomDetails.css';

import { MdOutlineDone, MdError } from 'react-icons/md';
import { AiOutlineWarning } from 'react-icons/ai';
import { Link } from 'react-router-dom';

class ClassroomDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          id: new URLSearchParams(window.location.search).get('id'),
          error: null,
          isLoaded: false,
          items: []
        }
    }

      componentDidMount() {
        fetch("/api/classroom/details/?id="+this.state.id, {
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
        const classroom = items[0];

        if (error) {
          return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
          return <div>Loading...</div>;
        } else if (!classroom) {
          return <div>Error: no classroom found</div>
        } else {
            return (
                <div className='classroom_details_container'>
                    <h1 className='classroom_details_title'>{classroom.aula_nome}</h1>
                    <h2 className='classroom_details_description'>{classroom.aula_indirizzo} - {classroom.aula_piano}</h2>
                    <h3 className='classroom_details_capacity'>Capienza: 100</h3>
                    <div className='classroom_details_table_container'>
                        {/*<table>
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
                                            <td><Link className='toTeaching' to={'/teaching/details/?id=' + course.idInsegnamento}>{course.insegnamento}</Link></td>
                                            <td>{course.presenze}</td>
                                            <td><MdOutlineDone color='green' display={displayFirst} /><AiOutlineWarning color='orange' display={displaySecond}/><MdError color='red' display={displayThird}/></td>
                                        </tr>
                                    )})}
                            </tbody>
                        </table>*/}
                    </div>
                    <div className='classroom_details_buttons'>
                        <button>Statistiche</button>
                        <button>Mappa</button>
                    </div>
                </div>
            )
        }
    }
}

export default ClassroomDetails