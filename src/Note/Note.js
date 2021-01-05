import React from 'react';
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types';
import NotefulContext from '../NotefulContext';
import './Note.css'

class Note extends React.Component {
    static contextType = NotefulContext;

    deleteButton = (e) => {
        e.stopPropagation();
        const { deleteItem } = this.context;
        fetch(`http://localhost:9090/notes/${this.props.id}`, {
            method: 'DELETE',
            headers: {
                'content-type': 'application/json'
            },
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('There was an error in deletion')
                }
                return response.json();
            })
            .then(() => {
                deleteItem(this.props.id);
            })
            .catch(err => {
                alert(err)
            })
    }

    render() {
        let date = new Date(this.props.modified);
        let formatDate = `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;

        return (
            <div className='Note'>
                <Link to={`/note/${this.props.id}`}>
                    <h2>{this.props.name}</h2>
                </Link>
                <div className='note-details'>
                    <p>
                        Date Modified: {formatDate}
                    </p>
                    <button onClick={this.deleteButton}>
                        Delete
                    </button>
                </div>
            </div>
        )
    }
}

Note.propTypes = {
    id: PropTypes
        .string
        .isRequired,
    modified: PropTypes
        .string
        .isRequired,
    name: PropTypes
        .string
        .isRequired
}

export default Note;