import React, { Component } from 'react';
import { withStyles } from 'material-ui/styles';
import IconButton from 'material-ui/IconButton';
import Cell from './Cell';
import UploadImageButton from './UploadImageButton';
import { API_ENDPOINTS } from '../../constants';


const styles = () => ({
    image: {
        borderRadius: 2,
        position: 'absolute',
        width: '100%',
        height: '100%',
        objectFit: 'cover',
    },
    deleteIcon: {
        zIndex: 5,
        position: 'absolute',
        left: 0,
        top: 0,
    },
});

const [, userId] = window.location.search.match(/userId=([^&]*)/);

class Grid extends Component {
    constructor(props) {
        super(props);
        this.handleFileUpload = this.handleFileUpload.bind(this);
        this.state = {
            fileInput: null,
        };
    }

    componentWillMount() {
        this.fetchPhotos();
    }

    handleFileUpload(event) {
        const file = event.target.files[0];
        // if file isn't an image or its larger than 10 MB, do nothing.
        if (!file.type.match('image.*') || file.size > 10485760) {
            return;
        }
        this.uploadPhoto(file);
    }

    async uploadPhoto(file) {
        try {
            const requestUploadResponse = await fetch(`${API_ENDPOINTS.requestUpload}`);
            const requestUploadJson = await requestUploadResponse.json();
            const formData = new FormData();
            formData.append('files', file);
            formData.append('userId', userId);
            const headers = { 'Content-Type': 'multipart/form-data' };
            debugger;
            const uploadRsponse = await fetch(requestUploadJson.url, {
                method: 'POST',
                body: formData,
                headers,
            });
            const uploadRsponseJson = await uploadRsponse.json();
            console.log(uploadRsponseJson);
        } catch (error) {
            console.log(error);
        }
    }

    async fetchPhotos() {
        try {
            const response = await fetch(`${API_ENDPOINTS.photos(userId)}`);
            const reponseJson = await response.json();
            console.log(reponseJson);
        } catch (error) {
            console.log(error);
        }
    }

    render() {
        const classes = this.props.classes;
        return (
            <div>
                <Cell>
                    <IconButton className={classes.deleteIcon} aria-label="Delete">
                        <i className="material-icons">delete</i>
                    </IconButton>
                    <img
                        className={classes.image}
                        src="https://c4.staticflickr.com/9/8887/28897124891_98c4fdd82b_b.jpg"/>

                </Cell>
                <Cell><UploadImageButton onClickFileUpload={this.handleFileUpload}/></Cell>
            </div>
        );
    }
}


export default withStyles(styles)(Grid);
