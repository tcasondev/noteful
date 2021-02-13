import React from 'react';
import { Link } from 'react-router-dom'
import Note from '../Note/Note'
import NotefulContext from '../NotefulContext';
import PropTypes from 'prop-types'
import './NoteStorageFolder.css';

class NoteStorageFolder extends React.Component {
    static contextType = NotefulContext;

    render() {
        const { notes } = this.context;
        const filteredNotes = notes.filter(note => {
            // eslint-disable-next-line
            return note.assigned_folder == this.props.match.params.folderId;
        })
        const notesMap = filteredNotes.map(note => {
            return <Note
                key={note.id}
                id={note.id}
                name={note.note_name}
                modified={note.date_modified}
                folderId={note.assigned_folder}
                content={note.content}
            />
        });

        return (
            <div className='NoteStorage' >
                {notesMap}
                <Link
                    to={'/addNote'}>
                    <button>
                        Add New Note
                    </button>
                </Link>
            </div>
        )
    }
}

NoteStorageFolder.propTypes = {
    match: PropTypes.object
}

export default NoteStorageFolder;