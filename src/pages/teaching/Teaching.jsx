import { FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import './teaching.css';

class Teaching extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: [],
      searchText: '',
      types: [],
      languages: [],
      type: '',
      language: ''
    }
  }

  componentDidMount() {
    fetch("/api/teachings/", {
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
      fetch("/api/teachings/types", {
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
        );
        fetch("/api/teachings/languages", {
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
                languages: result.body.result.records
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

  inputHandler = (e) => {
    let lowerCaseText = e.target.value.toLowerCase();
    this.setState({ searchText: lowerCaseText });
  }

  handleTypeChange = (event) => {
    this.setState({ type: event.target.value });
  }

  handleLanguageChange = (event) => {
    this.setState({ language: event.target.value });
  }

  render() {
    const { error, isLoaded, items, searchText, languages, types, language, type } = this.state;
    
    const filteredTeachings = items.filter((el) => {
      if (searchText === '' && type === '' && language === '') {
        return el;
      }
      else if(searchText !== '' && type === '' && language === ''){
        return el.materia_descrizione.toLowerCase().includes(searchText);
      }
      else if(searchText === '' && type !== '' && language === ''){
        return el.tipo === type;
      }
      else if(searchText === '' && type === '' && language !== ''){
        return el.lingua === language;
      } else if(searchText !== '' && type !== '' && language === ''){
        return el.materia_descrizione.toLowerCase().includes(searchText) && el.tipo === type;
      } else if (searchText !== '' && type === '' && language !== '') {
        return el.materia_descrizione.toLowerCase().includes(searchText) && el.lingua === language;
      } else if (searchText === '' && type !== '' && language !== '') {
        return el.tipo === type && el.lingua === language;
      } else {
        return el.materia_descrizione.toLowerCase().includes(searchText) && el.tipo === type && el.lingua === language;
      }
    })

    const teaching = filteredTeachings.map((teaching) => <li key={teaching.componente_id}><Link to={'/teaching/details/?componente_id=' + teaching.componente_id}>{teaching.materia_descrizione}</Link></li>);

    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <>
          <div className='teaching_controls'>
            <div className="teaching_cotrols_searchbar">
              <TextField
                id='outlined-basic'
                variant='outlined'
                label='Cerca'
                onChange={this.inputHandler}
                color='error'
                sx={{ backgroundColor: 'white', width: 200 }}
                />
            </div>
            <div className="teaching_controls_select_type">
              <FormControl sx={{ width: 200 }} color='error'>
                <InputLabel id="type-select-label">Tipo</InputLabel>
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
                    return <MenuItem key={i} value={type.tipo}>{type.tipo}</MenuItem>
                  })}
                </Select>
              </FormControl>
          </div>
          <div className="course_controls_select_language">
            <FormControl sx={{ width: 200 }} color='error'>
              <InputLabel id="language-select-label">Lingua</InputLabel>
              <Select
                labelId="language-select-autowidth-label"
                id="language-select-autowidth-id"
                value={language}
                onChange={this.handleLanguageChange}
                autoWidth
                label="Lingua"
                >
                <MenuItem value=''>
                  <em>Tutte</em>
                </MenuItem>
                {languages.map((language,i) => {
                  return <MenuItem key={i} value={language.lingua}>{language.lingua}</MenuItem>
                })}
              </Select>
            </FormControl>
          </div>
          </div>
          <div className='teaching_container_list'>
            <div className='teaching_container'>
              <h1 className='teaching_title'>Insegnamenti</h1>
              <ul className='teaching_list'>{teaching}</ul>
            </div>
          </div>
        </>
      );
    }
  }
}

export default Teaching