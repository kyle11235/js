import React, {Component} from 'react';
import './PipelineList.css';
import {Grid} from 'react-bootstrap';
import PipelineRow from './PipelineRow';

class PipelineList extends Component {

    render() {
        // simplest way to give default value
        if (!this.props.data) {
            return null;
        }

        const pipelineRows = this.props.data.map((pipeline) =>
            <PipelineRow
                key={pipeline.id}
                data={pipeline}
                componentTypes={this.props.componentTypes}
                showAuthor={this.props.showAuthor}
            />
        );
        return (
            <Grid className="PipelineList">
                {pipelineRows}
            </Grid>
        );
    }
}

export default PipelineList;