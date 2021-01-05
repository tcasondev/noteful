import React from 'react'
import NotefulContext from '../NotefulContext';
import PropTypes from 'prop-types'

class AddFolder extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            folderName: '',
        }
    }

    static contextType = NotefulContext;

    handleSubmit = e => {
        e.preventDefault();

        const { addFolder } = this.context;

        fetch('http://localhost:9090/folders', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: this.state.folderName }),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('We could not post this new folder')
                }
                return response.json();
            })
            .then(data => {
                addFolder(data);
                this.setState({ folderName: '' })
                this.props.history.goBack();
            })
            .catch(err => {
                alert(err);
            })
    }

    updateFolderName(newFolderName) {
        this.setState({ folderName: newFolderName })
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
                            disabled={!(this.state.folderName.length > 0)}>
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