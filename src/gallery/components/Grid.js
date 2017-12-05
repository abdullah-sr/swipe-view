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


class Grid extends Component {
    componentWillMount() {
        this.fetchPhotos();
    }

    async fetchPhotos() {
        try {
            const [, userId] = window.location.search.match(/userId=([^&]*)/);
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
                <Cell><UploadImageButton/></Cell>
            </div>
        );
    }
}


export default withStyles(styles)(Grid);
