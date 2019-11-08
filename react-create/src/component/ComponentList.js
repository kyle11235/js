import React, {Component} from 'react';
import './ComponentList.css';
import {Grid} from 'react-bootstrap';
import ComponentRow from './ComponentRow';

class ComponentList extends Component {

    handleChange = (component, value) => {
        this.props.handleChange(component, value);
    }

    render() {
        // simplest way to give default value
        if (!this.props.data) {
            return null;
        }

        const componentRows = this.props.data.map((component) =>
            <ComponentRow
                key={component.id}
                data={component}
                pipeline={this.props.pipeline}
                handleChange={this.handleChange}
                using={this.props.using}
            />
        );
        return (
            <Grid className="ComponentList">
                {componentRows}
            </Grid>
        );
    }
}

export default ComponentList;