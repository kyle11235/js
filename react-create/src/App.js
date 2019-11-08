import React, {Component} from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Redirect, Switch} from "react-router-dom";
import Login from "./component/Login";
import Home from "./component/Home";
import Pipeline from "./component/Pipeline";
import User from "./component/User";
import Auth from "./model/Auth";


class App extends Component {

    render() {
        const PrivateRoute = ({component: Component, ...rest}) => (
            <Route
                {...rest}
                render={props =>
                    Auth.isAuthenticated ? (
                        <Component {...props} />
                    ) : (
                        <Redirect
                            to={{
                                pathname: "/login",
                                state: {from: props.location}
                            }}
                        />
                    )
                }
            />
        );


        const NoMatch = ({location}) => (
            <div>
                <h3>
                    404 for <code>{location.pathname}</code>
                </h3>
            </div>
        );

        const Register = ({location}) => (
            <div>
                <h3>
                    Register
                </h3>
            </div>
        );

        return (
            <Router className="App">
                <div>
                    {/* Switch matches 1, the order matters*/}
                    <Switch>
                        <Route path="/" exact component={Home}/>
                        <Route path="/login" component={Login}/>
                        <Route path="/register" component={Register}/>
                        <Route path="/:user/:pipelineName" component={Pipeline}/>
                        <PrivateRoute path="/:user/setting" />
                        <Route path="/:user" component={User}/>
                        <Route component={NoMatch}/>
                    </Switch>
                </div>
            </Router>
        );
    }
}

export default App;