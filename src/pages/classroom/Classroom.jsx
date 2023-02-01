import React from 'react';
import './classroom.css';

import { Link } from 'react-router-dom';
import { FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';

function sortClassrooms(a, b, firstIndex, secondIndex) {
  const first = a.aula_nome.split(".");
  const second = b.aula_nome.split(".");
  const firstOne = first[firstIndex].replace(/\D/g, "");
  let firstTwo = first[secondIndex].replace(/\D/g, "");
  const secondOne = second[firstIndex].replace(/\D/g, "");
  let secondTwo = second[secondIndex].replace(/\D/g, "");

  if(firstTwo <= 9) {
    firstTwo = '0'+ firstTwo;
  }

  if(secondTwo <= 9) {
    secondTwo = '0' + secondTwo;
  }

  if(firstOne === secondOne) {
    return firstTwo - secondTwo;
  } else {
    return firstOne - secondOne;
  }
}

function checkText(aula_nome, searchText) {
  return aula_nome.toLowerCase().includes(searchText);
}

function checkFloor(aula_codice, floor) {
  switch(floor) {
    case 'Piano Terra':
      return aula_codice.includes('WPTE');
    case 'Piano Primo':
      return aula_codice.includes('WP01');
    case 'Piano Secondo':
      return aula_codice.includes('WP02');
    default:
      return false;
  }
}

class Classroom extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: [],
      searchText: '',
      floors: [],
      floor: ''
    }
  }

  handleChange = (event) => {
    this.setState({ floor: event.target.value});
  };

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
      fetch("/api/classroom/floors", {
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
              floors: result.body.result.records
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

  inputHandler = (e) => {
    let lowerCaseText = e.target.value.toLowerCase();
    this.setState({ searchText: lowerCaseText });
  }

  render() {
    const { error, isLoaded, items, searchText, floors, floor } = this.state;
    const classesNames = items.filter((item) => item.aula_nome.includes('AULA'));
    const laboratoriesNames = items.filter((item) => item.aula_nome.includes('LAB'));

    classesNames.sort(function(a,b) {
      return sortClassrooms(a,b,0,1);
    });

    laboratoriesNames.sort(function(a,b) {
      return sortClassrooms(a,b,1,2);
    });

    const filterClasses = classesNames.filter((el) => {
      if (searchText === '' && floor === '') {
        return el;
      }
      else if(searchText !== '' && floor === ''){
        return checkText(el.aula_nome, searchText);
      }
      else if(searchText === '' && floor !== '') {
        return checkFloor(el.aula_codice, floor);
      }
      else {
        return checkText(el.aula_nome, searchText) && checkFloor(el.aula_codice, floor);
      }
    })

    const filterLabs = laboratoriesNames.filter((el) => {
      if (searchText === '' && floor === '') {
        return el;
      }
      else if(searchText !== '' && floor === ''){
        return checkText(el.aula_nome, searchText);
      }
      else if(searchText === '' && floor !== '') {
        return checkFloor(el.aula_codice, floor);
      }
      else {
        return checkText(el.aula_nome, searchText) && checkFloor(el.aula_codice, floor);
      }
    })


    const classes = filterClasses.filter((item) => item.aula_nome.includes('AULA')).map((classroom) => <li key={classroom._id}><Link to={'/classroom/details/?aula_codice=' + classroom.aula_codice}>{classroom.aula_nome}</Link></li>);
    const laboratories = filterLabs.filter((item) => item.aula_nome.includes('LAB')).map((classroom) => <li key={classroom._id}><Link to={'/classroom/details/?aula_codice=' + classroom.aula_codice}>{classroom.aula_nome}</Link></li>);

    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <>
        <div className='classroom_controls'>
          <div className="classroom_controls_searchbar">
            <TextField
              id='outlined-basic'
              variant='outlined'
              label='Cerca'
              onChange={this.inputHandler}
              color='error'
              sx={{ backgroundColor: 'white', width: 200 }}
              />
          </div>
          <div className="classroom_controls_select">
            <FormControl sx={{ width: 200, backgroundColor: 'white' }} color='error'>
              <InputLabel id="select-label">Piano</InputLabel>
              <Select
                labelId="select-autowidth-label"
                id="select-autowidth-id"
                value={floor}
                onChange={this.handleChange}
                autoWidth
                label="Piano"
                >
                <MenuItem value=''>
                  <em>Tutti</em>
                </MenuItem>
                {floors.map((floor,i) => {
                  return <MenuItem key={i} value={floor.aula_piano}>{floor.aula_piano}</MenuItem>
                })}
              </Select>
            </FormControl>
          </div>
        </div>
          <div className='classroom_container_list'>
            <div className="classroom_container_box">
              <div className='classroom_container'>
                <h1 className='classroom_title'>Aule</h1>
                <ul className='classroom_list'>{classes}</ul>
              </div>
            </div>
            <div className="laboratory_container_box">
              <div className='laboratory_container'>
                <h1 className='laboratory_title'>Laboratori</h1>
                <ul className='laboratory_list'>{laboratories}</ul>
              </div>
            </div>
          </div>
        </>
      );
    }
  }
}

export default Classroom