import React from 'react';
import { Link } from 'react-router-dom';
import './course.css';

class Course extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: []
    }
  }

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
      )
  }

  render() {
    const { error, isLoaded, items } = this.state;
    const courses = items.map((course) => <li key={course.corso_codice}><Link to={'/course/details/?corso_codice=' + course.corso_codice}>{course.corso_descrizione}</Link></li>);

    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <>
        <div className='course_container_list'>
          <div className='course_container'>
            <h1 className='course_title'>Corsi</h1>
            <ul className='course_list'>{courses}</ul>
          </div>
        </div>
        </>
      );
    }
  }
}

export default Course