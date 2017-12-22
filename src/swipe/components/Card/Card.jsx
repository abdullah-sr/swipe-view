import React, { Component } from 'react';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';

const styles = () => ({
    card: {
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '0 5px 8px rgba(0, 0, 0, 0.19), 0 1px 3px rgba(0, 0, 0, 0.23)',
        backgroundColor: '#FFFFFF',
        // borderRadius: '2px',
        width: '100%',
        color: '#0072d0',
    },
    name: {
        fontSize: '1.25rem',
        padding: '7px 15px',
        fontWeight: 700,
    },
    imageContainer: {
        position: 'relative',
        flex: 2,
        overflow: 'hidden',
        '& img': {
            height: '100%',
            width: '100%',
            objectFit: 'cover',
        },
    },
    cardBody: {
        display: 'flex',
        flex: 1,
        flexDirection: 'column',
        padding: 15,
        position: 'relative',
    },
    location: {
        display: 'flex',
        flexDirection: 'column',
        marginBottom: 5,
        fontWeight: 600,
    },
    actions: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 'auto',
    },
    messageButton: {
        color: 'inherit',
        border: '1px solid rgb(109, 174, 228)',
        borderRadius: 2,
        textTransform: 'none',
        width: '80%',
        fontSize: '1rem',
    },
    viewProfileBtn: {
        backgroundColor: 'rgba(242, 242, 242, 0.65) !important',
        borderRadius: 10,
        padding: '5px 10px',
        marginBottom: 10,
        fontSize: '.8rem',
        color: 'inherit',
        textTransform: 'none',
        fontWeight: 400,
        minHeight: 0,
        textAlign: 'center',
    },
    favoriteButton: {
        position: 'absolute',
        top: 5,
        right: 5,
        color: 'rgb(109, 174, 228)',
        '& .material-icons': {
            fontSize: '2rem',
        },
    },
    bio: {
        fontSize: '.9rem',
    },
    imageOverlay: {
        display: 'flex',
        flexDirection: 'column',
        position: 'absolute',
        bottom: 5,
        '&.right': {
            right: 15,
            fontWeight: 600,
        },
        '&.left': {
            left: 15,
        },
    },
    label: {
        backgroundColor: 'rgba(255, 255, 255, 0.85)',
        borderRadius: 10,
        padding: '4px 8px',
        marginBottom: 5,
        fontSize: '.875rem',
        color: 'rgb(0, 114, 208)',
        minHeight: 0,
        textAlign: 'center',
    },
});


class Card extends Component {
    shouldComponentUpdate(nextProps, nextState) {
        const { mutualFriendsCount, mutualLikesCount } = this.props;
        // return true if counts are different
        if (mutualFriendsCount !== nextProps.mutualFriendsCount || mutualLikesCount !== nextProps.mutualLikesCount) {
            return true;
        }
        return false;
    }

    render() {
        const { props } = this;
        const { classes } = props;
        console.log('card re-rendered');
        return (
            <div className={classes.card}>
                <div className={classes.name}>
                    <div className="overpass-4">{`${props.firstName} ${props.lastName}, ${props.age}`}</div>
                </div>
                <div className={classes.imageContainer}>
                    <img src={props.src}/>
                    <div className={`${classes.imageOverlay} right`}>
                        <div className={classes.label}>
                            <div className="overpass-3">{props.rent}</div>
                        </div>
                        <div className={classes.label}>
                            <div className="overpass-3">{props.type}</div>
                        </div>
                    </div>
                    <div className={`${classes.imageOverlay} left`}>
                        {props.mutualFriendsCount ?
                            <div
                                className={classes.label}
                            >
                                <div
                                    className="overpass-3"> {`${props.mutualFriendsCount} mutual friend${props.mutualFriendsCount > 1 ? 's' : ''}`}</div>
                            </div> : ''
                        }
                        {props.mutualLikesCount ?
                            <div
                                className={classes.label}
                            >
                                <div
                                    className="overpass-3">{`${props.mutualLikesCount} mutual likes${props.mutualLikesCount > 1 ? 's' : ''}`}</div>
                            </div> : ''
                        }
                    </div>
                </div>
                <div className={classes.cardBody}>
                    <IconButton className={classes.favoriteButton}>
                        <img src="images/star.svg"/>
                    </IconButton>
                    <div className={classes.location}>
                        <div>{props.school}</div>
                        <div>{props.location}</div>
                    </div>
                    <div className={classes.bio}>
                        {props.bio}
                    </div>
                    <div className={classes.actions}>
                        <Button className={classes.viewProfileBtn}>
                            <div className="overpass-3">View Profile</div>
                        </Button>
                        <Button className={classes.messageButton}>
                            <div className="overpass-3">{`Message ${props.firstName}`}</div>
                        </Button>
                    </div>
                </div>
            </div>
        );
    }
}


export default withStyles(styles)(Card);
