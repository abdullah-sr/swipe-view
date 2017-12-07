import React, { Component } from 'react';
import { withStyles } from 'material-ui/styles';
import IconButton from 'material-ui/IconButton';
import Dialog from 'material-ui/Dialog';
import Cell from './Cell';
import UploadImageButton from './UploadImageButton';
import Loader from './Loader';
import { API_ENDPOINTS } from '../../constants';


const styles = () => ({
    grid: {
        width: '100%',
    },
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
            photos: [],
            isFetching: true,
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
                photos: [...this.state.photos, uploadRsponseJson[0].url],
            });
            console.log(uploadRsponseJson);
        } catch (error) {
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
                const photos = [];
                for (const photo of reponseJson.items) {
                    photos.push(photo.url);
                }
                this.setState({ photos });
            }
            console.log(reponseJson);
        } catch (error) {
            console.log(error);
        }
    }

    toggleDialog(src) {
        this.setState({ dialog: !this.state.dialog, dialogImage: src });
    }

    photosList() {
        const photos = this.state.photos.map((src) => {
            return (
                <Cell key={src}>
                    <IconButton className={this.props.classes.deleteIcon}>
                        <i className="material-icons">delete</i>
                    </IconButton>
                    <img
                        onClick={e => this.toggleDialog(src)}
                        className={this.props.classes.image}
                        src={src}/>

                </Cell>
            );
        });
        return photos;
    }

    render() {
        if (this.state.isFetching) {
            return (<Loader/>);
        }
        return (
            <div className={this.props.classes.grid}>
                {this.photosList()}
                <Cell>
                    <UploadImageButton onClickFileUpload={this.handleFileUpload}/>
                </Cell>
                <Dialog
                    open={this.state.dialog}
                    onRequestClose={this.toggleDialog}>
                    <img src={this.state.dialogImage}/>
                </Dialog>
            </div>
        );
    }
}


export default withStyles(styles)(Grid);
