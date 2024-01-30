import React from 'react';
import StoreItem from './StoreItem';

export default function StoreItems({ stores, filter }) {
    const filterd = getFilteredItem(stores, filter);
    return (
        <ul
            style={{
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
            }}
        >
            {filterd &&
                filterd.map((store) => {
                    return <StoreItem key={store._id} store={store} />;
                })}
        </ul>
    );
}
function getFilteredItem(stores, filter) {
    if (stores === undefined) {
        return;
    }
    if (filter === '평점순') {
        return stores.sort((a, b) => b.starRating - a.starRating);
    } else if (filter === '리뷰순') {
        return stores.sort((a, b) => b.reviews.length - a.reviews.length);
    } else if (filter === '찜한순') {
        return stores.sort((a, b) => b.storeLikes.length - a.storeLikes.length);
    }
}
