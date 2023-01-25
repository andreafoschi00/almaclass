import { TextField } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import { Popup } from '../../containers';
import './courseDetails.css';
import { CartesianGrid, XAxis, YAxis, Tooltip, BarChart, Bar, Legend, PieChart, Pie, Cell } from 'recharts';

class CourseDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          corso_codice: new URLSearchParams(window.location.search).get('corso_codice'),
          error: null,
          isLoaded: false,
          items: [],
          teachings: [],
          searchText: '',
          openCharts: '',
          classroomsLocal: [],
          lessons: []
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
                  isLoaded: true,
                  teachings: result.body.result.records
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
                  isLoaded: true,
                  lessons: result.body.result.records
                });
              },
              (error) => {
                this.setState({
                  isLoaded: true,
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
            <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
              {`${(percent * 100).toFixed(0)}%`}
            </text>
          );
        };

        const { error, isLoaded, items, teachings, searchText, openCharts, classroomsLocal, lessons } = this.state;
        const course = items[0];

        let data = [], count = 0;

        lessons.forEach(c => {
          const data_t_format = new Date(c.inizio);
          const data_t = data_t_format.getDate()+ "/"+(data_t_format.getMonth()+1)+"/"+data_t_format.getFullYear();
          const classroom_attuale = classroomsLocal.filter((cl) => cl.id === c.aula_codice);
          if(classroom_attuale.length > 0) {
            count++;
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
          } else if (!isLoaded) {
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
                                  <CartesianGrid strokeDasharray="3 3" />
                                  <XAxis dataKey="month" />
                                  <YAxis />
                                  <Tooltip />
                                  <Legend />
                                  <Bar dataKey="reg" name='Regolare' stackId="a" fill="green" />
                                  <Bar dataKey="ris" name='A rischio' stackId="a" fill="orange" />
                                  <Bar dataKey="an" name='Anomalia' stackId="a" fill="red" />
                                </BarChart>
                                <div className="pie-chart-container">
                                  <h3>Lezioni svolte: {count}</h3>
                                  <PieChart width={500} height={500}>
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
                                        <Cell key={`cell-${index}`} fill={entry.color} />
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
                        <table>
                            <thead>
                                <tr>
                                    <th className='course_details_table_name'>Nome</th>
                                    <th className='course_details_table_language'>Lingua</th>
                                    <th className='course_details_table_teachers'>Docente</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredTeachings.map((insegnamento, i) => {
                                    return (
                                        <tr key={i}>
                                            <td><Link className='toTeaching' to={'/teaching/details/?componente_id=' + insegnamento.componente_id}>{insegnamento.materia_descrizione}</Link></td>
                                            <td>{insegnamento.lingua}</td>
                                            <td>{insegnamento.docente_nome}</td>
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

export default CourseDetails