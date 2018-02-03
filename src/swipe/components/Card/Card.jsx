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
        color: '#292929',
    },
    name: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        fontSize: '1.69rem',
        padding: '5px 15px',
        fontWeight: 600,
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
        padding: 10,
        position: 'relative',
    },
    location: {
        display: 'flex',
        flexDirection: 'column',
        marginBottom: 3,
        fontWeight: 600,
        fontSize: '1.125rem',
        '& div:nth-child(2)': {
            fontWeight: 400,
            fontSize: '1rem',
        },
    },
    actions: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 'auto',
    },
    messageButton: {
        color: '#fff',
        backgroundColor: '#0072d0',
        borderRadius: 5,
        textTransform: 'none',
        padding: '9px 9px',
        width: '80%',
        fontSize: '1.1rem',
        fontWeight: 400,
        '&:hover': {
            backgroundColor: '#2786d0',
        },
    },
    viewProfileBtn: {
        backgroundColor: 'rgba(242, 242, 242, 0.7) !important',
        borderRadius: 10,
        padding: '5px 10px',
        marginBottom: 10,
        fontSize: '0.9rem',
        color: '#4b82b0',
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
        fontWeight: 300,
    },
    imageOverlay: {
        display: 'flex',
        flexDirection: 'column',
        position: 'absolute',
        bottom: 5,
        '&.right': {
            right: 15,
            fontWeight: 400,
        },
        '&.left': {
            left: 15,
            fontWeight: 400,
        },
    },
    label: {
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
        borderRadius: 10,
        padding: '2px 6px',
        marginBottom: 5,
        fontSize: '1rem',
        color: 'rgb(0, 114, 208)',
        textAlign: 'center',
    },
    newLabel: {
        display: 'flex',
        alignItems: 'center',
        height: 22,
        backgroundColor: 'rgba(241, 241, 241, 0.65)',
        padding: '0 10px',
        borderRadius: 10,
        fontSize: '.9rem',
        fontWeight: 400,
        color: '#88c346',
    },
});


class Card extends Component {
    shouldComponentUpdate(nextProps, nextState) {
        const {
            mutualFriendsCount,
            mutualLikesCount,
            favored,
        } = this.props;
        // return true if counts are different
        if (mutualFriendsCount !== nextProps.mutualFriendsCount ||
            mutualLikesCount !== nextProps.mutualLikesCount ||
            favored !== nextProps.favored
        ) {
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
                    {`${props.firstName}, ${props.age}`}
                    {props.new && <div className={classes.newLabel}>New</div>}
                </div>
                <div className={classes.imageContainer}>
                    <img src={props.src}/>
                    <div className={`${classes.imageOverlay} right`}>
                        <div className={classes.label}>
                            {props.rent}
                        </div>
                        <div className={classes.label}>
                            {props.type}
                        </div>
                    </div>
                    <div className={`${classes.imageOverlay} left`}>
                        {props.mutualFriendsCount.length > 0 &&
                        <div className={classes.label}>
                            {`${props.mutualFriendsCount} mutual friend${props.mutualFriendsCount > 1 ? 's' : ''}`}
                        </div>
                        }
                        {props.mutualLikesCount > 0 &&
                        <div className={classes.label}>
                            {`${props.mutualLikesCount} mutual likes${props.mutualLikesCount > 1 ? 's' : ''}`}
                        </div>
                        }
                    </div>
                </div>
                <div className={classes.cardBody}>
                    <IconButton
                        className={classes.favoriteButton}
                        onClick={props.onClickLike}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="26" height="25" viewBox="0 0 26 25">
                            <path
                                fill={props.favored ? '#6DAEE4' : 'none'}
                                fillRule="evenodd"
                                stroke="#6DAEE4"
                                strokeWidth="2"
                                d="M12.557 19.993l-6.512 3.423a.5.5 0 0 1-.726-.527l1.244-7.251a.5.5 0 0 0-.144-.443L1.151 10.06a.5.5 0 0 1 .277-.853l7.28-1.057a.5.5 0 0 0 .377-.274l3.256-6.597a.5.5 0 0 1 .897 0l3.256 6.597a.5.5 0 0 0 .376.274l7.28 1.057a.5.5 0 0 1 .278.853l-5.269 5.135a.5.5 0 0 0-.143.443l1.243 7.251a.5.5 0 0 1-.725.527l-6.512-3.423a.5.5 0 0 0-.465 0z"/>
                        </svg>
                    </IconButton>
                    <div className={classes.location}>
                        {props.school && <div>{props.school}</div>}
                        {props.location && <div>{props.location}</div>}
                    </div>
                    <div className={classes.bio}>
                        {props.bio}
                    </div>
                    <div className={classes.actions}>
                        <Button className={classes.viewProfileBtn} onClick={props.onClickViewProfile}>
                            View Profile
                        </Button>
                        <Button className={classes.messageButton} onClick={props.onClickMessageBtn}>
                            {`Message ${props.firstName}`}
                        </Button>
                    </div>
                </div>
            </div>
        );
    }
}


export default withStyles(styles)(Card);
