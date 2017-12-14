import React from 'react';
import { withStyles } from 'material-ui/styles';
import { LinearProgress } from 'material-ui/Progress';
import { blue } from 'material-ui/colors';


const styles = () => ({
    container: {
        display: 'flex',
        height: '100%',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
    },
    root: {
        width: '75%',
        marginTop: 10,
    },
    primaryColor: {
        backgroundColor: blue[100],
    },
    primaryColorBar: {
        backgroundColor: blue[500],
    },
});


const Loader = (props) => {
    const { container, ...otherClasses } = props.classes;
    return (
        <div className={props.classes.container}>
            Uploading
            <LinearProgress classes={otherClasses}/>
        </div>
    );
};


export default withStyles(styles)(Loader);
