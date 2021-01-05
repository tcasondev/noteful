import React from 'react';
import Note from '../Note/Note'
import NotefulContext from '../NotefulContext'
import { Link } from 'react-router-dom'
import './NoteStorage.css';
import ErrorBoundary from '../ErrorBoundary/ErrorBoundary';

class NoteStorage extends React.Component {
    static contextType = NotefulContext;

    render() {
        const { notes } = this.context;
        const notesMap = notes.map(note => {
            return (
                <Note
                    key={note.id}
                    id={note.id}
                    name={note.name}
                    modified={note.modified}
                    folderId={note.folderId}
                    content={note.content}
                    singleNote={note}
                />
            )
        });

        return (
            <div className='NoteStorage' >
                <ErrorBoundary>
                    {notesMap}
                </ErrorBoundary>
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

export default NoteStorage;