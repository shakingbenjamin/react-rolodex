import {Component} from "react";
import './card-item.styles.css';

const CardItem = ({item}) => {
    const { name, email, id} = item;
    return (
        <div className='card-container' key={id}>
            <img alt='monster' src={`https://robohash.org/${id}?set=set2`}/>
            <h2>{name}</h2>
            <p>{email}</p>
        </div>
    )
}
export default CardItem;