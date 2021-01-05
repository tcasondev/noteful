import React from 'react'
import NotefulContext from '../NotefulContext'
import PropTypes from 'prop-types'
import './SideBarNote.css'

class SideBarNote extends React.Component {
    static contextType = NotefulContext;

    render() {
        const { folders, notes } = this.context;
        const targetNote = notes.find(note => {
            return note.id === this.props.match.params.noteId;
        }) || { folderId: this.props.match.params.noteId }
        const targetFolder = folders.find(folder => {
            return folder.id === targetNote.folderId
        }) || { name: '' }

        return (
            <div className='SideBarNote'>
                <button className='back-button' onClick={() => this.props.history.goBack()}>
                    Go back!
                </button>
                <div className='location'>
                    <p>
                        You are currently in the {targetFolder.name} folder!
                    </p>
                </div>
            </div>
        )
    }
}

SideBarNote.propTypes = {
    history: PropTypes.object,
    match: PropTypes.object
}

export default SideBarNote;