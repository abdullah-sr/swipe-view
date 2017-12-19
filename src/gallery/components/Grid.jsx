import React, { Component } from 'react';
import { withStyles } from 'material-ui/styles';
import IconButton from 'material-ui/IconButton';
import Dialog from 'material-ui/Dialog';
import Cell from './Cell';
import UploadImageButton from './UploadImageButton';
import Loader from './Loader';
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
    deleteBtn: {
        zIndex: 5,
        position: 'absolute',
        left: 0,
        top: 0,
    },
    deleteOverlay: {
        position: 'absolute',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        width: '100%',
        height: '100%',
        display: 'flex',
        borderRadius: 2,
        zIndex: 5,
        pointerEvents: 'none',
    },
    imageDalog: {
        overflowY: 'inherit',
    },
    closeDialogBtn: {
        position: 'absolute',
        zIndex: 5,
        right: -10,
        top: -40,
        color: '#fff',
    },
});

const [, USER_ID] = window.location.search.match(/userId=([^&]*)/);
const [, MY_ID] = window.location.search.match(/myId=([^&]*)/);

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
            formData.append('userId', USER_ID);
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
            const response = await fetch(`${API_ENDPOINTS.photos(USER_ID)}`);
            const reponseJson = await response.json();
            this.setState({
                isFetching: false,
            });
            const photos = reponseJson.items;
            if (photos) {
                for (const photo of photos) {
                    // add a new key to each of the photos so we can display a delete indicator when state changes
                    photo.deleting = false;
                }
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
            // change photo 'deleting' state
            const photos = this.state.photos.map((photo) => {
                if (photo.key.name.includes(uploadId)) {
                    return { ...photo, deleting: true };
                }
                return photo;
            });
            this.setState({ photos });
            await fetch(`${API_ENDPOINTS.deletePhoto(uploadId)}?userId=${USER_ID}`, {
                method: 'DELETE',
            });
            this.setState({
                photos: photos.filter(photo => !photo.key.name.includes(uploadId))
            });
        } catch (error) {
            // change photo 'deleting' state
            const photos = this.state.photos.map((photo) => {
                if (photo.key.name.includes(uploadId)) {
                    return { ...photo, deleting: false };
                }
                return photo;
            });
            this.setState({ photos });
            console.log(error);
        }
    }

    photosList() {
        const photos = this.state.photos.map((photo) => {
            const [uploadId] = photo.key.name.match(/[^\/]*$/);
            return (
                <Cell key={uploadId}>
                    {MY_ID === USER_ID ? (
                        <IconButton
                            className={this.props.classes.deleteBtn}
                            onClick={() => this.deletePhoto(uploadId)}
                        >
                            <i className="material-icons">delete</i>
                        </IconButton>
                    ) : ''
                    }
                    <img
                        onClick={() => this.toggleDialog(photo.url)}
                        className={this.props.classes.image}
                        src={photo.url}/>
                    {
                        photo.deleting ? (
                            <div className={this.props.classes.deleteOverlay}>
                                <Loader/>
                            </div>
                        ) : ''
                    }

                </Cell>
            );
        });
        return photos;
    }

    render() {
        const { props, state } = this;
        if (state.isFetching) {
            return (<Loader/>);
        }
        return (
            <div className={props.classes.resposiveWidth}>
                {this.photosList()}
                {
                    MY_ID === USER_ID ? (
                        <Cell>
                            <UploadImageButton uploading={state.uploading} onClickFileUpload={this.handleFileUpload}/>
                        </Cell>
                    ) : ''
                }
                <Dialog
                    classes={{ paper: props.classes.imageDalog }}
                    open={state.dialog}
                    onClose={() => this.toggleDialog()}>

                    <IconButton
                        className={props.classes.closeDialogBtn}
                        onClick={() => this.toggleDialog()}
                    >
                        <i className="material-icons">close</i>
                    </IconButton>
                    <img className={props.classes.resposiveWidth} src={state.dialogImage}/>
                </Dialog>
            </div>
        );
    }
}


export default withStyles(styles)(Grid);
