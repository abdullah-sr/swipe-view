import React, { Component } from 'react';
import SwipeableViews from 'react-swipeable-views';
// import { virtualize } from 'react-swipeable-views-utils';
import { CircularProgress } from 'material-ui/Progress';
import { blue } from 'material-ui/colors';
import Card, { CardImage } from './Card';


// const VirtualizeSwipeableViews = virtualize(SwipeableViews);


class SwipeView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            images: [],
            loading: true,
        };

        this.styles = {
            slideStyle: {
                display: 'flex',
                justifyContent: 'center',
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
            const response = await fetch('https://renthoop-production.appspot.com/_ah/api/renthoopendpoint/v1/potentialroommate/181004659047340?latitude=34.072926&longitude=-118.442986&state=CA&locality=West%20Hollywood&radius=32000.000000');
            const reponseJson = await response.json();
            console.log(reponseJson);
            for (const item of reponseJson.items) {
                this.setState((state) => {
                    return { images: state.images.concat(`https://graph.facebook.com/${item.potentialRoommate.userID}/picture?width=400&height=400`) };
                });
            }
            this.setState({ loading: false });
        } catch (error) {
            console.log(error);
        }
    }

    listItems() {
        return this.state.images.map(img =>
            (
                <Card key={img}>
                    <CardImage src={img}/>
                </Card>
            ));
    }


    render() {
        if (this.state.loading) {
            return (<CircularProgress size={50} style={{ color: blue[500] }} />);
        }
        return (
            <SwipeableViews slideStyle={this.styles.slideStyle}>
                {this.listItems()}
            </SwipeableViews>
        );
    }
}

export default SwipeView;
