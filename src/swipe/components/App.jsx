import React from 'react';
import { MuiThemeProvider, createMuiTheme, withStyles } from 'material-ui/styles';
import SwipeView from './SwipeView';


const theme = createMuiTheme({
    typography: {
        // Use the system font.
        fontFamily: 'overpass',
    },
});

const styles = () => ({
    '@global': {
        'html, body': {
            fontFamily: 'overpass, sans-serif',
            fontSize: 16,
            height: '100%',
            margin: 0,
            backgroundColor: '#eaeaea',
            '@media (max-width: 320px)': {
                fontSize: 14,
            },
        },
        // '.overpass': {
        //     '&-3': {
        //         marginBottom: -3,
        //     },
        //     '&-4': {
        //         marginBottom: -4,
        //     },
        // },
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
        <MuiThemeProvider theme={theme}>
            <div className={props.classes.app}>
                <SwipeView/>
            </div>
        </MuiThemeProvider>
    );
};


export default withStyles(styles)(App);
