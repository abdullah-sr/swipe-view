import React from 'react';
import { withStyles } from 'material-ui/styles';
import classNames from 'classnames';


const styles = () => ({
    cardImage: {
        minWidth: '100%',
        maxWidth: '100%',
        borderTopLeftRadius: 2,
        borderTopRightRadius: 2,
    },
});


const CardImage = (props) => {
    return (
        <div>
            <img className={props.classes.cardImage} src={props.src} alt="user" />
        </div>
    );
};


export default withStyles(styles)(CardImage);
