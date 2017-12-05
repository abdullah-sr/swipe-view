import React, { Component } from 'react';
import { withStyles } from 'material-ui/styles';
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
                <Cell><img className={classes.image}
                           src="https://c4.staticflickr.com/9/8887/28897124891_98c4fdd82b_b.jpg"/></Cell>
                <Cell><img className={classes.image}
                           src="https://c4.staticflickr.com/9/8887/28897124891_98c4fdd82b_b.jpg"/></Cell>
                <Cell><img className={classes.image}
                           src="https://c4.staticflickr.com/9/8887/28897124891_98c4fdd82b_b.jpg"/></Cell>
                <Cell><img className={classes.image}
                           src="https://farm5.staticflickr.com/4573/23979346767_bb563b1540_b.jpg"/></Cell>
                <Cell><img className={classes.image}
                           src="https://farm5.staticflickr.com/4573/23979346767_bb563b1540_b.jpg"/></Cell>
                <Cell><img className={classes.image}
                           src="https://farm5.staticflickr.com/4573/23979346767_bb563b1540_b.jpg"/></Cell>
                <Cell><img className={classes.image}
                           src="https://c4.staticflickr.com/9/8887/28897124891_98c4fdd82b_b.jpg"/></Cell>
                <Cell><img className={classes.image}
                           src="https://c4.staticflickr.com/9/8887/28897124891_98c4fdd82b_b.jpg"/></Cell>
                <Cell><img className={classes.image}
                           src="https://c4.staticflickr.com/9/8887/28897124891_98c4fdd82b_b.jpg"/></Cell>
                <Cell><UploadImageButton/></Cell>
            </div>
        );
    }
}


export default withStyles(styles)(Grid);
