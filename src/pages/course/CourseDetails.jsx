import { TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from '@mui/material';
import Paper from '@mui/material/Paper';
import React from 'react';
import { Link } from 'react-router-dom';
import { Popup } from '../../containers';
import './courseDetails.css';
import { CartesianGrid, XAxis, YAxis, Tooltip, BarChart, Bar, Legend, PieChart, Pie, Cell } from 'recharts';
import { Table } from 'react-bootstrap';

class CourseDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          corso_codice: new URLSearchParams(window.location.search).get('corso_codice'),
          error: null,
          isLoaded1: false,
          isLoaded2: false,
          isLoaded3: false,
          isLoaded4: false,
          items: [],
          teachings: [],
          searchText: '',
          openCharts: '',
          classroomsLocal: [],
          lessons: [],
          filteredClassroomsAttendances: []
        }
    }

    inputHandler = (e) => {
      let lowerCaseText = e.target.value.toLowerCase();
      this.setState({ searchText: lowerCaseText });
    }

    toggleCharts = () => {
      this.setState({ openCharts: !this.state.openCharts});
    }

    componentDidMount() {
        fetch(`/api/courses/details/?corso_codice=${this.state.corso_codice}`, {
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
                isLoaded1: true,
                items: result.body.result.records
              });
            },
            (error) => {
              this.setState({
                isLoaded1: true,
                error
              });
            }
        );
        fetch(`/api/courses/allteachingsincourse/?corso_codice=${this.state.corso_codice}`, {
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
                  isLoaded2: true,
                  teachings: result.body.result.records
                });
              },
              (error) => {
                this.setState({
                  isLoaded2: true,
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
                  const filter = [];
                  result.forEach(r => {
                    let dataTest;
                    if(r.rilevazioni.length === 1) {
                      dataTest = [];
                    } else {
                      dataTest = r.rilevazioni;
                    }
                    dataTest.forEach(f => {
                      f.timestamp = new Date(f.timestamp*1000);
                    });
                    const dataTest2 = [];
    
                    dataTest.forEach(d => {
                      const millis2 = dataTest.filter((d2) => d2.timestamp.getTime() === d.timestamp.getTime() && d2.camera !== d.camera);
                      if(millis2.length > 0) {
                        if(dataTest2.length > 0) {
                          const foundDuplicate = dataTest2.filter((d3) => d3.timestamp.getTime() === millis2[0].timestamp.getTime());
                          if(foundDuplicate.length === 0) {
                            dataTest2.push({
                              presenze: parseInt(d.presenze) + parseInt(millis2[0].presenze),
                              timestamp: d.timestamp
                            });
                          }
                        } else {
                          dataTest2.push({
                            presenze: parseInt(d.presenze) + parseInt(millis2[0].presenze),
                            timestamp: d.timestamp
                          });
                        }
                      } else {
                        dataTest2.push({
                          presenze: parseInt(d.presenze),
                          timestamp: d.timestamp
                        });
                      }
                    });
                    filter.push( {
                      id: r.id,
                      rilevazioni: dataTest2
                    })
                  });
                  this.setState({
                    isLoaded3: true,
                    classroomsLocal: result,
                    filteredClassroomsAttendances: filter
                  });
                },
                (error) => {
                  this.setState({
                    isLoaded3: true,
                    error
                  });
                }
          );
          fetch(`/api/courses/alllessonsincourse/?corso_codice=${this.state.corso_codice}`, {
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
                  isLoaded4: true,
                  lessons: result.body.result.records
                });
              },
              (error) => {
                this.setState({
                  isLoaded4: true,
                  error
                });
              }
          );
    }

    render() {
        const RADIAN = Math.PI / 180;
        const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);

          return (
            <>
              <defs>
                <filter x="0" y="0" width="1" height="1" id="solid">
                  <feFlood flood-color="black" result="bg" />
                  <feMerge>
                    <feMergeNode in="bg"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
              </defs>
              <text x={x} y={y} fill="white" fontSize={"30px"} filter='url(#solid)' textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
                {`${(percent * 100).toFixed(0)}%`}
              </text>
            </>
          );
        };

        const { error, isLoaded1, isLoaded2, isLoaded3, isLoaded4, items, teachings, searchText, openCharts, classroomsLocal, lessons, filteredClassroomsAttendances } = this.state;
        const course = items[0];

        let data = [], count = 0;

        console.dir(lessons)
        console.dir(filteredClassroomsAttendances)

        lessons.forEach(c => {
          const data_t_format = new Date(c.inizio);
          const data2_t_format = new Date(c.fine);
          const data_t = data_t_format.getDate()+ "/"+(data_t_format.getMonth()+1)+"/"+data_t_format.getFullYear();
          const classroom_attuale = classroomsLocal.filter((cl) => cl.id === c.aula_codice);
          if(classroom_attuale.length > 0) {
            count++;
            const capienza_attuale = classroom_attuale[0].capienza_aula;
            let capienzaCalcolata = 0;
            filteredClassroomsAttendances.forEach((f) => {
              if(f.id === c.aula_codice) {
                const selectAttendances = f.rilevazioni.filter((d) => d.timestamp.getTime() >= data_t_format.getTime() && d.timestamp.getTime() <= data2_t_format.getTime());
                selectAttendances.forEach((f2) => {
                  if(f2.presenze > capienzaCalcolata) {
                    capienzaCalcolata = f2.presenze;
                  }
                })
              }
            })

            let reg=0, ris=0, an=0;
            
            if(capienzaCalcolata !== 0) {
              if(((capienzaCalcolata >= Math.floor(capienza_attuale*0.90)) && capienzaCalcolata <= capienza_attuale) || (capienzaCalcolata < Math.floor(capienza_attuale*0.10))) {
                an=1;
              } else if (((capienzaCalcolata >= Math.floor(capienza_attuale*0.85)) && capienzaCalcolata <= capienza_attuale) || (capienzaCalcolata < Math.floor(capienza_attuale*0.25))) {
                ris=1;
              } else {
                reg=1;
              }
            }

            data.push({
              data: data_t,
              ris: ris,
              an: an,
              reg: reg
            })
          }
        });

        let dataFinalMonths = [
          {
            month: 'Settembre',
            reg: 0,
            ris: 0,
            an: 0,
          },
          {
            month: 'Ottobre',
            reg: 0,
            ris: 0,
            an: 0,
          },
          {
            month: 'Novembre',
            reg: 0,
            ris: 0,
            an: 0,
          },
          {
            month: 'Dicembre',
            reg: 0,
            ris: 0,
            an: 0,
          }
        ];

        data.forEach(d => {
          if(d.data.includes('/9/')) {
            dataFinalMonths[0].reg += d.reg;
            dataFinalMonths[0].ris += d.ris;
            dataFinalMonths[0].an += d.an;
          } else if(d.data.includes('/10/')) {
            dataFinalMonths[1].reg += d.reg;
            dataFinalMonths[1].ris += d.ris;
            dataFinalMonths[1].an += d.an;
          } else if(d.data.includes('/11/')) {
            dataFinalMonths[2].reg += d.reg;
            dataFinalMonths[2].ris += d.ris;
            dataFinalMonths[2].an += d.an;
          } else if(d.data.includes('/12/')) {
            dataFinalMonths[3].reg += d.reg;
            dataFinalMonths[3].ris += d.ris;
            dataFinalMonths[3].an += d.an;
          }
        });

        let data2 = [
          { 
            name: 'Regolare',
            value: 0,
            stroke: 'green',
            color: 'url(#pattern-regolare)'
          },
          { 
            name: 'A rischio',
            value: 0,
            stroke: 'orange',
            color: 'url(#pattern-rischio)'
          },
          { 
            name: 'Anomalia',
            value: 0,
            stroke: 'red',
            color: 'url(#pattern-anomalia)'
          }
        ];

        dataFinalMonths.forEach(d => {
          data2[0].value += d.reg;
          data2[1].value += d.ris;
          data2[2].value += d.an;
        });

        let data2Filtered = data2.filter(d => { return d.value > 0; });

        const filteredTeachings = teachings.filter((el) => {
          if (searchText === '') {
            return el;
          }
          else {
            return el.materia_descrizione.toLowerCase().includes(searchText) || el.lingua.toLowerCase().includes(searchText) || el.docente_nome.toLowerCase().includes(searchText);
          }
        })

        if (error) {
            return <div>Error: {error.message}</div>;
          } else if (!isLoaded1 || !isLoaded2 || !isLoaded3 || !isLoaded4) {
            return <div>Loading...</div>;
          } else if (!course) {
            return <div>Error: no course found</div>
          } else {
            return (
              <>
               <div className='course_details_controls'>
                  <TextField
                    id='outlined-basic'
                    variant='outlined'
                    label='Cerca'
                    onChange={this.inputHandler}
                    color='error'
                    sx={{ backgroundColor: 'white' }}
                  />
                </div>
                <div className="course_details_container_box">
                  <div className='course_details_container'>
                      <h1 className='course_details_name'>{course.corso_descrizione}</h1>
                      <h2 className='course_details_type'>Tipo di corso: {course.tipologia}</h2>
                      <h3 className='course_details_department'>Ambito: {course.ambiti}</h3>
                      <h3 className='course_details_access'>Accesso: {course.accesso}</h3>
                      <h3 className='course_details_language'>Lingue: {course.lingue.replace(' ', ', ')}</h3>
                      <h4 className='course_details_table_counter'>{filteredTeachings.length === 1? 'Trovato' : 'Trovati'} {filteredTeachings.length} {filteredTeachings.length === 1? 'insegnamento' : 'insegnamenti'}</h4>
                      <div className='course_details_buttons'>
                        <input type='button' className='button' value='Statistiche Corso' onClick={this.toggleCharts}/>
                          { openCharts && <Popup
                            content={
                              <>
                                {lessons.length === 0 ? <div>Non si sono ancora tenute lezioni per questo corso.</div> :
                                <>
                                <h1>Il corso in sintesi</h1>
                                <div className='course_details_charts'>
                                  <BarChart
                                    width={500}
                                    height={500}
                                    data={dataFinalMonths}
                                    margin={{
                                      top: 20,
                                      right: 30,
                                      left: 20,
                                      bottom: 5,
                                    }}
                                    >
                                    <defs>
                                      <pattern id="pattern-regolare" patternUnits='userSpaceOnUse' width='40' height='40' patternTransform='scale(1) rotate(0)' >
                                      <path d='M20 0L0 10v10l20-10zm0 10v10l20 10V20z'  stroke-width='1' stroke='none' fill='hsla(122, 39%, 49%, 1)'/>
                                      <path d='M20-10V0l20 10V0zm0 30L0 30v10l20-10zm0 10v10l20 10V40z'  stroke-width='1' stroke='none' fill='hsla(122, 39%, 49%, 1)'/>
                                      </pattern>
                                      <pattern id="pattern-rischio" x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse" >
                                        <rect class="checker" x="0" width="5" height="5" y="0" style={{ fill: "orange" }}/>
                                        <rect class="checker" x="5" width="5" height="5" y="5" style={{ fill: "orange" }}/>
                                      </pattern>
                                      <pattern id="pattern-anomalia" patternUnits='userSpaceOnUse' width='60' height='30' patternTransform='scale(1) rotate(0)' >
                                      <rect x='0' y='0' width='100%' height='100%' fill='hsla(0, 0%, 100%, 1)'/>
                                      <path d='M1-6.5v13h28v-13H1zm15 15v13h28v-13H16zm-15 15v13h28v-13H1z'  stroke-width='1' stroke='none' fill='hsla(4, 90%, 58%, 1)'/>
                                      <path d='M31-6.5v13h28v-13H31zm-45 15v13h28v-13h-28zm60 0v13h28v-13H46zm-15 15v13h28v-13H31z'  stroke-width='1' stroke='none' fill='hsla(4, 90%, 58%, 1)'/>
                                      </pattern>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="month" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend iconSize={20} />
                                    <Bar dataKey="reg" name='Regolare' stackId="a" stroke='green' fill="url(#pattern-regolare)" />
                                    <Bar dataKey="ris" name='A rischio' stackId="a" stroke='orange' fill="url(#pattern-rischio)" />
                                    <Bar dataKey="an" name='Anomalia' stackId="a" stroke='red' fill="url(#pattern-anomalia)" />
                                  </BarChart>
                                  <div className="pie-chart-container">
                                    <h3>Lezioni svolte: {count}</h3>
                                    <PieChart width={500} height={500}>
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
                                      <Pie
                                        data={data2Filtered}
                                        cx="50%"
                                        cy="50%"
                                        labelLine={false}
                                        label={renderCustomizedLabel}
                                        outerRadius={200}
                                        fill="#8884d8"
                                        dataKey="value"
                                        >
                                        {data2Filtered.map((entry, index) => (
                                          <Cell key={`cell-${index}`} stroke={entry.stroke} fill={entry.color} />
                                          ))}
                                      </Pie>
                                    </PieChart>
                                  </div>
                                </div>
                                </>}
                              </>}
                            handleClose={this.toggleCharts}
                          />}
                      </div>
                      <div className='course_details_table_container'>
                        <TableContainer sx={{ backgroundColor: '#f4f4f4'}} component={Paper}>
                          <Table>
                              <TableHead>
                                  <TableRow>
                                      <TableCell width='50%' className='course_details_table_name'>Nome</TableCell>
                                      <TableCell width='50%' className='course_details_table_teachers'>Docente</TableCell>
                                      <TableCell width='20%' className='course_details_table_language'>Lingua</TableCell>
                                  </TableRow>
                              </TableHead>
                              <TableBody>
                                  {filteredTeachings.map((insegnamento, i) => {
                                    return (
                                      <TableRow key={i}>
                                        <TableCell><Link className='toTeaching' to={'/teaching/details/?componente_id=' + insegnamento.componente_id}>{insegnamento.materia_descrizione}</Link></TableCell>
                                        <TableCell>{insegnamento.docente_nome}</TableCell>
                                        <TableCell>{insegnamento.lingua}</TableCell>
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

export default CourseDetails