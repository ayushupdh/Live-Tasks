import React, { Component } from 'react'
import Header from './Header'
class NotesList extends Component {
    render() {
        return (
                <div class="ui two column centered grid">
                <div class="column">
                <Header></Header>

                <div class="ui fluid action input ">
                    <input type="text" placeholder="Add..." />
                    <div class="ui button">Add</div>
                </div>
                </div>
            </div>
            
        )
    }
}

export default NotesList;