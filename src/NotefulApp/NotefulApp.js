import React from 'react';
import { Route, Switch } from 'react-router-dom'
import SideBar from '../SideBar/SideBar';
import SideBarFolder from '../SideBarFolder/SideBarFolder';
import SideBarNote from '../SideBarNote/SideBarNote';
import NoteStorage from '../NoteStorage/NoteStorage';
import NoteStorageFolder from '../NoteStorageFolder/NoteStorageFolder';
import NoteStorageNote from '../NoteStorageNote/NoteStorageNote';
import NotefulContext from '../NotefulContext'
import AddFolder from '../AddFolder/AddFolder'
import AddNote from '../AddNote/AddNote'
import './NotefulApp.css';

class NotefulApp extends React.Component {
    state = {
        notes: [],
        folders: []
    }

    getFolderData() {
        fetch(`https://noteful-tanner-cason.herokuapp.com/api/folder`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Hey, something went wrong')
                }
                return response.json()
            })
            .then(data => {
                this.setState({
                    folders: data
                })
            })
            .catch(err => {
                console.log(err)
            })
    }

    getNoteData() {
        fetch(`https://noteful-tanner-cason.herokuapp.com/api/note`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Hey, something went wrong')
                }
                return response.json()
            })
            .then(data => {
                this.setState({
                    notes: data
                })
            })
            .catch(err => {
                alert(err);
            })
    }

    deleteItem = (noteId) => {
        const filterState = this.state.notes.filter(note => {
            return note.id !== noteId;
        })

        this.setState({
            notes: filterState
        })
    }

    addFolder = (newFolder) => {
        const addState = [...this.state.folders, newFolder];
        this.setState({ folders: addState })
    }

    addNote = (newNote) => {
        const addNote = [...this.state.notes, newNote]
        this.setState({ notes: addNote })
    }

    componentDidMount() {
        this.getFolderData();
        this.getNoteData();
    }

    render() {
        const contextValue = {
            notes: this.state.notes,
            folders: this.state.folders,
            deleteItem: this.deleteItem,
            addFolder: this.addFolder,
            addNote: this.addNote
        }
        return (
            <div className='NotefulApp'>
                <NotefulContext.Provider
                    value={contextValue}>
                    <div className='flex-one'>
                        <Route exact path='/'
                            component={SideBar}
                        />
                        <Route path='/folder/:folderId'
                            component={SideBarFolder}
                        />
                        <Route path='/note/:noteId'
                            component={SideBarNote}
                        />
                    </div>
                    <div className='flex-three'>
                        <Switch>
                            <Route exact path='/'
                                component={NoteStorage}
                            />
                            <Route path='/folder/:folderId'
                                component={NoteStorageFolder}
                            />
                            <Route path='/note/:noteId'
                                component={NoteStorageNote}
                            />
                            <Route path='/addFolder'
                                component={AddFolder} />
                            <Route path='/addNote'
                                component={AddNote} />
                        </Switch>
                    </div>
                </NotefulContext.Provider>
            </div>
        )
    }
}

export default NotefulApp;