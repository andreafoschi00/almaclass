import React from 'react';
import './teachingDetails.css';

import { MdOutlineDone, MdError } from 'react-icons/md';
import { AiOutlineWarning } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { TextField } from '@mui/material';
import DateRangePicker from '@wojtekmaj/react-daterange-picker'
import { Popup } from '../../containers';
import { Area, AreaChart, CartesianGrid, LabelList, ReferenceLine, XAxis, YAxis, Tooltip, BarChart, Bar, Legend, PieChart, Pie, Cell } from 'recharts';

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
      const RADIAN = Math.PI / 180;
      const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
      const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
      const x = cx + radius * Math.cos(-midAngle * RADIAN);
      const y = cy + radius * Math.sin(-midAngle * RADIAN);

        return (
          <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
            {`${(percent * 100).toFixed(0)}%`}
          </text>
        );
      };

        let displayFirst, displaySecond, displayThird;
        const { error, isLoaded, items, classrooms, searchText, classroomsLocal, dates, openChartsClassrooms, openChartsTeaching } = this.state;
        const teaching = items[0];

        let classroomsData = [], data2=[];

        classrooms.forEach(c => {
          if(classroomsData.length === 0 || classroomsData.filter(c2 => c2.aula_nome === c.aula_nome).length === 0) {
            const classroom_attuale = classroomsLocal.filter((cl) => cl.id === c.aula_codice);
            const capienza_attuale = classroom_attuale[0].capienza_aula
            classroomsData.push({
              aula_nome: c.aula_nome,
              capienza: capienza_attuale,
              lezioni: []
            })
          }
        });

        classrooms.forEach(c => {
          const data_t_format = new Date(c.inizio);
          const data_t = data_t_format.getDate()+ "/"+(data_t_format.getMonth()+1)+"/"+data_t_format.getFullYear();
          const classroom_attuale = classroomsLocal.filter((cl) => cl.id === c.aula_codice);
          const capienza_attuale = classroom_attuale[0].capienza_aula;
          const capienzaCalcolata = Math.floor(Math.random() * ((capienza_attuale + 5) - 10 + 1)) + 10;

          let reg=0, ris=0, an=0;
          
          if(((capienzaCalcolata >= Math.floor(capienza_attuale*0.95)) && capienzaCalcolata <= capienza_attuale) || (capienzaCalcolata < Math.floor(capienza_attuale*0.15))) {
            ris=1;
          } else if (capienzaCalcolata > capienza_attuale) {
            an=1;
          } else {
            reg=1;
          }

          data2.push({
            data: data_t,
            ris: ris,
            an: an,
            reg: reg
          })
        });

        classrooms.forEach(c => {
          classroomsData.forEach(c2 => {
            if(c.aula_nome === c2.aula_nome) {
              const dateFormat = new Date(c.inizio);
              const dateFormat2 = new Date(c.fine);
              const data = dateFormat.getDate()+ "/"+(dateFormat.getMonth()+1)+"/"+dateFormat.getFullYear();
              const ora_inizio = dateFormat.getHours()+":"+String(dateFormat.getMinutes()).padStart(2, '0');
              const ora_fine = dateFormat2.getHours()+":"+String(dateFormat.getMinutes()).padStart(2, '0');
              const capienza_attuale = c2.capienza;
              c2.lezioni.push({
                data: data + ' ' + ora_inizio + '-' + ora_fine,
                presenze: Math.floor(Math.random() * ((capienza_attuale + 5) - 10 + 1)) + 10
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
            color: 'green'
          },
          { 
            name: 'A rischio',
            value: 0,
            color: 'orange'
          },
          { 
            name: 'Anomalia',
            value: 0,
            color: 'red'
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
                        </>}
                      handleClose={this.toggleChartsClassrooms}
                    />}
                  <input type='button' className='button' value='Statistiche insegnamento' onClick={this.toggleChartsTeaching} />
                    { openChartsTeaching && <Popup
                      content={
                        <>
                          <h1>Lezioni in sintesi</h1>
                          <h3>Lezioni totali: {filteredClassrooms.length}</h3>
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
                              <CartesianGrid strokeDasharray="3 3" />
                              <XAxis dataKey="month" />
                              <YAxis />
                              <Tooltip />
                              <Legend />
                              <Bar dataKey="reg" name='Regolare' stackId="a" fill="green" />
                              <Bar dataKey="ris" name='A rischio' stackId="a" fill="orange" />
                              <Bar dataKey="an" name='Anomalia' stackId="a" fill="red" />
                            </BarChart>
                            <PieChart width={500} height={500}>
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
                                  <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                              </Pie>
                            </PieChart>
                          </div>
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