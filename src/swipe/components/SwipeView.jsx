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
        color: '#9baec8',
        fontSize: '.9rem',
    },
    footer: {
        display: 'flex',
        borderTop: 'solid 1px #ddd',
        padding: 15,
        justifyContent: 'center',
        position: 'relative',
        backgroundColor: '#fff',
    },
    location: {
        display: 'flex',
        alignItems: 'center',
        position: 'absolute',
        left: 5,
        color: 'rgb(155, 174, 200)',
    },
    filterButton: {
        position: 'absolute',
        right: 0,
        top: 0,
        color: 'rgb(155, 174, 200)',
        '& img': {
            height: 18,
            width: 18,
        },
    },
    page: {
        fontSize: '.9rem',
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
            favored: false,
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
            currentUserLocation: '',
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
        this.setState({ currentPage: index + 1, currentUserLocation: this.state.users[index].locality });
    }

    async fetchUsersData() {
        try {
            const response = await fetch(`${API_ENDPOINTS.potentialRoommates}${window.location.search}`);
            const reponseJson = await response.json();
            console.log(reponseJson);
            const users = reponseJson.items.map((item, index) => {
                const user = this.constructor.flattenItemObj(item);
                // this could lade before user component mounts
                this.fetchMutualFriends(user.userID, index);
                this.fetchMutualLikes(user.userID, index);
                return user;
            });
            this.setState({
                loading: false,
                users,
                currentPage: 1,
                totalPages: users.length,
                currentUserLocation: users[0].locality,
            });
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

    async likeUser(userId, userIndex) {
        const users = [...this.state.users];
        users[userIndex].favored = true;
        this.setState({ users });
        try {
            const response = await fetch(`${API_ENDPOINTS.like(userId)}`, {
                method: 'POST',
            });
            if (response.status !== 200) {
                throw new Error('Unable to favor user');
            }
        } catch (error) {
            users[userIndex].favored = false;
            this.setState({ users });
            console.log(error);
        }
    }

    async unlikeUser(userId, userIndex) {
        const users = [...this.state.users];
        users[userIndex].favored = false;
        this.setState({ users });
        try {
            const response = await fetch(`${API_ENDPOINTS.unfavor(userId)}`, {
                method: 'POST',
            });
            if (response.status !== 200) {
                throw new Error('Unable to unfavor user');
            }
        } catch (error) {
            users[userIndex].favored = true;
            this.setState({ users });
            console.log(error);
        }
    }

    toggleFavor(uuid, userIndex) {
        return () => {
            if (this.state.users[userIndex].favored) {
                this.unlikeUser(uuid, userIndex);
            } else {
                this.likeUser(uuid, userIndex);
            }
        };
    }

    listItems() {
        return this.state.users.map((user, index) => {
            return (
                <Card
                    key={user.uuid}
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
                    favored={user.favored}
                    onClickLike={this.toggleFavor(user.uuid, index)}
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
                    <div className={classes.location}>
                        <svg fill="#9baec8" height="20" viewBox="0 0 24 24" width="20"
                             xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                            <path d="M0 0h24v24H0z" fill="none"/>
                        </svg>
                        {state.currentUserLocation}
                    </div>
                    <div className={classes.page}>{state.currentPage}/{state.totalPages}</div>
                    <IconButton className={classes.filterButton}>
                        <img
                            src="images/bluefilter.png"
                            srcSet="images/bluefilter@2x.png 2x,
                                    images/bluefilter@3x.png 3x"
                        />
                    </IconButton>
                </div>
            </div>
        );
    }
}

export default withStyles(styles)(SwipeView);
