import React from 'react';
import { Link } from 'react-router-dom';
import './courseDetails.css';


class CourseDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          corso_codice: new URLSearchParams(window.location.search).get('corso_codice'),
          error: null,
          isLoaded: false,
          items: [],
          teachings: []
        }
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
        fetch(`/api/courses/allteachings/?corso_codice=${this.state.corso_codice}`, {
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
    }

    render() {
        const { error, isLoaded, items, teachings } = this.state;
        const course = items[0];

        if (error) {
            return <div>Error: {error.message}</div>;
          } else if (!isLoaded) {
            return <div>Loading...</div>;
          } else if (!course) {
            return <div>Error: no course found</div>
          } else {
            return (
                <div className='course_details_container'>
                    <h1 className='course_details_name'>{course.corso_descrizione}</h1>
                    <h2 className='course_details_type'>Tipo di corso: {course.tipologia}</h2>
                    <h3 className='course_details_department'>Ambito: {course.ambiti}</h3>
                    <h3 className='course_details_access'>Accesso: {course.accesso}</h3>
                    <h3 className='course_details_language'>Lingue: {course.lingue.replace(' ', ', ')}</h3>
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
                                {teachings.map((insegnamento, i) => {
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
                    <div className='course_details_buttons'>
                        <button>Statistiche Corso</button>
                    </div>
                </div>
            )
        }
    }
}

export default CourseDetails