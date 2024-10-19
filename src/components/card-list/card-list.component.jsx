import './card-list.styles.css';
import CardItem from "../card-item/card-item.component";

const CardList = ({items}) => (
    <div className='card-list' key='card-list'>
        {items && items.length ?
            items.map((item) => {
                    return (
                        <CardItem key={item.id} item={item} />
                    )
                }
            )
            : <h1>No items found</h1>}
    </div>
)
// exporting allows other components to access this code 
export default CardList;

/////////////////////////////
// OLD CLASS COMPONENT METHOD
////////////////////////////




// class CardList extends Component {
//     // you can only have one top level component being returned.
//     render() {
//         // props is a key value pair of anything that is passed through.
//         // key is the name of the prop and the value is what is being passed.
//         console.log(this.props)
//         // must be same name as the prop to deconstruct.
//         const {items} = this.props;
//         // iterates through every element in an array from left to right and returns a new array
//         // the key should be added at the highest level of each element
//         return (
//             <div className='card-list'>
//                 {items && items.length ?
//                     items.map((item) => {
//                             return (
//                                 <CardItem item={item} />
//                             )
//                         }
//                     )
//                     : <h1>No items found</h1>}
//             </div>
//         )
//     }
// }
//
// // exporting allows other components to access this code 
// export default CardList;