import React from 'react';

const recentActivity = [
    { activity: 'Booked an appointment with Dr. Smith', date: '2024-09-10' },
    { activity: 'Completed a health survey', date: '2024-09-09' },
    { activity: 'Reviewed lab results', date: '2024-09-08' },
];

const RecentActivity = () => {
    return (
        <div className="recent-activity">
            <h3>Recent Activity</h3>
            <ul>
                {recentActivity.map((item, index) => (
                    <li key={index}>
                        {item.activity} - {item.date}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default RecentActivity;
