import React from 'react'
import NotefulContext from '../NotefulContext';
import PropTypes from 'prop-types'

class AddFolder extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            folder_name: '',
        }
    }

    static contextType = NotefulContext;

    handleSubmit = e => {
        e.preventDefault();

        const { addFolder } = this.context;

        fetch('https://noteful-tanner-cason.herokuapp.com/api/folder', {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': `${process.env.API_TOKEN}`
            },
            body: JSON.stringify({ name: this.state.folder_name }),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('We could not post this new folder')
                }
                return response.json();
            })
            .then(data => {
                addFolder(data);
                this.setState({ folder_name: '' })
                this.props.history.goBack();
            })
            .catch(err => {
                alert(err);
            })
    }

    updateFolderName(newFolderName) {
        this.setState({ folder_name: newFolderName })
    }

    render() {
        return (
            <div className='AddFolder'>
                <form className='newFolderForm' onSubmit={e => this.handleSubmit(e)}>
                    <fieldset>
                        <legend>New Folder!</legend>
                        <label htmlFor='folderName'>Enter your folder name here:</label>
                        <br></br>
                        <input type='text' name='folderName' id='folderName'
                            value={this.state.folderName}
                            onChange={e => this.updateFolderName(e.target.value)} />
                        <br></br>
                        <button type='submit'
                            disabled={!(this.state.folder_name.length > 0)}>
                            Create New Folder!
                        </button>
                    </fieldset>
                </form>
                <button onClick={() => this.props.history.goBack()}>
                    Cancel
                </button>
            </div>
        )
    }
}

AddFolder.propTypes = {
    history: PropTypes.object,
}

export default AddFolder;