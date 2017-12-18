import React from 'react';
import { withStyles } from 'material-ui/styles';
import classNames from 'classnames';


const styles = () => ({
    cardBody: {
        flex: 3,
        position: 'relative',
        padding: '15px 10px',
        overflow: 'hidden',
    },
    nameContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    name: {
        fontSize: '1rem',
        fontWeight: 600,
    },
    typeContainer: {
        display: 'flex',
        whiteSpace: 'nowrap',
    },
    type: {
        border: '1px solid #546E7A',
        borderRadius: 2,
        padding: 4,
        fontSize: '0.75rem',
        marginLeft: 5,
        '&.inverse': {
            backgroundColor: '#546E7A',
            color: '#fff',
        },
    },
    dealbreakerText: {
        position: 'absolute',
        bottom: 0,
        left: 10,
        fontSize: '0.75rem',
    },
});


const CardBody = (props) => {
    const {
        cardBody,
        nameContainer,
        name,
        typeContainer,
        type,
    } = props.classes;
    return (
        <div className={cardBody}>
            <div className={nameContainer}>
                <div className={name}>
                    {props.name}
                </div>
                <div className={typeContainer}>
                    <div className={type}>{props.rent}</div>
                    <div className={`${type} inverse`}>{props.type}</div>
                </div>
            </div>
            {props.bio}
        </div>
    );
};


export default withStyles(styles)(CardBody);
