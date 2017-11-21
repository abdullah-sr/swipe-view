import React, { Component } from 'react';
import SwipeableViews from './SwipeableViews';
import { virtualize } from 'react-swipeable-views-utils';
import { CircularProgress } from 'material-ui/Progress';
import { blue } from 'material-ui/colors';
import Card, { CardImage } from './Card';


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
        this.slideRenderer = this.slideRenderer.bind(this);

        let self = this;
        fetch('https://renthoop-production.appspot.com/_ah/api/renthoopendpoint/v1/potentialroommate/181004659047340?latitude=34.072926&longitude=-118.442986&state=CA&locality=West%20Hollywood&radius=32000.000000').then((response) => {
            return response.json();
        }).then((json) => {
            console.log(json);
            for (let item of json.items) {
                self.setState(
                    (state) => {
                        return { images: state.images.concat(`https://graph.facebook.com/${item.potentialRoommate.userID}/picture?width=400&height=400`) };
                    }
                )
            }
            this.setState({ loading: false });
        }).catch((ex) => {
            console.log('parsing failed', ex);
        });
    }


    slideRenderer({ index }) {
        console.log(index);
        return (
            <Card key={index}>
                <CardImage src={this.state.images[index]} />
            </Card>
        );
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
            return (<CircularProgress size={50} style={{ color: blue[500] }}/>);
        }
        const VirtualizeSwipeableViews = virtualize(SwipeableViews);
        return (
            <VirtualizeSwipeableViews slideRenderer={this.slideRenderer} overscanSlideAfter={7} overscanSlideBefore={7}
                                      slideCount={this.state.images.length} slideStyle={this.styles.slideStyle}/>
        );
        // return (
        //     <SwipeableViews slideStyle={this.styles.slideStyle}>
        //         {this.listItems()}
        //     </SwipeableViews>
        // );
    }
}

export default SwipeView;
