import React from 'react';
import { withStyles } from 'material-ui/styles';
import SwipeView from './SwipeView';


const styles = () => ({
    '@global': {
        'html, body': {
            fontFamily: 'Roboto, sans-serif',
            fontSize: 16,
            height: '100%',
            margin: 0,
            '@media (max-width: 320px)': {
                fontSize: 14,
            },
        },
    },
    app: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        maxWidth: '600px',
        margin: '0 auto',
        backgroundColor: '#f2f6f5',
    },
});


const App = (props) => {
    return (
        <div className={props.classes.app}>
            <SwipeView />
        </div>
    );
};


export default withStyles(styles)(App);
