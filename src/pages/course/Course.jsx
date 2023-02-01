import { FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import './course.css';

class Course extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: [],
      scopes: [],
      types: [],
      searchText: '',
      scope: '',
      type: ''
    }
  }

  inputHandler = (e) => {
    let lowerCaseText = e.target.value.toLowerCase();
    this.setState({ searchText: lowerCaseText });
  }

  handleScopeChange = (event) => {
    this.setState({ scope: event.target.value});
  };

  handleTypeChange = (event) => {
    this.setState({ type: event.target.value});
  };

  componentDidMount() {
    fetch("/api/courses", {
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
      fetch("/api/courses/scopes", {
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
              scopes: result.body.result.records
            });
          },
          (error) => {
            this.setState({
              isLoaded: true,
              error
            });
          }
        );
        fetch("/api/courses/types", {
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
                types: result.body.result.records
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
    const { error, isLoaded, items, searchText, scopes, types, scope, type } = this.state;

    const filteredCourses = items.filter((el) => {
      if (searchText === '' && scope === '' && type === '') {
        return el;
      }
      else if(searchText !== '' && scope === '' && type === ''){
        return el.corso_descrizione.toLowerCase().includes(searchText);
      }
      else if(searchText === '' && scope !== '' && type === ''){
        return el.ambiti === scope;
      }
      else if(searchText === '' && scope === '' && type !== ''){
        return el.tipologia === type;
      } else if(searchText !== '' && scope !== '' && type === ''){
        return el.corso_descrizione.toLowerCase().includes(searchText) && el.ambiti === scope;
      } else if (searchText !== '' && scope === '' && type !== '') {
        return el.corso_descrizione.toLowerCase().includes(searchText) && el.tipologia === type;
      } else if (searchText === '' && scope !== '' && type !== '') {
        return el.ambiti === scope && el.tipologia === type;
      } else {
        return el.corso_descrizione.toLowerCase().includes(searchText) && el.ambiti === scope && el.tipologia === type;
      }
    })

    const courses = filteredCourses.map((course) => <li key={course.corso_codice}><Link to={'/course/details/?corso_codice=' + course.corso_codice}>{course.corso_descrizione}</Link></li>);

    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <>
        <div className='course_controls'>
          <div className="course_controls_searchbar">
            <TextField
              id='outlined-basic'
              variant='outlined'
              label='Cerca'
              onChange={this.inputHandler}
              color='error'
              sx={{ backgroundColor: 'white', width: 200 }}
              />
          </div>
          <div className="course_controls_select_scope">
            <FormControl sx={{ width: 200, backgroundColor: 'white' }} color='error'>
              <InputLabel id="scope-select-label">Ambito</InputLabel>
              <Select
                labelId="scope-select-autowidth-label"
                id="scope-select-autowidth-id"
                value={scope}
                onChange={this.handleScopeChange}
                autoWidth
                label="Ambito"
                >
                <MenuItem value=''>
                  <em>Tutti</em>
                </MenuItem>
                {scopes.map((scope,i) => {
                  return <MenuItem key={i} value={scope.ambiti}>{scope.ambiti}</MenuItem>
                })}
              </Select>
            </FormControl>
          </div>
          <div className="course_controls_select_type">
            <FormControl sx={{ width: 200, backgroundColor: 'white' }} color='error'>
              <InputLabel id="select-label">Tipo</InputLabel>
              <Select
                labelId="type-select-autowidth-label"
                id="type-select-autowidth-id"
                value={type}
                onChange={this.handleTypeChange}
                autoWidth
                label="Tipo"
                >
                <MenuItem value=''>
                  <em>Tutti</em>
                </MenuItem>
                {types.map((type,i) => {
                  return <MenuItem key={i} value={type.tipologia}>{type.tipologia}</MenuItem>
                })}
              </Select>
            </FormControl>
          </div>
        </div>
        <div className='course_container_list'>
          <div className="course_container_box">
            <div className='course_container'>
              <h1 className='course_title'>Corsi</h1>
              <ul className='course_list'>{courses}</ul>
            </div>
          </div>
        </div>
        </>
      );
    }
  }
}

export default Course