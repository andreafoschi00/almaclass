import React from 'react';
import './teachingDetails.css';

import { MdOutlineDone, MdError } from 'react-icons/md';
import { AiOutlineWarning } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { TextField } from '@mui/material';
import DateRangePicker from '@wojtekmaj/react-daterange-picker'
import { Popup } from '../../containers';


class TeachingDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          componente_id: new URLSearchParams(window.location.search).get('componente_id'),
          error: null,
          isLoaded: false,
          items: [],
          classrooms: [],
          classroomsLocal: [],
          searchText: '',
          dates: [null, null],
          openChartsClassrooms: false,
          openChartsTeaching: false
        }
    }

    inputHandler = (e) => {
      let lowerCaseText = e.target.value.toLowerCase();
      this.setState({ searchText: lowerCaseText });
    }

    handleDateChange = (e) => {
      e ? this.setState({ dates: [e[0], e[1]]}) : this.setState({ dates: [null, null]})
    }

    toggleChartsClassrooms = () => {
      this.setState({ openChartsClassrooms: !this.state.openChartsClassrooms});
    }

    toggleChartsTeaching = () => {
      this.setState({ openChartsTeaching: !this.state.openChartsTeaching});
    }

    componentDidMount() {
        fetch(`/api/teachings/details/?componente_id=${+this.state.componente_id}`, {
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
          fetch(`/api/teachings/allclassroomsinteaching/?componente_id=${this.state.componente_id}`, {
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
                  classrooms: result.body.result.records
                });
              },
              (error) => {
                this.setState({
                  isLoaded: true,
                  error
                });
              }
            );
            fetch(`http://localhost:5000/classrooms/`, {
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
                    classroomsLocal: result
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
        const { error, isLoaded, items, classrooms, searchText, classroomsLocal, dates, openChartsClassrooms, openChartsTeaching } = this.state;
        const teaching = items[0];

        let filteredClassrooms = classrooms.filter((el) => {
          if (searchText === '') {
            return el;
          }
          else {
            return el.inizio.toLowerCase().includes(searchText) || el.fine.toLowerCase().includes(searchText) || el.aula_nome.toLowerCase().includes(searchText);
          }
        });

        filteredClassrooms = filteredClassrooms.filter((el) => {
          if(dates[0] == null || dates[1] == null) {
            return el;
          } else {
            const dateFormat = new Date(el.inizio);
            return dateFormat >= dates[0] && dateFormat <= dates[1];
          }
        });

        if (error) {
            return <div>Error: {error.message}</div>;
          } else if (!isLoaded) {
            return <div>Loading...</div>;
          } else if (!teaching) {
            return <div>Error: no teaching found</div>
          } else {
            return (
              <>
              <div className='teaching_details_controls'>
                  <TextField
                    id='outlined-basic'
                    variant='outlined'
                    label='Cerca'
                    onChange={this.inputHandler}
                    color='error'
                    sx={{ backgroundColor: 'white' }}
                  />
                </div>
                <div className="teaching_details_range_picker">
                  <DateRangePicker 
                    onChange={this.handleDateChange} 
                    value={dates}
                    format='dd/MM/yyyy'
                    />
                </div>
                <div className='teaching_details_container'>
                <h1 className='teaching_details_name'>{teaching.materia_descrizione}</h1>
                <h1 className='teaching_details_course'>Corso: <Link className='toCourse' to={'/course/details/?corso_codice=' + teaching.corso_codice}>{teaching.corso_descrizione}</Link></h1>
                <h2 className='teaching_details_teachers'>Docente: {teaching.docente_nome}</h2>
                <h3 className='teaching_details_language'>Lingua: {teaching.lingua}</h3>
                <h4 className='teaching_details_table_counter'>{filteredClassrooms.length === 1? 'Trovata' : 'Trovate'} {filteredClassrooms.length} {filteredClassrooms.length === 1? 'lezione' : 'lezioni'}</h4>
                <div className='teaching_details_buttons'>
                  <input type='button' className='button' value='Statistiche Aule' onClick={this.toggleChartsClassrooms}/>
                    { openChartsClassrooms && <Popup
                      content={
                        <>
                          <div>Coming soon...</div>
                        </>}
                      handleClose={this.toggleChartsClassrooms}
                    />}
                  <input type='button' className='button' value='Statistiche insegnamento' onClick={this.toggleChartsTeaching} />
                    { openChartsTeaching && <Popup
                      content={
                        <>
                          <div>Coming soon...</div>
                        </>}
                      handleClose={this.toggleChartsTeaching}
                    />}
                </div>
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
                            {filteredClassrooms.map((classroom, i) => {
                                    const dateFormat = new Date(classroom.inizio);
                                    const dateFormat2 = new Date(classroom.fine);
                                    const data = dateFormat.getDate()+ "/"+(dateFormat.getMonth()+1)+"/"+dateFormat.getFullYear();
                                    const ora_inizio = dateFormat.getHours()+":"+String(dateFormat.getMinutes()).padStart(2, '0');
                                    const ora_fine = dateFormat2.getHours()+":"+String(dateFormat.getMinutes()).padStart(2, '0');

                                    const classroom_attuale = classroomsLocal.filter((cl) => cl.id === classroom.aula_codice);
                                    const capienza_attuale = classroom_attuale[0].capienza_aula;

                                    const capienzaCalcolata = Math.floor(Math.random() * ((capienza_attuale + 5) - 10 + 1)) + 10;
                                    let stato;
                                    
                                    if(((capienzaCalcolata >= Math.floor(capienza_attuale*0.95)) && capienzaCalcolata <= capienza_attuale) || (capienzaCalcolata < Math.floor(capienza_attuale*0.15))) {
                                      stato = 'attenzione';
                                    } else if (capienzaCalcolata > capienza_attuale) {
                                      stato = 'anomalia';
                                    } else {
                                      stato = 'ok';
                                    }

                                    switch(stato){ case 'ok': displayFirst = 'inline'; displaySecond = 'none'; displayThird = 'none'; break;
                                    case 'attenzione': displayFirst = 'none'; displaySecond = 'inline'; displayThird = 'none'; break;
                                    case 'anomalia': displayFirst = 'none'; displaySecond = 'none'; displayThird = 'inline'; break; 
                                    default: displayFirst = 'none'; displaySecond = 'none'; displayThird = 'none'; break; }

                                    return (
                                      <tr key={i}>
                                        <td>{data}</td>
                                        <td>{ora_inizio + ' - ' + ora_fine}</td>
                                        <td><Link className='toClassroom' to={'/classroom/details/?aula_codice=' + classroom.aula_codice}>{classroom.aula_nome}</Link></td>
                                        <td>{capienzaCalcolata}</td>
                                        <td><MdOutlineDone color='green' display={displayFirst} /><AiOutlineWarning color='orange' display={displaySecond}/><MdError color='red' display={displayThird}/></td>
                                    </tr>
                                )})}
                        </tbody>
                                </table>
                </div>
              </div>
            </>
            )
        }
    }
}

export default TeachingDetails