import React from 'react';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';

const styles = () => ({
    emptyView: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        width: '100%',
        height: '100%',
        '& img': {
            borderRadius: '50%',
            width: '25%',
            border: '2px solid #9c9c9c',
            marginTop: 'auto',
            marginBottom: 70,
        },
    },
    button: {
        color: '#fff',
        backgroundColor: '#0072d0',
        borderRadius: 5,
        textTransform: 'none',
        padding: '0',
        width: '80%',
        fontSize: '0.9rem',
        fontWeight: 400,
        marginBottom: 15,
        '&:hover': {
            backgroundColor: '#2786d0',
        },
    },
});


const EmptyView = (props) => {
    const { classes } = props;
    return (
        <div className={classes.emptyView}>
            <img src={props.facebookId}/>
            <div style={{ marginTop: 'auto', width: '100%' }}>
                <div style={{ marginBottom: 20 }}>
                    That's everyone in your area
                </div>
                <Button className={classes.button} onClick={props.onClickFilter}>
                    Adjust Filters
                </Button>
                <Button className={classes.button} onClick={props.fetchUsersData}>
                    Scan Again
                </Button>
                <Button className={classes.button} onClick={props.onClickFeedback}>
                    Why can't you find a roommate?
                </Button>
            </div>
        </div>
    );
};


export default withStyles(styles)(EmptyView);
