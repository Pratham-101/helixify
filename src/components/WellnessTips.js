import React from 'react';

const wellnessTips = [
    'Drink more water today to stay hydrated!',
    'Take a 10-minute walk to refresh your mind.',
    'Include more fruits and vegetables in your meals.',
    'Get at least 7 hours of sleep tonight.',
];

const getRandomTip = () => {
    const randomIndex = Math.floor(Math.random() * wellnessTips.length);
    return wellnessTips[randomIndex];
};

const WellnessTips = () => {
    return (
        <div className="wellness-tips">
            <h3>Wellness Tip of the Day</h3>
            <p>{getRandomTip()}</p>
        </div>
    );
};

export default WellnessTips;
