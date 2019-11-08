import React, {Component} from 'react';
import './PipelineBar.css';
import {Grid, Row, Col} from 'react-bootstrap';


class PipelineBar extends Component {

    render() {
        return (
            <div className="PipelineBar">
                <Grid>
                    <Row className="bar">
                        <Col xs={10} md={10}>
                            {this.props.children}
                        </Col>
                        <Col xs={2} md={2}>
                            <span style={{lineHeight:'50px'}}>
                                 {this.props.count} results
                            </span>
                        </Col>
                    </Row>
                </Grid>
            </div>
        );
    }
}

export default PipelineBar;