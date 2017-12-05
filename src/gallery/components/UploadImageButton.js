import React from 'react';
import { withStyles } from 'material-ui/styles';


const styles = () => ({
    container: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        border: '1px solid #ccc',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 2,
    },
    input: {
        display: 'none',
    },
    label: {
        display: 'inline-block',
        padding: '6px 12px',
        cursor: 'pointer',
        color: '#888888',
    },
});


const UploadImageButton = (props) => {
    return (
        <div className={props.classes.container}>
            <label htmlFor="file-upload" className={props.classes.label}>
                <i className="material-icons">add_a_photo</i>
            </label>
            <input id="file-upload" type="file" accept="image/*" className={props.classes.input}/>
        </div>
    );
};


export default withStyles(styles)(UploadImageButton);
