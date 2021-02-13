import React from 'react';
import SingleNote from '../SingleNote/SingleNote'
import NotefulContext from '../NotefulContext';
import ErrorBoundary from '../ErrorBoundary/ErrorBoundary'
import PropTypes from 'prop-types'
import './NoteStorageNote.css';

class NoteStorageNote extends React.Component {
    static contextType = NotefulContext;

    handleDeleteNote = () => {
        this.props.history.push('/')
    }

    render() {
        
        const { notes } = this.context;
        const targetNote = notes.find(note => {
            // eslint-disable-next-line
            return note.id == this.props.match.params.noteId
        }) || { id: '' }
    console.log(targetNote)
        return (
            <div className='NoteStorage' >
                <SingleNote
                    key={targetNote.id}
                    id={targetNote.id}
                    name={targetNote.note_name}
                    modified={targetNote.date_modified}
                    folderId={targetNote.assigned_folder}
                    onDeleteNote={this.handleDeleteNote}
                />
                <ErrorBoundary>
                    <p>
                        {targetNote.content}
                    </p>
                </ErrorBoundary>
            </div>
        )
    }
}

NoteStorageNote.propTypes = {
    history: PropTypes.object,
    match: PropTypes.object
}

export default NoteStorageNote;