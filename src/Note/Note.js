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
        fetch(`https://noteful-tanner-cason.herokuapp.com/api/note/${this.props.id}`, {
            method: 'DELETE',
            headers: {
                'content-type': 'application/json'
            },
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('There was an error in deletion')
                } else { deleteItem(this.props.id); }
                
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
        .number
        .isRequired,
    modified: PropTypes
        .string
        .isRequired,
    name: PropTypes
        .string
        .isRequired
}

export default Note;