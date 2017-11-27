import React from 'react';
import { withStyles } from 'material-ui/styles';
import Icon from 'material-ui/Icon';


const styles = () => ({
    imageContainer: {
        display: 'flex',
        position: 'relative',
        flex: 6,
        justifyContent: 'center',
        alignItems: 'end',
        overflow: 'hidden',
        borderTopLeftRadius: 2,
        borderTopRightRadius: 2,
    },
    cardImage: {},
    locationOverlay: {
        display: 'flex',
        alignItems: 'center',
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        padding: '5px 10px',
        textAlign: 'left',
        fontSize: '0.875rem',
        color: '#fff',
    },
    locationIcon: {
        fontSize: '1.25rem',
        marginRight: 5,
    },
});


const CardImage = (props) => {
    const {
        imageContainer,
        cardImage,
        locationOverlay,
        locationIcon
    } = props.classes;
    return (
        <div className={imageContainer}>
            <img className={cardImage} src={props.src} alt="user"/>
            <div className={locationOverlay}>
                <Icon className={locationIcon}>location_on</Icon> Los Angeles
            </div>
        </div>
    );
};


export default withStyles(styles)(CardImage);
