import React from 'react';
import PropTypes from 'prop-types';
import {withRouter} from "react-router-dom";
import Auth from "../model/Auth";
import {withStyles} from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import AccountCircle from 'material-ui-icons/AccountCircle';
import Menu, {MenuItem} from 'material-ui/Menu';
import Button from 'material-ui/Button';


const styles = {
    root: {
        flexGrow: 1,
    },
    flex: {
        flex: 1,
    }
};

class MenuAppBar extends React.Component {
    state = {
        anchorEl: null,
    };

    handleMenu = event => {
        this.setState({anchorEl: event.currentTarget});
    };

    handleClose = () => {
        this.setState({anchorEl: null});
    };

    render() {
        const {classes} = this.props;
        const {anchorEl} = this.state;
        const open = Boolean(anchorEl);

        const menu = Auth.isAuthenticated && (
            <div>
                <IconButton
                    aria-owns={open ? 'menu-appbar' : null}
                    aria-haspopup="true"
                    onClick={this.handleMenu}
                    color="inherit"
                >
                    <AccountCircle/>
                </IconButton>
                <Menu
                    id="menu-appbar"
                    anchorEl={anchorEl}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    open={open}
                    onClose={this.handleClose}
                >
                    <MyAccountButton/>
                    <LogoutButton/>
                </Menu>
            </div>
        );

        return (
            <div className={classes.root}>
                <AppBar position="fixed">
                    <Toolbar>
                        <Typography variant="title" color="inherit" className={classes.flex}>
                            <HomeButton/>
                            {this.props.children}
                        </Typography>

                        <LoginButton/>

                        {menu}
                    </Toolbar>
                </AppBar>
            </div>
        );
    }
}

MenuAppBar.propTypes = {
    classes: PropTypes.object.isRequired,
}

const HomeButton = withRouter(
    ({history}) =>
        <Button color="inherit" onClick={() => {
            history.push("/");
        }}
        >PipelineHub</Button>
);

const LogoutButton = withRouter(
    ({history}) =>
        <MenuItem onClick={() => {
            Auth.logout(() => history.push("/login"));
        }}>Logout</MenuItem>
);

const LoginButton = withRouter(
    ({history}) =>
        <span>
            {!Auth.isAuthenticated &&
            <Button color="inherit" onClick={() => {
                history.push("/login");
            }}
            >Login</Button>
            }
        </span>
);

const MyAccountButton = withRouter(
    ({history}) =>
        <MenuItem onClick={() => {
            history.push("/" + Auth.user.name);
        }}>{Auth.user.name.trim() === '' ? 'anonymous' : Auth.user.name}</MenuItem>
);

export default withStyles(styles)(MenuAppBar);
