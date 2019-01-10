import React, {Component} from 'react';
import './PipelineRow.css';
import {Row, Col, Label} from 'react-bootstrap';
import {Link} from "react-router-dom";
import ComponentTypes from './ComponentTypes';

class PipelineRow extends Component {

    render() {
        if (!this.props.data) {
            return null;
        }
        const data = this.props.data;
        let tags = '';
        if (data.tags) {
            tags = data.tags.map((tag) => {
                // {} and return
                return <Label key={tag} bsClass={tag}>{tag}</Label>
            });
        }

        return (
            <Row className="PipelineRow">
                <Col xs={12} md={12}>
                    <Row className="title">
                        <Col xs={6} md={8}>
                        <Link to={'/' + data.author + '/' + data.name}>
                            {this.props.showAuthor ? data.author + '/' : ''}<span className="name">{data.name}</span>
                        </Link>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={6} md={8}>
                            <p className="desc">{data.desc.length > 300?data.desc.slice(0, 300) + '...':data.desc}</p>
                            {tags}
                        </Col>
                        <Col xs={6} md={4}>
                            <ComponentTypes componentTypes={this.props.componentTypes} componentCounter={data.componentCounter}/>
                        </Col>
                    </Row>
                </Col>
            </Row>
        );
    }
}

export default PipelineRow;