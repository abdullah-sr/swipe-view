import React, { Component } from 'react';
import SwipeableViews from 'react-swipeable-views';
import { CircularProgress } from 'material-ui/Progress';
import { blue } from 'material-ui/colors';
import { API_ENDPOINTS } from '../../constants';
import Card from './Card/index';


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
        };

        this.styles = {
            swipeViewRoot: {
                height: '100%',
                boxShadow: '0 5px 8px rgba(0, 0, 0, 0.19), 0 1px 3px rgba(0, 0, 0, 0.23)',
            },
            swipeViewContainer: {
                height: '100%',
            },
            slideStyle: {
                display: 'flex',
                justifyContent: 'center',
                width: '100%',
                borderRight: 'solid 1px #ddd',
                boxSizing: 'border-box',
            },
        };

        this.listItems = this.listItems.bind(this);
        this.fetchUsersData();
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
            this.setState({ loading: false, users });
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
        const totalCard = this.state.users.length;
        return this.state.users.map((user, index) => {
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
                    rent={`$${user.budget}`}
                    type={user.hasPlace ? 'Has a room' : 'Needs a room'}
                    cardIndex={index + 1}
                    totalCards={totalCard}
                    mutualFriendsCount={user.mutualFriendsCount}
                    mutualLikesCount={user.mutualLikesCount}
                />

            );
        });
    }


    render() {
        if (this.state.loading) {
            return (<CircularProgress size={50} style={{ color: blue[500] }}/>);
        }
        const { swipeViewRoot, swipeViewContainer, slideStyle } = this.styles;
        return (
            <SwipeableViews style={swipeViewRoot} containerStyle={swipeViewContainer} slideStyle={slideStyle}>
                {this.listItems()}
            </SwipeableViews>
        );
    }
}

export default SwipeView;
