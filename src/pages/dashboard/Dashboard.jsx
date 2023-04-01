import React from 'react';
import './dashboard.css';
import { BasicCard } from '../../containers';
import { TextField } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import dayjs from 'dayjs';

function toCorrectFormat(date) {
  return date.getFullYear()+'-'+(date.getMonth()+1)+'-'+String(date.getDate()).padStart(2, '0')+'T'+String(date.getHours()).padStart(2, '0')+':'+String(date.getMinutes()).padStart(2, '0')+':'+String(date.getSeconds()).padStart(2, '0');
}

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded1: false,
      isLoaded2: false,
      isLoaded3: false,
      classrooms: [],
      searchText: '',
      date: toCorrectFormat(new Date()),
      lessons: [],
      classroomsLocal: []
    }
  }

  inputHandler = (e) => {
    let lowerCaseText = e.target.value.toLowerCase();
    this.setState({ searchText: lowerCaseText });
  }

  handleDateChange = (e) => {
    if(e) {
      this.setState({ date: toCorrectFormat(e.toDate()) });
      fetch(`/api/dashboard/alllessonsindate/?data='${toCorrectFormat(e.toDate())}'`, {
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
              lessons: result.body.result.records
            });
          },
          (error) => {
            this.setState({
              error
            });
          }
        );
    }
  }

  componentDidMount() {
    fetch("/api/classroom/", {
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
            classrooms: result.body.result.records
          });
        },
        (error) => {
          this.setState({
            isLoaded1: true,
            error
          });
        }
      );
      fetch(`/api/dashboard/alllessonsindate/?data='${this.state.date}'`, {
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
              lessons: result.body.result.records
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
                  this.setState({
                    isLoaded3: true,
                    classroomsLocal: result
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
    const { error, isLoaded1, isLoaded2, isLoaded3, classrooms, date, lessons, classroomsLocal, searchText } = this.state;

    classrooms.forEach((c) => {
      if(lessons.filter(l => l.aula_codice === c.aula_codice).length === 0) {
        lessons.push({
          aula_codice: c.aula_codice,
          aula_nome: c.aula_nome,
          componente_id: 0,
          inizio: '',
          fine: '',
          materia_descrizione: 'Nessuna lezione'
        })
      }
    });

    lessons.forEach(l => {
      classroomsLocal.forEach(cl => {
        if(l.aula_codice === cl.id) {
          l.capienza_aula = cl.capienza_aula;
        }
      })
    });

    let filteredLessons = lessons.filter((le) => {
      if (searchText === '') {
        return le;
      }
      else {
        return le.inizio.toLowerCase().includes(searchText) || le.fine.toLowerCase().includes(searchText) || le.materia_descrizione.toLowerCase().includes(searchText) || le.aula_nome.toLowerCase().includes(searchText);
      }
    });

    if(error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded1 || !isLoaded2 || !isLoaded3) {
      return <div>Loading...</div>;
    } else {
      return(
        <>
        <div className="dashboard">
          <div className="dashboard_filters">
            <div className='dashboard_controls'>
              <TextField
                id='outlined-basic'
                variant='outlined'
                label='Cerca'
                onChange={this.inputHandler}
                color='error'
                sx={{ backgroundColor: 'white', width: 200 }}
                />
            </div>
            <div className="dashboard_range_picker">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateTimePicker
                  label="Data e orario"
                  value={date}
                  minDate={dayjs('2022-01-01')}
                  maxDate={dayjs('2023-12-31')}
                  onChange={this.handleDateChange}
                  inputFormat='DD/MM/YYYY HH:mm'
                  renderInput={(params) => <TextField sx={{ backgroundColor: 'white', width: 200 }} {...params} />}
                  />
              </LocalizationProvider>
            </div>
          </div>
          <div className="dashboard_container">
            {filteredLessons.map((element, key) => <BasicCard props={element} key={key}/>)}
          </div>
        </div>
        </>
      )
    }
  }
}

export default Dashboard