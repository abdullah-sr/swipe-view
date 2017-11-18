import React, {Component} from 'react';
import SwipeableViews from 'react-swipeable-views';

class SwipeView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            images: [],
        };

        this.styles = {
            slideStyle: {
                display: 'flex',
                justifyContent: 'center',
            },
        };

        let self = this;
        fetch('https://renthoop-production.appspot.com/_ah/api/renthoopendpoint/v1/potentialroommate/181004659047340?latitude=34.072926&longitude=-118.442986&state=CA&locality=West%20Hollywood&radius=32000.000000').then((response) => {
            return response.json();
        }).then((json) => {
            console.log(json);
            for (let item of json.items) {
                self.setState(
                    (state) => {
                        return {images: state.images.concat(`https://graph.facebook.com/${item.potentialRoommate.userID}/picture?width=400&height=400`)}
                    }
                )
            }
        }).catch((ex) => {
            console.log('parsing failed', ex);
        });
    }

    listItems() {
        return this.state.images.map(img =>
            (
                <div key={img}>
                    <img src={img} alt="user" />
                </div>
            ));
    }


    render() {
        return (
            <SwipeableViews slideStyle={this.styles.slideStyle}>
                {this.listItems()}
            </SwipeableViews>
        );
    }
}

export default SwipeView;
