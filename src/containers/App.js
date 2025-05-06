import React, { Component } from "react";
import { connect } from "react-redux";
import { setSearchField, requestRobots } from "../actions";

import CardList from "../components/CardList";
import SearchBox from "../components/SearchBox";
import Scroll from "../components/Scroll";
import ErrorBoundry from "../components/ErrorBoundry";

import "./App.css";
import Header from "../components/Header";

// parameter state comes from index.js provider store state(rootReducers)
const mapStateToProps = (state) => {
  return {
    searchField: state.searchRobots.searchField,
    robots: state.requestRobots.robots,
    isPending: state.requestRobots.isPending,
  };
};

// dispatch the DOM changes to call an action. note mapStateToProps returns object, mapDispatchToProps returns function
// the function returns an object then uses connect to change the data from reducers.
// const mapDispatchToProps = (dispatch) => {
//   return {
//     onSearchChange: (event) => dispatch(setSearchField(event.target.value)),
//     onRequestRobots: () => dispatch(requestRobots()),
//   };
// };

// mapDispatchToProps: log before and after dispatching each action
const mapDispatchToProps = (dispatch) => {
  return {
    onSearchChange: (event) => {
      const action = setSearchField(event.target.value);
      dispatch(action);
    },
    onRequestRobots: () => {
      const actionThunk = requestRobots();
      dispatch(actionThunk);
    },
  };
};

class App extends Component {
  componentDidMount() {
    this.props.onRequestRobots();
  }

  // When Redux state changes, mapStateToProps runs and extracts the relevant pieces of state. React's reconciliation process compares the new props from mapStateToProps with the previous props. If there's a difference in props, React will schedule a re-render of the component
  render() {
    console.log("[App] render() props:", this.props);
    console.log("[App] render() state:", this.state);
    const { robots, searchField, onSearchChange, isPending } = this.props;
    const filteredRobots = robots.filter((robot) => {
      return robot.name.toLowerCase().includes(searchField.toLowerCase());
    });
    return (
      <div className="tc">
        <Header />
        <SearchBox searchChange={onSearchChange} />
        <Scroll>
          {isPending ? (
            <h1>Loading</h1>
          ) : (
            <ErrorBoundry>
              <CardList robots={filteredRobots} />
            </ErrorBoundry>
          )}
        </Scroll>
      </div>
    );
  }
}

// action done from mapDispatchToProps will channge state from mapStateToProps
export default connect(mapStateToProps, mapDispatchToProps)(App);
