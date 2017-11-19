import React from 'react';
import {withStyles} from 'material-ui/styles';
import classNames from 'classnames';
import SwipeView from './SwipeView';


const styles = () => ({

    '@global': {
        html: {
            height: '100%',
        },
        body: {
            height: 'calc(100% - 20px)',
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
        padding: '10px',
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
