import React from 'react';

import classroomData from '../../data/ClassroomData';
import './classroomDetails.css';

import { MdOutlineDone, MdError } from 'react-icons/md';
import { AiOutlineWarning } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { TextField } from '@mui/material';

class ClassroomDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          aula_codice: new URLSearchParams(window.location.search).get('aula_codice'),
          error: null,
          isLoaded: false,
          items: [],
          teachings: [],
          classroomLocal: [],
          searchText: ''
        }
    }

    inputHandler = (e) => {
      let lowerCaseText = e.target.value.toLowerCase();
      this.setState({ searchText: lowerCaseText });
    }

      componentDidMount() {
        fetch(`/api/classroom/details/?aula_codice=${this.state.aula_codice}`, {
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
          );
          fetch(`/api/classroom/allteachingsinclassroom/?aula_codice=${this.state.aula_codice}`, {
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
                  teachings: result.body.result.records,
                });
              },
              (error) => {
                this.setState({
                  isLoaded: true,
                  error
                });
              }
            );
            fetch(`http://localhost:5000/classroom/${this.state.aula_codice}`, {
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
                    classroomLocal: result,
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
        const { error, isLoaded, items, teachings, classroomLocal, searchText } = this.state;
        const classroom = items[0];

        const filteredTeachings = teachings.filter((el) => {
          if (searchText === '') {
            return el;
          }
          else {
            return el.inizio.toLowerCase().includes(searchText) || el.fine.toLowerCase().includes(searchText) || el.materia_descrizione.toLowerCase().includes(searchText);
          }
        })

        if (error) {
          return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
          return <div>Loading...</div>;
        } else if (!classroom) {
          return <div>Error: no classroom found</div>
        } else {
            return (
              <>
                <div className='classroom_details_controls'>
                  <TextField
                    id='outlined-basic'
                    variant='outlined'
                    label='Cerca'
                    onChange={this.inputHandler}
                    color='error'
                    sx={{ backgroundColor: 'white' }}
                  />
                </div>
                <div className='classroom_details_container'>
                    <h1 className='classroom_details_title'>{classroom.aula_nome}</h1>
                    <h2 className='classroom_details_description'>{classroom.aula_indirizzo} - {classroom.aula_piano}</h2>
                    <h3 className='classroom_details_capacity'>Capienza: {classroomLocal.capienza_aula}</h3>
                    <h4 className='classrooms_details_table_counter'>{filteredTeachings.length === 1? 'Trovata' : 'Trovate'} {filteredTeachings.length} {filteredTeachings.length === 1? 'lezione' : 'lezioni'}</h4>
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
                                {filteredTeachings.map((teaching, i) => {
                                  /*switch(teaching.stato){ case 'ok': displayFirst = 'inline'; displaySecond = 'none'; displayThird = 'none'; break;
                                  case 'attenzione': displayFirst = 'none'; displaySecond = 'inline'; displayThird = 'none'; break;
                                  case 'anomalia': displayFirst = 'none'; displaySecond = 'none'; displayThird = 'inline'; break; 
                                  default: displayFirst = 'none'; displaySecond = 'none'; displayThird = 'none'; break; }*/
                                    const data_inizio = teaching.inizio.split('T');
                                    const data_fine = teaching.fine.split('T');
                                    const data = data_inizio[0];
                                    const ora_inizio = data_inizio[1];
                                    const ora_fine = data_fine[1];
                                    return (
                                      <tr key={i}>
                                            <td>{data}</td>
                                            <td>{ora_inizio + ' - ' + ora_fine}</td>
                                            <td><Link className='toTeaching' to={'/teaching/details/?componente_id=' + teaching.componente_id}>{teaching.materia_descrizione}</Link></td>
                                            <td>{/*course.presenze*/}0</td>
                                            <td>{/*<MdOutlineDone color='green' display={displayFirst} /><AiOutlineWarning color='orange' display={displaySecond}/><MdError color='red' display={displayThird}/>*/}0</td>
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
              </>
            )
        }
    }
}

export default ClassroomDetails