import React, {Component} from 'react';
import './SearchBar.css';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import {FormControlLabel} from 'material-ui/Form';
import Switch from 'material-ui/Switch';

class SearchBar extends Component {

    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleClear = this.handleClear.bind(this);
    }

    handleChange(e) {
        const target = e.target;
        const name = target.name;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        this.props.handleChange(name, value);
    }

    handleClear() {
        this.props.handleClear();
    }


    render() {
        // set default value to ensure it is controlled without unexpected value
        const data = this.props.data ? this.props.data : {
            'q': ''
        };

        let tags = '';
        if (data.tags) {
            tags = data.tags.map((tag) => {
                return <FormControlLabel
                    key={tag.name}
                    control={
                        <Switch
                            name={tag.name}
                            checked={tag.checked}
                            onChange={this.handleChange}
                            color="secondary"
                        />
                    }
                    label={tag.name}
                />
            });
        }

        return (
            <div className="SearchBar">
                {/* 1. the best way to customize your own component is use className to take plain css class of course */}
                {/* 2. the best way to customize 3th party component slightly is camel inline style, it ensures order */}
                {/* 3. Mui - use MuiThemeProvider and createMuiTheme for a global color theme */}
                {/* 4. Mui - use overrides keys to customize a specific component globally */}
                {/* 5. Mui - for a wrapped component, use withStyles to customize it by adding or overriding class name in js object format */}
                <TextField
                    name="q"
                    value={data.q}
                    onChange={this.handleChange}
                    margin="normal"
                    placeholder="Search"
                />
                {tags}
                <Button
                    variant="raised"
                    color="secondary"
                    size="small"
                    onClick={this.handleClear}>
                    Clear
                </Button>
            </div>
        );
    }
}

export default SearchBar;