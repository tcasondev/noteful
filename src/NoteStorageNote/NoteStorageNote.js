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
            return note.id === this.props.match.params.noteId
        }) || { id: '' }

        return (
            <div className='NoteStorage' >
                <SingleNote
                    key={targetNote.id}
                    id={targetNote.id}
                    name={targetNote.name}
                    modified={targetNote.modified}
                    folderId={targetNote.folderId}
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