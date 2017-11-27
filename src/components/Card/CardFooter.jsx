import React from 'react';
import { withStyles } from 'material-ui/styles';
import DealBreaker from '../DealBreaker';


const styles = () => ({
    cardFooter: {
        flex: 1,
        borderTop: '1px solid #b9b9b9',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
        position: 'relative',
    },
});


const CardFooter = (props) => {
    return (
        <div className={props.classes.cardFooter}>
            <DealBreaker/>
            <DealBreaker/>
            <DealBreaker/>
        </div>
    );
};


export default withStyles(styles)(CardFooter);
