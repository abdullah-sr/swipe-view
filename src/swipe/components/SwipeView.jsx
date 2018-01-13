import React, { Component } from 'react';
import { withStyles } from 'material-ui/styles';
import SwipeableViews from 'react-swipeable-views';
import { CircularProgress } from 'material-ui/Progress';
import { blue } from 'material-ui/colors';
import IconButton from 'material-ui/IconButton';
import Card from './Card/index';
import { API_ENDPOINTS } from '../../constants';

const dsBridge = require('dsbridge');

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

    static callNative(name, arg) {
        try {
            dsBridge.call(name, arg);
        } catch (error) {
            console.log(error);
        }
    }

    static diffInDays(dt) {
        let oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
        return Math.round((dt - new Date()) / (oneDay));
    }

    static buildMixPanelObj(user) {
        const lastSeenDays = Math.abs(this.constructor.diffInDays(new Date(user.lastSeen)));
        return {
            $potential_roommate_uuid: user.uuid,
            $need_roommate_by: user.needRoommateBy,
            $need_roommate_by_days: this.constructor.diffInDays(new Date(user.needRoommateBy)),
            $desired_lease_length: user.leaseDuration,
            $gender: user.gender,
            $age: this.constructor.calculateAge(user.birthDate),
            $has_place: user.hasPlace,
            //$roommate_dealbreakers_set: getDealBreakers(user).length >= 1,
            $budget_difference: user.differenceInBudget,
            $is_disliked: user.iDisliked,
            $about_charaters: user.aboutMe,
            $potential_roommate_id: user.userID,
            $potential_roommate_city: user.locality,
            $position_in_deck: user.positionInDeck,
            $last_seen_days: lastSeenDays,
            $last_seen_minutes: lastSeenDays * 24 * 60,
            $mutual_friends: user.mutualFriendsCount || 0,
            $mutual_interests: user.mutualLikesCount || 0,
            $school: user.school,
            $class_year: user.schoolYear,
            $distance: user.distance,
            $roommate_preference: user.roommatePreferenceType,
        };
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
        this.onClickFilter = this.onClickFilter.bind(this);
        this.fetchUsersData();
    }

    onChangeIndex(index) {
        const user = this.state.users[index];
        // swiped right
        if (index > this.state.currentPage) {
            this.constructor.callNative('trackEvent', { event: 'SwipeRight', ...this.constructor.buildMixPanelObj(user) });
        } else if (index < this.state.currentPage) {
            this.constructor.callNative('trackEvent', { event: 'SwipeLeft', ...this.constructor.buildMixPanelObj(user) });
        }
        this.setState({ currentPage: index + 1, currentUserLocation: user.locality });
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

    async likeUser(userIndex) {
        const users = [...this.state.users];
        const user = users[userIndex];
        user.favored = true;
        // call native method
        this.constructor.callNative('favor', { $user_id: user.uuid });
        this.setState({ users });
        try {
            const response = await fetch(`${API_ENDPOINTS.like(user.uuid)}`, {
                method: 'POST',
            });
            if (response.status !== 200) {
                throw new Error('Unable to favor user');
            }
        } catch (error) {
            user.favored = false;
            this.setState({ users });
            console.log(error);
        }
    }

    async unlikeUser(userIndex) {
        const users = [...this.state.users];
        const user = users[userIndex];
        user.favored = false;
        this.setState({ users });
        try {
            const response = await fetch(`${API_ENDPOINTS.unfavor(user.uuid)}`, {
                method: 'POST',
            });
            if (response.status !== 200) {
                throw new Error('Unable to unfavor user');
            }
        } catch (error) {
            user.favored = true;
            this.setState({ users });
            console.log(error);
        }
    }

    toggleFavor(userIndex) {
        return () => {
            if (this.state.users[userIndex].favored) {
                this.unlikeUser(userIndex);
            } else {
                this.likeUser(userIndex);
            }
        };
    }

    onClickViewProfile(user) {
        // call native method
        return () => this.constructor.callNative('viewProfile', user);
    }

    onClickMessageBtn(user) {
        // call native method
        return () => this.constructor.callNative('messageUser', { $user_id: user.uuid });
    }

    onClickFilter() {
        this.constructor.callNative('filter', {});
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
                    rent={`$${user.budget}`}
                    type={user.hasPlace ? 'Has a room' : 'Needs a room'}
                    mutualFriendsCount={user.mutualFriendsCount}
                    mutualLikesCount={user.mutualLikesCount}
                    favored={user.favored}
                    onClickLike={this.toggleFavor(index)}
                    onClickViewProfile={this.onClickViewProfile(user)}
                    onClickMessageBtn={this.onClickMessageBtn(user)}
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
                    <IconButton
                        className={classes.filterButton}
                        onClick={this.onClickFilter}
                    >
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
