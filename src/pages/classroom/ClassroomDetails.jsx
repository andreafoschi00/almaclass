import React from 'react';

import './classroomDetails.css';

import { MdOutlineDone, MdError } from 'react-icons/md';
import { AiOutlineWarning } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { TextField } from '@mui/material';
import { Popup } from '../../containers';

import pianoTerra from './../../assets/piano_terra.svg';
import pianoPrimo from './../../assets/piano_primo.svg';
import pianoSecondo from './../../assets/piano_secondo.svg';

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
          searchText: '',
          openMap: false
        }
    }

    inputHandler = (e) => {
      let lowerCaseText = e.target.value.toLowerCase();
      this.setState({ searchText: lowerCaseText });
    }

    toggleMap = () => {
      this.setState({ openMap: !this.state.openMap});
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
        const { error, isLoaded, items, teachings, classroomLocal, searchText, openMap } = this.state;
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
            let svgToDisplay;
            switch(classroom.aula_piano) {
              case 'Piano Terra':
                svgToDisplay = pianoTerra;
              break;
              case 'Piano Primo':
                svgToDisplay = pianoPrimo;
              break;
              case 'Piano Secondo':
                svgToDisplay = pianoSecondo;
              break;
              default:
                svgToDisplay = '';
              break;
            }
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
                    <div className='classroom_details_buttons'>
                        <input type='button' className='button' value='Statistiche' />
                        <input type='button' className='button' value='Mappa' onClick={this.toggleMap} />
                        { openMap && <Popup
                          content={
                          <>
                            <img src={svgToDisplay} alt={classroom.aula_piano} />
                          </>}
                          handleClose={this.toggleMap}
                        />}
                    </div>
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
                                    const dateFormat = new Date(teaching.inizio);
                                    const dateFormat2 = new Date(teaching.fine);
                                    const data = dateFormat.getDate()+ "/"+(dateFormat.getMonth()+1)+"/"+dateFormat.getFullYear();
                                    const ora_inizio = dateFormat.getHours()+":"+String(dateFormat.getMinutes()).padStart(2, '0');
                                    const ora_fine = dateFormat2.getHours()+":"+String(dateFormat.getMinutes()).padStart(2, '0');
                                    const capienzaCalcolata = Math.floor(Math.random() * ((classroomLocal.capienza_aula + 5) - 10 + 1)) + 10;
                                    let stato;
                                    
                                    if(((capienzaCalcolata >= Math.floor(classroomLocal.capienza_aula*0.95)) && capienzaCalcolata <= classroomLocal.capienza_aula) || (capienzaCalcolata < Math.floor(classroomLocal.capienza_aula*0.15))) {
                                      stato = 'attenzione';
                                    } else if (capienzaCalcolata > classroomLocal.capienza_aula) {
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
                                            <td><Link className='toTeaching' to={'/teaching/details/?componente_id=' + teaching.componente_id}>{teaching.materia_descrizione}</Link></td>
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

export default ClassroomDetails