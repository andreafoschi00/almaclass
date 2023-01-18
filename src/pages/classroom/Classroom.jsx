import React from 'react';
import './classroom.css';

import { Link } from 'react-router-dom';

function sortClassrooms(a,b, firstIndex, secondIndex) {
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

class Classroom extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: []
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
      )
  }

  render() {
    const { error, isLoaded, items } = this.state;
    const classesNames = items.filter((item) => item.aula_nome.includes('AULA'));
    const laboratoriesNames = items.filter((item) => item.aula_nome.includes('LAB'));

    classesNames.sort(function(a,b) {
      return sortClassrooms(a,b,0,1);
    });

    laboratoriesNames.sort(function(a,b) {
      return sortClassrooms(a,b,1,2);
    });

    const classes = classesNames.filter((item) => item.aula_nome.includes('AULA')).map((classroom) => <li key={classroom._id}><Link to={'/classroom/details/?aula_codice=' + classroom.aula_codice}>{classroom.aula_nome}</Link></li>);
    const laboratories = laboratoriesNames.filter((item) => item.aula_nome.includes('LAB')).map((classroom) => <li key={classroom._id}><Link to={'/classroom/details/?aula_codice=' + classroom.aula_codice}>{classroom.aula_nome}</Link></li>);

    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <>
          <div className='classroom_container_list'>
            <div className='classroom_container'>
              <h1 className='classroom_title'>Aule</h1>
              <ul className='classroom_list'>{classes}</ul>
            </div>
            <div className='laboratory_container'>
              <h1 className='laboratory_title'>Laboratori</h1>
              <ul className='laboratory_list'>{laboratories}</ul>
            </div>
          </div>
        </>
      );
    }
  }
}

export default Classroom