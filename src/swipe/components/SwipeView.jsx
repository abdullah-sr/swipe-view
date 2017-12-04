import React, { Component } from 'react';
import SwipeableViews from 'react-swipeable-views';
// import { virtualize } from 'react-swipeable-views-utils';
import { CircularProgress } from 'material-ui/Progress';
import { blue } from 'material-ui/colors';
import { API_ENDPOINTS } from '../constants';
import Card, { CardImage, CardBody, CardFooter } from './Card/index';


// const VirtualizeSwipeableViews = virtualize(SwipeableViews);


class SwipeView extends Component {
    static flattenItemObj(item) {
        const { potentialRoommate, ...other } = item;
        other.distance = other.distance.distance;
        return { ...potentialRoommate, ...other };
    }

    static calculateAge(d) {
        const diff = Date.now() - new Date(d);
        const age = new Date(diff);
        return age.getUTCFullYear() - 1970;
    }

    static getDealbreakers(user) {
        return Object.keys(user).filter(key => key.startsWith('okWith') && user[key] === false);
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
                padding: 10,
                width: 'calc(100% - 20px)',
            },
        };

        this.listItems = this.listItems.bind(this);
        // this.slideRenderer = this.slideRenderer.bind(this);

        this.fetchData();
    }


    // slideRenderer({ key, index }) {
    //     //console.log(key, index);
    //     return (
    //
    //         <Slide key={key} index={index}/>
    //     );
    // }

    async fetchData() {
        try {
            const response = await fetch(`${API_ENDPOINTS.potentialRoommates}${window.location.search}`);
            const reponseJson = await response.json();
            console.log(reponseJson);
            const users = [];
            for (const item of reponseJson.items) {
                // users.push(`https://graph.facebook.com/${item.potentialRoommate.userID}/picture?width=400&height=400`);
                const user = this.constructor.flattenItemObj(item);
                users.push(user);
            }
            console.log('hmmmmm');
            this.setState({ loading: false, users });
        } catch (error) {
            console.log(error);
        }
    }

    async fetchMutualFriends() {

    }

    listItems() {
        return this.state.users.map((user) => {
            const location = user.roommatePreferenceType && user.school != null ? user.school : user.locality;
            const dealbreakers = this.constructor.getDealbreakers(user);
            return (
                <Card key={user.userID}>
                    <CardImage
                        src={`https://graph.facebook.com/${user.userID}/picture?width=400&height=400`}
                        location={location}
                        new={!user.hasSeen}
                    />
                    <CardBody
                        name={`${user.firstName} ${user.lastName}, ${this.constructor.calculateAge(user.birthDate)}`}
                        bio={user.aboutMe.length < 220 ? user.aboutMe : `${user.aboutMe.slice(0, 220)}...`}
                        rent={`$${user.budget} ${(user.hasPlace ? 'rent' : 'budget')}`}
                        type={user.hasPlace ? 'Has a room' : 'Need a room'}
                        hasDealbreakers={dealbreakers.length > 0}
                    />
                    <CardFooter dealbreakers={dealbreakers}/>
                </Card>
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
