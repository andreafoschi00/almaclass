import React from 'react';

import './classroomDetails.css';

import { MdOutlineDone, MdError } from 'react-icons/md';
import { AiOutlineWarning } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from '@mui/material';
import Paper from '@mui/material/Paper';
import { Popup } from '../../containers';
import DateRangePicker from '@wojtekmaj/react-daterange-picker'

import pianoTerra from './../../assets/piano_terra.svg';
import pianoPrimo from './../../assets/piano_primo.svg';
import pianoSecondo from './../../assets/piano_secondo.svg';
import { SvgLoader, SvgProxy } from 'react-svgmt';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Brush, ReferenceLine, AreaChart, Area } from 'recharts';

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
          dates: [null, null],
          openMap: false,
          openCharts: false,
        }
    }

    inputHandler = (e) => {
      let lowerCaseText = e.target.value.toLowerCase();
      this.setState({ searchText: lowerCaseText });
    }

    handleDateChange = (e) => {
      e ? this.setState({ dates: [e[0], e[1]]}) : this.setState({ dates: [null, null]})
    }

    toggleMap = () => {
      this.setState({ openMap: !this.state.openMap});
    }

    toggleCharts = () => {
      this.setState({ openCharts: !this.state.openCharts});
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
        const { error, isLoaded, items, teachings, classroomLocal, searchText, openMap, openCharts, dates } = this.state;
        const classroom = items[0];

        let filteredTeachings = teachings.filter((el) => {
          if (searchText === '') {
            return el;
          }
          else {
            return el.inizio.toLowerCase().includes(searchText) || el.fine.toLowerCase().includes(searchText) || el.materia_descrizione.toLowerCase().includes(searchText);
          }
        });

        let data1=[], data2=[], data3=[];
        teachings.forEach((t) => {
          const data_t_format = new Date(t.inizio);
          const data2_t_format = new Date (t.fine);
          const data_t = data_t_format.getDate()+ "/"+(data_t_format.getMonth()+1)+"/"+data_t_format.getFullYear();
          const capienzaCalcolata = Math.floor(Math.random() * ((classroomLocal.capienza_aula + 5) - 10 + 1)) + 10;
          const diff = data2_t_format - data_t_format;
          const hours = new Date(diff).getHours() - 1;
          let reg=0, ris=0, an=0;
          
          if(((capienzaCalcolata >= Math.floor(classroomLocal.capienza_aula*0.95)) && capienzaCalcolata <= classroomLocal.capienza_aula) || (capienzaCalcolata < Math.floor(classroomLocal.capienza_aula*0.15))) {
            ris=1;
          } else if (capienzaCalcolata > classroomLocal.capienza_aula) {
            an=1;
          } else {
            reg=1;
          }

          data1.push({
            data: data_t,
            reg: reg,
            ris: ris,
            an: an
          });

          data2.push({
            data: data_t,
            pres: capienzaCalcolata
          });

          data3.push({
            data: data_t,
            hours: hours
          })
        });

        let data1Final=[], data2Final=[];

        data1.forEach((d) => {
          if(data1Final.length > 0 && data1Final.filter(d2 => d2.data === d.data).length > 0) {
            data1Final.forEach(d2 => {
              if(d2.data === d.data) {
                d2.reg += d.reg;
                d2.ris += d.ris;
                d2.an += d.an;
              }
            })
          } else {
            data1Final.push({
              data: d.data,
              reg: d.reg,
              ris: d.ris,
              an: d.an
            })
          }
        });

        data2.forEach((d) => {
          if(data2Final.length > 0 && data2Final.filter(d2 => d2.data === d.data).length > 0) {
            data2Final.forEach(d2 => {
              if(d2.data === d.data) {
                d2.pres = Math.round((d2.pres + d.pres)/2);
              }
            })
          } else {
            data2Final.push({
              data: d.data,
              pres: d.pres
            })
          }
        });

        let data2FinalMonths=[
          {
            month: 'Settembre',
            pres: 0,
            cont: 0
          },
          {
            month: 'Ottobre',
            pres: 0,
            cont: 0
          },
          {
            month: 'Novembre',
            pres: 0,
            cont: 0
          },
          {
            month: 'Dicembre',
            pres: 0,
            cont: 0
          }
        ];

        data2Final.forEach((d) => {
          if(d.data.includes('/9/')) {
            data2FinalMonths[0].pres+=d.pres;
            data2FinalMonths[0].cont++;
          } else if(d.data.includes('/10/')) {
            data2FinalMonths[1].pres+=d.pres;
            data2FinalMonths[1].cont++;
          } else if(d.data.includes('/11/')) {
            data2FinalMonths[2].pres+=d.pres;
            data2FinalMonths[2].cont++;
          } else if(d.data.includes('/12/')) {
            data2FinalMonths[3].pres+=d.pres;
            data2FinalMonths[3].cont++;
          }
        });

        let data4FinalMonths=data2FinalMonths;

        data2FinalMonths.forEach((d) => {
          d.pres = Math.floor(d.pres/d.cont);
        });

        let data3FinalMonths=[
          {
            month: 'Settembre',
            hours: 0,
          },
          {
            month: 'Ottobre',
            hours: 0,
          },
          {
            month: 'Novembre',
            hours: 0,
          },
          {
            month: 'Dicembre',
            hours: 0,
          }
        ];

        data3.forEach((d) => {
          if(d.data.includes('/9/')) {
            data3FinalMonths[0].hours+=d.hours;
          } else if(d.data.includes('/10/')) {
            data3FinalMonths[1].hours+=d.hours;
          } else if(d.data.includes('/11/')) {
            data3FinalMonths[2].hours+=d.hours;
          } else if(d.data.includes('/12/')) {
            data3FinalMonths[3].hours+=d.hours
          }
        });

        data4FinalMonths.forEach(d => {
          d.pres = Math.round(d.pres / classroomLocal.capienza_aula * 1000) / 10;
        });

        filteredTeachings = filteredTeachings.filter((el) => {
          if(dates[0] == null || dates[1] == null) {
            return el;
          } else {
            const dateFormat = new Date(el.inizio);
            return dateFormat >= dates[0] && dateFormat <= dates[1];
          }
        });

        if (error) {
          return <div>Error: {error.message}</div>
        } else if (!isLoaded) {
          return <div>Loading...</div>
        } else if (!classroom) {
          return <div>Error: no classroom found</div>
        } else {
            let svgToDisplay, classroomMap=[];
            switch(classroom.aula_piano) {
              case 'Piano Terra':
                svgToDisplay = pianoTerra;
              break;
              case 'Piano Primo':
                svgToDisplay = pianoPrimo
              break;
              case 'Piano Secondo':
                svgToDisplay = pianoSecondo;
              break;
              default:
                svgToDisplay = '';
              break;
            }

            let codice = classroom.aula_codice;
            if(codice === '6137_WPTE_041') {
              codice = '6137_WPTE_042';
            }
            classroomMap.push(codice);
            
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
                <div className="classroom_details_range_picker">
                  <DateRangePicker 
                    onChange={this.handleDateChange} 
                    value={dates}
                    format='dd/MM/yyyy'
                    />
                </div>
                <div className='classroom_details_container_box'>
                  <div className="classroom_details_container">
                    <h1 className='classroom_details_title'>{classroom.aula_nome}</h1>
                    <h2 className='classroom_details_description'>{classroom.aula_indirizzo} - {classroom.aula_piano}</h2>
                    <h3 className='classroom_details_capacity'>Capienza: {classroomLocal.capienza_aula}</h3>
                    <h4 className='classrooms_details_table_counter'>{filteredTeachings.length === 1? 'Trovata' : 'Trovate'} {filteredTeachings.length} {filteredTeachings.length === 1? 'lezione' : 'lezioni'}</h4>
                    <div className='classroom_details_buttons'>
                        <input type='button' className='button' value='Statistiche' onClick={this.toggleCharts}/>
                        {openCharts && <Popup 
                          content={
                          <>
                          {teachings.length === 0 ? <div>In quest'aula non si sono ancora svolte lezioni.</div> : 
                            <div className='classrooms_details_charts'>
                              <h1>Andamento lezioni</h1>
                                <BarChart
                                  width={1000}
                                  height={500}
                                  data={data1Final}
                                  margin={{
                                    top: 20,
                                    right: 100,
                                    left: 20,
                                    bottom: 5,
                                  }}
                                  >
                                  <defs>
                                    <pattern id="pattern-regolare" x="10" y="10" width="20" height="20" patternUnits="userSpaceOnUse" >
                                      <circle cx="10" cy="10" r="10" style={{ stroke: "none", fill: "green" }} />
                                    </pattern>
                                    <pattern id="pattern-rischio" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse" >
                                      <rect class="checker" x="0" width="10" height="10" y="0" style={{ fill: "orange" }}/>
                                      <rect class="checker" x="20" width="10" height="10" y="20" style={{ fill: "orange" }}/>
                                    </pattern>
                                    <pattern id="pattern-anomalia" x="0" y="0" width="20" height="32" patternUnits="userSpaceOnUse" viewBox="56 -254 112 190">
                                      <g id="hexagon">
                                        <path d="M168-127.1c0.5,0,1,0.1,1.3,0.3l53.4,30.5c0.7,0.4,1.3,1.4,1.3,2.2v61c0,0.8-0.6,1.8-1.3,2.2L169.3-0.3
                                        c-0.7,0.4-1.9,0.4-2.6,0l-53.4-30.5c-0.7-0.4-1.3-1.4-1.3-2.2v-61c0-0.8,0.6-1.8,1.3-2.2l53.4-30.5C167-127,167.5-127.1,168-127.1
                                        L168-127.1z" style={{ fill: "white", stroke: "red", strokeWidth: "20" }}/>
                                        <path d="M112-222.5c0.5,0,1,0.1,1.3,0.3l53.4,30.5c0.7,0.4,1.3,1.4,1.3,2.2v61c0,0.8-0.6,1.8-1.3,2.2l-53.4,30.5
                                        c-0.7,0.4-1.9,0.4-2.6,0l-53.4-30.5c-0.7-0.4-1.3-1.4-1.3-2.2v-61c0-0.8,0.6-1.8,1.3-2.2l53.4-30.5
                                        C111-222.4,111.5-222.5,112-222.5L112-222.5z" style={{ fill: "white", stroke: "red", strokeWidth: "20" }}/>
                                        <path d="M168-317.8c0.5,0,1,0.1,1.3,0.3l53.4,30.5c0.7,0.4,1.3,1.4,1.3,2.2v61c0,0.8-0.6,1.8-1.3,2.2L169.3-191
                                        c-0.7,0.4-1.9,0.4-2.6,0l-53.4-30.5c-0.7-0.4-1.3-1.4-1.3-2.2v-61c0-0.8,0.6-1.8,1.3-2.2l53.4-30.5
                                        C167-317.7,167.5-317.8,168-317.8L168-317.8z" style={{ fill: "white", stroke: "red", strokeWidth: "20" }}/>
                                      </g>
                                    </pattern>
                                  </defs>
                                  <CartesianGrid strokeDasharray="3 3" />
                                  <XAxis dataKey="data" name='Data' allowDataOverflow={true} />
                                  <YAxis minTickGap={1} interval={0} />
                                  <Tooltip />
                                  <Legend iconSize={40}/>
                                  <ReferenceLine y={0} stroke="#000" />
                                  <Brush dataKey="data" height={30} stroke="#bb2e29" />
                                  <Bar dataKey="reg" name='Regolare' stroke='green' fill="url(#pattern-regolare)" />
                                  <Bar dataKey="ris" name='A rischio' stroke='orange' fill="url(#pattern-rischio)" />
                                  <Bar dataKey="an" name='Anomalia' stroke='red' fill="url(#pattern-anomalia)" />
                                </BarChart>
                                <br /><br />
                                <h1>Media presenze rilevate</h1>
                                <AreaChart
                                  width={1000}
                                  height={500}
                                  data={data2FinalMonths}
                                  margin={{
                                    top: 10,
                                    right: 30,
                                    left: 0,
                                    bottom: 0,
                                  }}
                                  >
                                  <CartesianGrid strokeDasharray="3 3" />
                                  <XAxis dataKey="month" />
                                  <YAxis domain={[0, classroomLocal.capienza_aula + 20]}/>
                                  <Tooltip />
                                  <ReferenceLine y={classroomLocal.capienza_aula} label={{ position: 'top',  value: 'Capienza aula', fill: 'blue', fontSize: 14 }} stroke="#333" strokeDasharray="3 3" />
                                  <Area type="monotone" dataKey="pres" name='Presenze' stroke="#bb2e29" fill="#bb2e29" />
                                </AreaChart>
                                <br /><br />
                                <h1>Ore di lezione complessive</h1>
                                <AreaChart
                                  width={1000}
                                  height={500}
                                  data={data3FinalMonths}
                                  margin={{
                                    top: 10,
                                    right: 30,
                                    left: 0,
                                    bottom: 0,
                                  }}
                                  >
                                  <CartesianGrid strokeDasharray="3 3" />
                                  <XAxis dataKey="month" />
                                  <YAxis />
                                  <Tooltip />
                                  <Area type="monotone" dataKey="hours" name='Ore' stroke="#bb2e29" fill="#bb2e29" />
                                </AreaChart>
                                <br /><br />
                                <h1>Tasso di occupazione (%)</h1>
                                <AreaChart
                                  width={1000}
                                  height={500}
                                  data={data4FinalMonths}
                                  margin={{
                                    top: 10,
                                    right: 30,
                                    left: 0,
                                    bottom: 0,
                                  }}
                                  >
                                  <CartesianGrid strokeDasharray="3 3" />
                                  <XAxis dataKey="month" />
                                  <YAxis domain={[0, 100]}/>
                                  <Tooltip />
                                  <Area type="monotone" dataKey="pres" name='Tasso' stroke="#bb2e29" fill="#bb2e29" />
                                </AreaChart>
                            </div>
                          }
                          </>}
                          handleClose={this.toggleCharts}
                        />}
                        <input type='button' className='button' value='Mappa' onClick={this.toggleMap} />
                        { openMap && <Popup
                          content={
                          <>
                            <div className="img-box">
                              <SvgLoader path={svgToDisplay}>
                                <SvgProxy selector={"path"} fill="black" />
                                {classroomMap.map(cl => (
                                  <SvgProxy
                                    key={cl}
                                    selector={"#_" + cl}
                                    stroke='#BB2E29'
                                    stroke-width='2'
                                    class='selected'
                                    fill='url(#fillPattern)'
                                  />
                                ))}
                              </SvgLoader>
                            </div>
                          </>}
                          handleClose={this.toggleMap}
                        />}
                    </div>
                    <div className='classroom_details_table_container'>
                      <TableContainer sx={{ backgroundColor: '#f4f4f4'}} component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell className='classroom_details_table_days'>Giorno</TableCell>
                                    <TableCell className='classroom_details_table_times'>Orario</TableCell>
                                    <TableCell className='classroom_details_table_teachings'>Insegnamento</TableCell>
                                    <TableCell align='center' className='classroom_details_table_attendances'>Presenze</TableCell>
                                    <TableCell align='center' className='classroom_details_table_status'>Stato</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
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
                                      <TableRow key={i}>
                                        <TableCell>{data}</TableCell>
                                        <TableCell>{ora_inizio + ' - ' + ora_fine}</TableCell>
                                        <TableCell><Link className='toTeaching' to={'/teaching/details/?componente_id=' + teaching.componente_id}>{teaching.materia_descrizione}</Link></TableCell>
                                        <TableCell align='center'>{capienzaCalcolata}</TableCell>
                                        <TableCell align='center'><MdOutlineDone color='green' display={displayFirst} /><AiOutlineWarning color='orange' display={displaySecond}/><MdError color='red' display={displayThird}/></TableCell>
                                      </TableRow>
                                    )})}
                            </TableBody>
                        </Table>
                      </TableContainer>
                    </div>
                  </div>
                </div>
              </>
            )
        }
    }
}

export default ClassroomDetails