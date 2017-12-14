import React, { Component } from 'react';
import { withStyles } from 'material-ui/styles';
import IconButton from 'material-ui/IconButton';
import Dialog from 'material-ui/Dialog';
import Cell from './Cell';
import UploadImageButton from './UploadImageButton';
import Loader from './Loader';
import Uploading from './Uploading';
import { API_ENDPOINTS } from '../../constants';


const styles = () => ({
    resposiveWidth: {
        width: '100%',
    },
    image: {
        borderRadius: 2,
        position: 'absolute',
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        cursor: 'pointer',
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
        this.toggleDialog = this.toggleDialog.bind(this);
        this.state = {
            photos: [],
            isFetching: true,
            uploading: false,
            dialog: false,
            dialogImage: '',
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
            this.setState({ uploading: true });
            const requestUploadResponse = await fetch(`${API_ENDPOINTS.requestUpload}`);
            const requestUploadJson = await requestUploadResponse.json();
            const formData = new FormData();
            formData.append('files', file);
            formData.append('userId', userId);
            const uploadRsponse = await fetch(requestUploadJson.url, {
                method: 'POST',
                body: formData,
            });
            const uploadRsponseJson = await uploadRsponse.json();
            this.setState({
                photos: [...this.state.photos, uploadRsponseJson[0]],
                uploading: false,
            });
            console.log(uploadRsponseJson);
        } catch (error) {
            this.setState({ uploading: false });
            console.log(error);
        }
    }

    async fetchPhotos() {
        try {
            const response = await fetch(`${API_ENDPOINTS.photos(userId)}`);
            const reponseJson = await response.json();
            this.setState({
                isFetching: false,
            });
            if (reponseJson.items) {
                this.setState({ photos: reponseJson.items });
            }
            console.log(reponseJson);
        } catch (error) {
            console.log(error);
        }
    }

    toggleDialog(src) {
        this.setState({ dialog: !this.state.dialog, dialogImage: src || '' });
    }

    async deletePhoto(uploadId) {
        try {
            await fetch(`${API_ENDPOINTS.deletePhoto(uploadId)}?userId=${userId}`, {
                method: 'DELETE',
            });
            this.setState({
                photos: this.state.photos.filter(photo => !photo.key.name.includes(uploadId))
            });
        } catch (error) {
            console.log(error);
        }
    }

    photosList() {
        const photos = this.state.photos.map((photo) => {
            const [uploadId] = photo.key.name.match(/[^\/]*$/);
            return (
                <Cell key={uploadId}>
                    <IconButton
                        className={this.props.classes.deleteIcon}
                        onClick={() => this.deletePhoto(uploadId)}
                    >
                        <i className="material-icons">delete</i>
                    </IconButton>
                    <img
                        onClick={() => this.toggleDialog(photo.url)}
                        className={this.props.classes.image}
                        src={photo.url}/>

                </Cell>
            );
        });
        return photos;
    }

    render() {
        if (this.state.isFetching) {
            return (<Loader/>);
        }
        if (this.state.uploading) {
            return (<Uploading/>);
        }
        return (
            <div className={this.props.classes.resposiveWidth}>
                {this.photosList()}
                <Cell>
                    <UploadImageButton onClickFileUpload={this.handleFileUpload}/>
                </Cell>
                <Dialog
                    open={this.state.dialog}
                    onRequestClose={() => this.toggleDialog()}>
                    <img className={this.props.classes.resposiveWidth} src={this.state.dialogImage}/>
                </Dialog>
            </div>
        );
    }
}


export default withStyles(styles)(Grid);
