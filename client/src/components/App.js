import React, { Component } from 'react'
import AddItemsBar from './AddItemsBar'
import ItemsList from './ItemsList'
import CreateNote from './CreateNote';

class App extends Component {
    render() {
        return (
            <div>
            <CreateNote></CreateNote>
            <div className="ui raised very padded text container segment">
                <h2>Notes</h2>
              <AddItemsBar></AddItemsBar>
              <ItemsList></ItemsList>
            </div>

            </div>
            
        )
    }
}

export default App;