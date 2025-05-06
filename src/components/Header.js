import React, { Component } from 'react'

class Header extends Component {
    constructor() {
        super();
        this.state = {
            count: 0
        }
    }

    // * A life cycle hook in react
    shouldComponentUpdate(nextProps, nextState) {
        // * if the count changes only then the component will be re rendered or else it won't
        // * even if this is not mentioned, it triggers automatically. Have to use carefully as if something deeply nested changes this might not get triggered automatically and we can have control over it however using this means more code and have to be decided if its needed or not
        if (this.state.count !== nextState.count) {
            return true
        }
        return false
    }

    onChange = () => {
        // * takes the current state and adds one
        this.setState(state => {
            return { count: state.count + 1 }
        })
    }

    render() {
        return (
            <div>
                <h1 className="f1">RoboFriends</h1>
                <button onClick={this.onChange}>Count:{this.state.count}</button>
            </div>
        )
    }
}


export default Header