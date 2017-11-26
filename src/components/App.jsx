import React from 'react';
import { withStyles } from 'material-ui/styles';
import classNames from 'classnames';
import SwipeView from './SwipeView';


const styles = () => ({

    '@global': {
        'html, body': {
            fontFamily: 'Roboto, sans-serif',
            height: '100%',
            margin: 0,
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
