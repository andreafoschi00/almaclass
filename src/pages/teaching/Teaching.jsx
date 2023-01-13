import React from 'react';
import { Link } from 'react-router-dom';
import './teaching.css';

class Teaching extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: []
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
      )
  }

  render() {
    const { error, isLoaded, items } = this.state;
    const teaching = items.map((teaching) => <li key={teaching.componente_id}><Link to={'/teaching/details/?componente_id=' + teaching.componente_id}>{teaching.materia_descrizione}</Link></li>);

    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <>
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