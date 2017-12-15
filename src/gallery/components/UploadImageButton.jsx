import React from 'react';
import { withStyles } from 'material-ui/styles';
import Loader from './Loader';


const styles = () => ({
    container: {
        boxSizing: 'border-box',
        position: 'absolute',
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        border: '1px solid #ccc',
        borderRadius: 2,
    },
    input: {
        display: 'none',
    },
    label: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
        cursor: 'pointer',
        color: '#888888',
    },
    icon: {
        fontSize: '2.5rem',
    },
});


const UploadImageButton = (props) => {
    if (props.uploading) {
        return (
            <div className={props.classes.container}>
                <Loader/>
            </div>
        );
    }
    return (
        <div className={props.classes.container}>
            <label htmlFor="file-upload" className={props.classes.label}>
                <i className={`material-icons ${props.classes.icon}`}>add_a_photo</i>
            </label>
            <input
                id="file-upload"
                type="file"
                accept="image/*"
                className={props.classes.input}
                onChange={props.onClickFileUpload}
            />
        </div>
    );
};


export default withStyles(styles)(UploadImageButton);
