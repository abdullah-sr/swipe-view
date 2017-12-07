import React from 'react';
import { withStyles } from 'material-ui/styles';
import { CircularProgress } from 'material-ui/Progress';
import { blue } from 'material-ui/colors';


const styles = () => ({
    container: {
        display: 'flex',
        height: '100%',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
});


const Loader = (props) => {
    return (
        <div className={props.classes.container}>
            <CircularProgress size={50} style={{ color: blue[500] }}/>
        </div>
    );
};


export default withStyles(styles)(Loader);
