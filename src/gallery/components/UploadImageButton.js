import React from 'react';
import { withStyles } from 'material-ui/styles';


const styles = () => ({
    container: {
        position: 'absolute',
        width: '100%',
        height: '100%',
    },
    input: {
        display: 'none',
    },
    label: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        width: '100%',
        cursor: 'pointer',
        color: '#888888',
        border: '1px solid #ccc',
        borderRadius: 2,
    },
    icon: {
        fontSize: '2.5rem',
    },
});


const UploadImageButton = (props) => {
    return (
        <div className={props.classes.container}>
            <label htmlFor="file-upload" className={props.classes.label}>
                <i className={`material-icons ${props.classes.icon}`}>add_a_photo</i>
            </label>
            <input id="file-upload" type="file" accept="image/*" className={props.classes.input}/>
        </div>
    );
};


export default withStyles(styles)(UploadImageButton);
