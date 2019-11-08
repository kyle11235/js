import React, {Component} from 'react';
import './User.css';
import AppBar from "./AppBar";
import {Grid, Row, Col, Tabs, Tab, Image} from 'react-bootstrap';
import data from "../data/data";
import PipelineList from "./PipelineList";
import golang_png from '../images/golang.png';

class User extends Component {

    constructor(props) {
        super(props);
        this.state = {
            author: null,
            pipelines: []
        };
    }

    componentWillMount() {
        this.setState({
            author: this.props.match.params.user.toLowerCase()
        });
    }

    componentDidMount() {
        this.search();
    }

    getComponentCounter(pipeline, components){
        let componentCounter = {};
        if (pipeline.components) {
            for (let componentId in pipeline.components) {
                let component = null;
                components.forEach(c => {
                    if (c.id.toString() === componentId) {
                        component = c;
                        return;
                    }
                });
                componentCounter[component.type] = componentCounter[component.type] ? componentCounter[component.type] + 1 : 1;
            }
        }
        return componentCounter;
    }

    search() {
        let pipelines = null;
        this.setState((state) => {
            pipelines = data.pipelines.filter((pipeline) => {
                if (pipeline.author === state.author) {
                    pipeline.componentCounter = this.getComponentCounter(pipeline, data.components);
                    return pipeline;
                }
                return null;
            });
            // do not update state again directly
            return {pipelines: pipelines};
        })
    }

    render() {
        return (
            <div className="User">

                <AppBar/>

                <Grid>
                    <Row className="profile">
                        <Col xs={4} md={1}>
                            <Image src={golang_png}/>
                        </Col>
                        <Col xs={8} md={11}>
                            <h2>{this.props.match.params.user.toLowerCase()}</h2>
                        </Col>
                    </Row>
                    <Tabs defaultActiveKey={1} animation={false} id="noanim-tab-example">
                        <Tab eventKey={1} title="Pipelines">
                            <PipelineList data={this.state.pipelines} componentTypes={data.componentTypes}/>
                        </Tab>
                        <Tab eventKey={2} title="Stars">
                            <div className="tab"> not implemented.</div>
                        </Tab>
                        <Tab eventKey={3} title="Followers">
                            <div className="tab"> not implemented.</div>
                        </Tab>
                        <Tab eventKey={4} title="Following">
                            <div className="tab"> not implemented.</div>
                        </Tab>
                    </Tabs>
                </Grid>
            </div>
        );
    }
}

export default User;