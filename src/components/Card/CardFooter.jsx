import React from 'react';
import { withStyles } from 'material-ui/styles';
import DealBreaker from '../DealBreaker';


const styles = () => ({
    cardFooter: {
        flex: 1,
        borderTop: '1px solid #b9b9b9',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
        position: 'relative',
    },
});


function getDealBreakers(list) {
    const breakers =  list.map((key) => {
        const text = key.slice(6); // split at okWith
        return (
            <DealBreaker
                key={text}
                text={text.split(/(?=[A-Z])/).join(" ")}
                pic={`images/${text}.png`}
            />
        );
    });
    // only return 3 deal breakers
    return breakers.slice(0, 3);
}


const CardFooter = (props) => {
    if (props.dealbreakers.length === 0) return '';
    return (
        <div className={props.classes.cardFooter}>
            {getDealBreakers(props.dealbreakers)}
        </div>
    );
};


export default withStyles(styles)(CardFooter);
