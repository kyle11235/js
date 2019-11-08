import React, {Component} from 'react';
import './Login.css';
import {Redirect} from "react-router-dom";
import Auth from "../model/Auth";
import Snackbar from 'material-ui/Snackbar';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import AppBar from "./AppBar";


class Login extends Component {

    constructor(props) {
        super(props);
        // even it is empty, declare it to make it under control at the beginning
        this.state = {
            isAuthenticated: false,
            name: '',
            password: '',
            confirmPassword: '',
            message: '',
            toRegister: false
        };
    }


    handleChange = (e) => {
        const target = e.target;
        const name = target.name;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        this.setState({[name]: name === 'name' ? value.toLowerCase() : value});
    }

    handleKeyDown = (e) => {
        if (e.keyCode === 13) {
            this.loginOrRegister();
        }
    }

    loginOrRegister = () => {
        this.setState((state) => {
            if (state.toRegister && state.password !== state.confirmPassword) {
                // people will hardly understand this is using the previous state to set next state
                return {message: 'Passwords are not same.'};
            }
            Auth.loginOrRegister(state.toRegister, state.name, state.password, (message) => {
                this.setState({message: message});
                this.setState({isAuthenticated: Auth.isAuthenticated});
            }, (message) => {
                this.setState({message: message});
            });
        })
    }

    render() {
        const {from} = this.props.location.state || {from: {pathname: "/"}};

        // only state change triggers render
        if (this.state.isAuthenticated) {
            return <Redirect to={from}/>;
        }

        return (
            <div className="Login">
                <AppBar/>
                <form>
                    <Snackbar
                        anchorOrigin={{vertical: 'bottom', horizontal: 'center'}}
                        open={this.state.message !== ''}
                        onClose={() => {
                            this.setState({message: ''});
                        }}
                        message={this.state.message}
                    />

                    <h2>Please {this.state.toRegister ? 'register' : 'login'}</h2>
                    <TextField
                        name="name"
                        label="Username"
                        value={this.state.name}
                        onChange={this.handleChange}
                        onKeyDown={this.handleKeyDown}
                        margin="normal"
                        fullWidth
                        placeholder="e.g. kyle.z.zhang"
                    />
                    <TextField
                        name="password"
                        label="Password"
                        type="password"
                        autoComplete="current-password"
                        onChange={this.handleChange}
                        onKeyDown={this.handleKeyDown}
                        margin="normal"
                        fullWidth
                    />
                    {this.state.toRegister && <TextField
                        name="confirmPassword"
                        label="Confirm password"
                        type="password"
                        autoComplete="current-password"
                        onChange={this.handleChange}
                        onKeyDown={this.handleKeyDown}
                        margin="normal"
                        fullWidth
                    />}
                    <Button fullWidth
                            variant="raised"
                            color="secondary"
                            onClick={this.loginOrRegister}>
                        {this.state.toRegister ? 'Register' : 'Login'}
                    </Button>
                    <a onClick={(e) => {
                        this.setState(state => ({toRegister: !state.toRegister}));
                        e.preventDefault();
                    }}>{this.state.toRegister ? 'Login' : 'Register'}</a>
                </form>
            </div>
        );
    }
}

export default Login;