import React, { Component } from 'react';
import { withStyles } from 'material-ui/styles';
import classNames from 'classnames';


const styles = () => ({
    card: {
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '0 5px 8px rgba(0, 0, 0, 0.19), 0 1px 3px rgba(0, 0, 0, 0.23)',
        backgroundColor: '#FFFFFF',
        borderRadius: '2px',
        width: '100%',
    },
});


class Card extends Component {
    shouldComponentUpdate(nextProps, nextState) {
        return false;
    }

    render() {
        const props = this.props;
        const className = classNames(props.classes.card, props.className);
        console.log('card renderde');
        return (
            <div className={className}>
                {props.children}
            </div>
        );
    }
}



export default withStyles(styles)(Card);
