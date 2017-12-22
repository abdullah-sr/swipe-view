import React, { Component } from 'react';
import { withStyles } from 'material-ui/styles';
import SwipeableViews from 'react-swipeable-views';
import { CircularProgress } from 'material-ui/Progress';
import { blue } from 'material-ui/colors';
import IconButton from 'material-ui/IconButton';
import Card from './Card/index';
import { API_ENDPOINTS } from '../../constants';

const styles = () => ({
    container: {
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
    },
    footer: {
        display: 'flex',
        borderTop: 'solid 1px #ddd',
        padding: 15,
        justifyContent: 'center',
        position: 'relative',
        backgroundColor: '#fff',
    },
    filterButton: {
        position: 'absolute',
        left: 0,
        top: 0,
        color: 'rgb(155, 174, 200)',
        '& img': {
            height: 18,
            width: 18,
        },
    },
    page: {
        fontSize: '.9rem',
        color: 'rgb(155, 174, 200)',
    },
});

class SwipeView extends Component {
    static flattenItemObj(item) {
        const { potentialRoommate, ...other } = item;
        other.distance = other.distance.distance;
        return {
            ...potentialRoommate,
            ...other,
            mutualFriendsCount: 0,
            mutualLikesCount: 0,
        };
    }

    static calculateAge(d) {
        const diff = Date.now() - new Date(d);
        const age = new Date(diff);
        return age.getUTCFullYear() - 1970;
    }


    constructor(props) {
        super(props);
        this.state = {
            users: [],
            loading: true,
            currentPage: 0,
            totalPages: 0,
        };

        this.swipeStyles = {
            swipeViewRoot: {
                height: '100%',
            },
            swipeViewContainer: {
                height: '100%',
            },
            slideStyle: {
                display: 'flex',
                justifyContent: 'center',
                width: '100%',
                // borderRight: 'solid 1px #ddd',
                // boxSizing: 'border-box',
            },
        };

        this.onChangeIndex = this.onChangeIndex.bind(this);
        this.fetchUsersData();
    }

    onChangeIndex(index) {
        this.setState({ currentPage: index + 1 });
    }

    async fetchUsersData() {
        try {
            const response = await fetch(`${API_ENDPOINTS.potentialRoommates}${window.location.search}`);
            const reponseJson = await response.json();
            console.log(reponseJson);
            const users = reponseJson.items.map((item, index) => {
                const user = this.constructor.flattenItemObj(item);
                this.fetchMutualFriends(user.userID, index);
                this.fetchMutualLikes(user.userID, index);
                return user;
            });
            this.setState({ loading: false, users, currentPage: 1, totalPages: users.length });
        } catch (error) {
            console.log(error);
        }
    }

    async fetchMutualFriends(userId, userIndex) {
        try {
            const response = await fetch(`${API_ENDPOINTS.mutualFriends(userId)}`);
            const reponseJson = await response.json();
            const mutualFriends = reponseJson.context.all_mutual_friends;
            if (mutualFriends) {
                const users = [...this.state.users];
                users[userIndex].mutualFriendsCount = mutualFriends.summary.total_count;
                this.setState({ users });
            }
        } catch (error) {
            console.log(error);
        }
    }

    async fetchMutualLikes(userId, userIndex) {
        try {
            const response = await fetch(`${API_ENDPOINTS.mutualLikes(userId)}`);
            const reponseJson = await response.json();
            const mutualLikes = reponseJson.context.mutual_likes;
            if (mutualLikes) {
                const users = [...this.state.users];
                users[userIndex].mutualLikesCount = mutualLikes.summary.total_count;
                this.setState({ users });
            }
        } catch (error) {
            console.log(error);
        }
    }

    listItems() {
        return this.state.users.map((user) => {
            return (
                <Card
                    key={user.userID}
                    src={`https://graph.facebook.com/${user.userID}/picture?width=400&height=400`}
                    location={`${user.locality}, ${user.state}`}
                    school={user.school || ''}
                    new={!user.hasSeen}
                    firstName={user.firstName}
                    lastName={user.lastName}
                    age={this.constructor.calculateAge(user.birthDate)}
                    bio={user.aboutMe.length < 220 ? user.aboutMe : `${user.aboutMe.slice(0, 220)}...`}
                    new={!user.hasSeen}
                    rent={`$${user.budget}`}
                    type={user.hasPlace ? 'Has a room' : 'Needs a room'}
                    mutualFriendsCount={user.mutualFriendsCount}
                    mutualLikesCount={user.mutualLikesCount}
                />
            );
        });
    }


    render() {
        const { props, state } = this;
        const { classes } = props;
        if (state.loading) {
            return (<CircularProgress size={50} style={{ color: blue[500] }}/>);
        }
        const { swipeViewRoot, swipeViewContainer, slideStyle } = this.swipeStyles;
        return (
            <div className={classes.container}>
                <SwipeableViews
                    style={swipeViewRoot}
                    containerStyle={swipeViewContainer}
                    slideStyle={slideStyle}
                    onChangeIndex={this.onChangeIndex}
                >
                    {this.listItems()}
                </SwipeableViews>
                <div className={classes.footer}>
                    <IconButton className={classes.filterButton}>
                        <img
                            src="images/bluefilter.png"
                            srcSet="images/bluefilter@2x.png 2x,
                                    images/bluefilter@3x.png 3x"
                        />
                    </IconButton>
                    <div className={classes.page}>{state.currentPage}/{state.totalPages}</div>
                </div>
            </div>
        );
    }
}

export default withStyles(styles)(SwipeView);
