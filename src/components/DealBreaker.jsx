import React from 'react';
import { withStyles } from 'material-ui/styles';


const styles = () => ({
    container: {
        height: '100%',
        fontSize: '0.75rem',
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden'
    },
    image: {
        height: '70%',
    },
});


const DealBreaker = (props) => {
    const { container, image } = props.classes;
    return (
        <div className={container}>
            <img className={image} src="./images/Cheap.png"/> Cheap
        </div>
    );
};


export default withStyles(styles)(DealBreaker);
