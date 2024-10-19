import logo from './logo.svg';
import './App.css';
import {useState, useEffect} from "react";
import {Component} from "react";
// importing custom components don't have squiggly braces
import CardList from "./components/card-list/card-list.component"
import SearchBox from "./components/search-box/search-box.component"

const App = () => {
    // array destructuring 
    // allows us to assign variables to values inside an array
    // each hook only hooks into one value so to assign to multiple you need to call useState multiple times.
    const [searchField, setSearchField] = useState(''); // [value, setValue]
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState(users);
    const [title, setTitle] = useState('')
    console.log({searchField});
    
    // CIRCULAR LOOP!! - to get around this side effects and hooks
    // any fetch call is a side effect 
    // because this is a foreign array, the value will be different each time from what is stored in memory
    // so will re-render forever as it'll be called repeatedly.
    
    // fetch('https://jsonplaceholder.typicode.com/users')
    //     .then(response => response.json())
    //     .then((users) => setUsers(users)
    //     );
    
    // takes two arguments:
    // callback function - the effect
    // array of dependencies
    // whenever any of the values inside the array change is when it will run
    // leaving the dependencies empty means that the callback will never be triggered - only on mount
    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/users')
            .then(response => response.json())
            .then((users) => setUsers(users)
            );
    }, [])

    const onSearchChange = (event) => {
        const searchFieldString = event.target.value.toLowerCase();
        // below is the setter function brought back from useState
        setSearchField(searchFieldString);
    }

    const onTitleChange = (event) => {
        const searchFieldString = event.target.value.toLowerCase();
        // below is the setter function brought back from useState
        setTitle(searchFieldString);
    }
    
    // only filter through an effect if either the array or the search field changes
    useEffect(() => {
        const newFilteredUsers = users.filter((user) => {
            return user.name.toLowerCase().includes(searchField);
        });
        setFilteredUsers(newFilteredUsers);
    }, [users, searchField]);


    return (
        <div className="App">
            <h1 className='app-title'>{title}</h1>
            <SearchBox onChangeHandler={onTitleChange}
                       searchBoxPlaceholder='set title'
                       searchBoxClassName='title-search-box'/>
            <br/>
            <SearchBox onChangeHandler={onSearchChange}
                       searchBoxPlaceholder='search name'
                       searchBoxClassName='monsters-search-box'/>
            <CardList items={filteredUsers}></CardList>
        </div>
    );
}

export default App;

/////////////////////////////
// OLD CLASS COMPONENT METHOD
////////////////////////////

// class App extends Component {
//     // RUNS 1STx
//     constructor() {
//         console.log('constructor')
//         super();
//         // URL: https://jsonplaceholder.typicode.com/users
//         // initialise the state
//         this.state = {
//             users: [],
//             searchString: '',
//             filteredUsers: []
//         }
//     }
//    
//     // pure functions always return the same thing provided they're provided the same information
//     // as such they cannot rely on an outside variable
//    
//     // a pure function cannot create what is known as a side effect.
//     // a side effect is when the function alters something outside its scope.
//     // for example setting a variable that resides outside the function.
//    
//     // react uses hooks to create impure functions 
//     // a function that modifies something outside the scope of the function
//
//     //  RUNS 3RD
//     // lifecycle method runs whenever the component mounts (after render has mounted stuff to the DOM)
//     // first time component is mounted onto the DOM - only happens once.
//     // the moment the props are called and setstate is called - render is run again
//     componentDidMount() {
//         console.log('componentDidMount')
//         // a promise is async in js
//         // eventually this WILL have a value - you might just have to wait, but it'll come
//         fetch('https://jsonplaceholder.typicode.com/users')
//             .then(response => response.json())
//             .then((users) => this.setState(() => {
//                     return {users: users};
//                 },
//                 () => {
//                     console.log('fetch complete');
//                 }
//             ));
//     }
//
//     async changeNameThroughObject() {
//         console.log(this.state)
//         // shallow merge - checks through the state object to see if there are any changes
//         // checking through to find any keys called name and updating the value and ignoring the other keys
//         // in short only updating the keys of the values that are being passed to it.
//         // it doesn't care on the type of the key, only as long as the name of the key matches
//         // when updating state make sure the types are the same
//         await this.setState({name: 'Sloth'});
//         console.log(this.state)
//     }
//
//     async changeNameThroughFunction() {
//         // preferred way of setting state, passing a function that returns an object, not passing an object
//         // passing in a function gives us access to state (equal to the current state)
//         // as well as props (different values that can be passed to components)
//         // having the previous state is useful if we need to access both the previous value of the state and the updated value.
//         await this.xsetState(
//             () => {
//                 return {
//                     name: 'Sloth',
//                     company: 'recipes'
//                 };
//             },
//             () => {
//                 // this will only run once the first function is complete - it's async
//                 console.log(this.state);
//             }
//         );
//     }
//    
//     // attaching it to the class is more performant that have anonymous methods getting created/destroyed each time
//     onSearchChange = (event) => {
//         const searchString = event.target.value.toLowerCase();
//         this.setState(() => {
//             return {searchString}
//         })
//     }
//
//     // RUNS 2ND & any time that the state changes affecting the UI
//     // determines what to display on the page - dictates the UI
//     render() {
//         // removes the need for this everywhere by pulling off the names and values casting certain this to variables
//         const {users, searchString} = this.state;
//         const {onSearchChange} = this;
//
//         const filtered = users.filter((user) => {
//             return user.name.toLowerCase().includes(searchString);
//         });
//         console.log('render')
//         return (
//             <div className="App">
//                 <h1 className='app-title'>Rolodex</h1>
//                 <SearchBox onChangeHandler={onSearchChange} 
//                            searchBoxPlaceholder='search name' 
//                            searchBoxClassName='monsters-search-box' />
//                 <CardList items={filtered}></CardList>
//             </div>
//         );
//     }
// }


