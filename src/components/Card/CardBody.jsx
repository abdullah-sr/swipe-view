import React from 'react';
import { withStyles } from 'material-ui/styles';
import classNames from 'classnames';


const styles = () => ({
    cardBody: {
        position: 'relative',
        padding: '15px 10px',
        overflow: 'hidden',
    },
});


const CardBody = (props) => {
    return (
        <div className={props.classes.cardBody}>
            {props.children}
        </div>
    );
};


export default withStyles(styles)(CardBody);
