import React from 'react';
import './teachingDetails.css';

import { MdOutlineDone, MdError } from 'react-icons/md';
import { AiOutlineWarning } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from '@mui/material';
import Paper from '@mui/material/Paper';
import DateRangePicker from '@wojtekmaj/react-daterange-picker'
import { Popup } from '../../containers';
import { Area, AreaChart, CartesianGrid, LabelList, ReferenceLine, XAxis, YAxis, Tooltip, BarChart, Bar, Legend, PieChart, Pie, Cell } from 'recharts';
import { Table } from 'react-bootstrap';

class TeachingDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          componente_id: new URLSearchParams(window.location.search).get('componente_id'),
          error: null,
          isLoaded1: false,
          isLoaded2: false,
          isLoaded3: false,
          items: [],
          classrooms: [],
          classroomsLocal: [],
          searchText: '',
          dates: [null, null],
          openChartsClassrooms: false,
          openChartsTeaching: false,
          filteredClassroomsAttendances: []
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
                  isLoaded2: true,
                  classrooms: result.body.result.records
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
              )
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
              <text x={x} y={y} fill="white" filter='url(#solid)' fontSize={"30px"} textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
                {`${(percent * 100).toFixed(0)}%`}
              </text>
            </>
          );
        };

        let displayFirst, displaySecond, displayThird;
        const { error, isLoaded1, isLoaded2, isLoaded3, items, classrooms, searchText, classroomsLocal, dates, openChartsClassrooms, openChartsTeaching, filteredClassroomsAttendances } = this.state;
        const teaching = items[0];

        let classroomsData = [], data2=[], count=0;

        classrooms.forEach(c => {
          if(classroomsData.length === 0 || classroomsData.filter(c2 => c2.aula_nome === c.aula_nome).length === 0) {
            const classroom_attuale = classroomsLocal.filter((cl) => cl.id === c.aula_codice);
            if(classroom_attuale.length > 0) {
              const capienza_attuale = classroom_attuale[0].capienza_aula;
              classroomsData.push({
                aula_nome: c.aula_nome,
                capienza: capienza_attuale,
                lezioni: []
              })
            }
          }
        });

        const rilevazioni = [];

        classrooms.forEach(c => {
          const data_t_format = new Date(c.inizio);
          const data2_t_format = new Date (c.fine);
          const data_t = data_t_format.getDate()+ "/"+(data_t_format.getMonth()+1)+"/"+data_t_format.getFullYear();
          const classroom_attuale = classroomsLocal.filter((cl) => cl.id === c.aula_codice);
          if(classroom_attuale.length > 0) {
            count++;
            const capienza_attuale = classroom_attuale[0].capienza_aula;
            let capienzaCalcolata = 0;
            filteredClassroomsAttendances.forEach((f) => {
              if(f.id === classroom_attuale[0].id) {
                const selectAttendances = f.rilevazioni.filter((d) => d.timestamp.getTime() >= data_t_format.getTime() && d.timestamp.getTime() <= data2_t_format.getTime());
                selectAttendances.forEach((f2) => {
                  if(f2.presenze > capienzaCalcolata) {
                    capienzaCalcolata = f2.presenze;
                  }
                })
              }
            })

            rilevazioni.push({
              aula_nome: classroom_attuale[0].nome_aula,
              inizio: data_t_format,
              fine: data2_t_format,
              presenze: capienzaCalcolata
            });

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
            
            data2.push({
              data: data_t,
              ris: ris,
              an: an,
              reg: reg
            })
          }
        });

        classrooms.forEach(c => {
          classroomsData.forEach(c2 => {
            if(c.aula_nome === c2.aula_nome) {
              const dateFormat = new Date(c.inizio);
              const dateFormat2 = new Date(c.fine);
              const data = dateFormat.getDate()+ "/"+(dateFormat.getMonth()+1)+"/"+dateFormat.getFullYear();
              const ora_inizio = dateFormat.getHours()+":"+String(dateFormat.getMinutes()).padStart(2, '0');
              const ora_fine = dateFormat2.getHours()+":"+String(dateFormat.getMinutes()).padStart(2, '0');
              rilevazioni.forEach((r) => {
                if(r.aula_nome === c.aula_nome && r.inizio.getTime() === dateFormat.getTime() && r.fine.getTime() === dateFormat2.getTime()) {
                  c2.lezioni.push({
                    data: data + ' ' + ora_inizio + '-' + ora_fine,
                    presenze: r.presenze
                  })
                }
              })
            }
          })
        });

        let data2FinalMonths = [
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

        data2.forEach(d => {
          if(d.data.includes('/9/')) {
            data2FinalMonths[0].reg += d.reg;
            data2FinalMonths[0].ris += d.ris;
            data2FinalMonths[0].an += d.an;
          } else if(d.data.includes('/10/')) {
            data2FinalMonths[1].reg += d.reg;
            data2FinalMonths[1].ris += d.ris;
            data2FinalMonths[1].an += d.an;
          } else if(d.data.includes('/11/')) {
            data2FinalMonths[2].reg += d.reg;
            data2FinalMonths[2].ris += d.ris;
            data2FinalMonths[2].an += d.an;
          } else if(d.data.includes('/12/')) {
            data2FinalMonths[3].reg += d.reg;
            data2FinalMonths[3].ris += d.ris;
            data2FinalMonths[3].an += d.an;
          }
        });
        
        let data3 = [
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

        data2FinalMonths.forEach(d => {
          data3[0].value += d.reg;
          data3[1].value += d.ris;
          data3[2].value += d.an;
        });

        let data3Filtered = data3.filter(d => { return d.value > 0; })

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
          } else if (!isLoaded1 || !isLoaded2 || !isLoaded3) {
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
                <div className='teaching_details_container_box'>
                  <div className="teaching_details_container">
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
                            {classrooms.length === 0 ? <div>Non si sono ancora svolte lezioni per questo insegnamento.</div> : 
                            <>
                              {classroomsData.map((cl, i) => {
                                return(
                                  <>
                                      <h1>{cl.aula_nome}</h1>
                                      <h3>Capienza: {cl.capienza}</h3>
                                      <AreaChart
                                          width={1000}
                                          height={500}
                                          data={cl.lezioni}
                                          margin={{
                                            top: 10,
                                            right: 30,
                                            left: 60,
                                            bottom: 125,
                                          }}
                                          >
                                          <CartesianGrid strokeDasharray="4 2" />
                                          <XAxis dataKey="data" angle={-45} textAnchor="end" interval={0} />
                                          <YAxis domain={[0, cl.capienza + 20]}/>
                                          <Tooltip />
                                          <ReferenceLine y={cl.capienza} label={{ position: 'top',  value: 'Capienza aula', fill: 'blue', fontSize: 14 }} stroke="#333" strokeDasharray="4 2" />
                                          <Area type="monotone" dataKey="presenze" name='Presenze' stroke="#bb2e29" fill="#bb2e29" dot={{ stroke: '#6b0808', strokeWidth: 1 }} >
                                            <LabelList dataKey='presenze' position='top'/>
                                          </Area>
                                      </AreaChart>
                                    </>
                                  )
                                })}
                            </>
                            }
                            </>}
                          handleClose={this.toggleChartsClassrooms}
                          />}
                      <input type='button' className='button' value='Statistiche insegnamento' onClick={this.toggleChartsTeaching} />
                        { openChartsTeaching && <Popup
                          content={
                            <>
                            {classrooms.length === 0 ? <div>Non si sono ancora svolte lezioni per questo insegnamento.</div> : 
                              <>
                                <h1>Lezioni in sintesi</h1>
                                <div className="teaching_details_charts">
                                  <BarChart
                                    width={500}
                                    height={500}
                                    data={data2FinalMonths}
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
                                          <circle cx="10" cy="10" r="50" style={{ stroke: "none", fill: "green" }} />
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
                                        data={data3Filtered}
                                        cx="50%"
                                        cy="50%"
                                        labelLine={false}
                                        label={renderCustomizedLabel}
                                        outerRadius={200}
                                        fill="#8884d8"
                                        dataKey="value"
                                        >
                                        {data3Filtered.map((entry, index) => (
                                          <Cell key={`cell-${index}`} stroke={entry.stroke} fill={entry.color} />
                                          ))}
                                      </Pie>
                                    </PieChart>
                                  </div>
                                </div>
                              </>
                            }
                            </>}
                          handleClose={this.toggleChartsTeaching}
                          />}
                    </div>
                    <div className='teaching_details_table_container'>
                      <TableContainer sx={{ backgroundColor: '#f4f4f4'}} component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell width='30%' className='teaching_details_table_dates'>Data</TableCell>
                                    <TableCell width='30%' className='teaching_details_table_times'>Orario</TableCell>
                                    <TableCell width='30%' className='teaching_details_table_classrooms'>Luogo</TableCell>
                                    <TableCell width='30%' align='center' className='teaching_details_table_attendances'>Presenze</TableCell>
                                    <TableCell width='30%' align='center' className='teaching_details_table_status'>Stato</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {filteredClassrooms.map((classroom, i) => {
                                  const dateFormat = new Date(classroom.inizio);
                                  const dateFormat2 = new Date(classroom.fine);
                                  const data = dateFormat.getDate()+ "/"+(dateFormat.getMonth()+1)+"/"+dateFormat.getFullYear();
                                  const ora_inizio = dateFormat.getHours()+":"+String(dateFormat.getMinutes()).padStart(2, '0');
                                  const ora_fine = dateFormat2.getHours()+":"+String(dateFormat.getMinutes()).padStart(2, '0');
                                  
                                        const classroom_attuale = classroomsLocal.filter((cl) => cl.id === classroom.aula_codice);
                                        const capienza_attuale = classroom_attuale[0].capienza_aula;
                                        
                                        let capienzaCalcolata = 0;
                                        filteredClassroomsAttendances.forEach((f) => {
                                          if(f.id === classroom_attuale[0].id) {
                                            const selectAttendances = f.rilevazioni.filter((d) => d.timestamp.getTime() >= dateFormat.getTime() && d.timestamp.getTime() <= dateFormat2.getTime());
                                            selectAttendances.forEach((f2) => {
                                              if(f2.presenze > capienzaCalcolata) {
                                                capienzaCalcolata = f2.presenze;
                                              }
                                            })
                                          }
                                        })
                                        let stato;
                                        
                                        if(capienzaCalcolata !== 0) {
                                          if(((capienzaCalcolata >= Math.floor(capienza_attuale*0.90)) && capienzaCalcolata <= capienza_attuale) || (capienzaCalcolata < Math.floor(capienza_attuale*0.10))) {
                                            stato='anomalia';
                                          } else if (((capienzaCalcolata >= Math.floor(capienza_attuale*0.85)) && capienzaCalcolata <= capienza_attuale) || (capienzaCalcolata < Math.floor(capienza_attuale*0.25))) {
                                            stato='attenzione';
                                          } else {
                                            stato='ok';
                                          }
                                        } else {
                                          capienzaCalcolata = undefined;
                                        }
                                        
                                        switch(stato){ case 'ok': displayFirst = 'inline'; displaySecond = 'none'; displayThird = 'none'; break;
                                        case 'attenzione': displayFirst = 'none'; displaySecond = 'inline'; displayThird = 'none'; break;
                                        case 'anomalia': displayFirst = 'none'; displaySecond = 'none'; displayThird = 'inline'; break; 
                                        default: displayFirst = 'none'; displaySecond = 'none'; displayThird = 'none'; break; }
                                        
                                        return (
                                          <TableRow key={i}>
                                            <TableCell>{data}</TableCell>
                                            <TableCell>{ora_inizio + ' - ' + ora_fine}</TableCell>
                                            <TableCell><Link className='toClassroom' to={'/classroom/details/?aula_codice=' + classroom.aula_codice}>{classroom.aula_nome}</Link></TableCell>
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

export default TeachingDetails