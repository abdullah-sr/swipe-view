import React from 'react';
import { withStyles } from 'material-ui/styles';


const styles = () => ({
    container: {
        position: 'relative',
        float: 'left',
        width: 'calc(50% - 6px)',
        margin: 3,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        '&:before': {
            content: '""',
            display: 'block',
            paddingTop: '100%',
        },
    },
});


const Cell = (props) => {
    return (
        <div className={props.classes.container}>
            {props.children}
        </div>
    );
};


export default withStyles(styles)(Cell);
