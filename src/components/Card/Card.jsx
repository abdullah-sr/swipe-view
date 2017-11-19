import React from 'react';
import { withStyles } from 'material-ui/styles';
import classNames from 'classnames';


const styles = () => ({
    card: {
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '0 5px 8px rgba(0, 0, 0, 0.19), 0 1px 3px rgba(0, 0, 0, 0.23)',
        backgroundColor: '#FFFFFF',
        borderRadius: '2px',
        width: '100%',
    },
});


const Card = (props) => {
    const className = classNames(props.classes.card, props.className);
    return (
        <div className={className} style={props.style}>
            {props.children}
        </div>
    );
};


export default withStyles(styles)(Card);
