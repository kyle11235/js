import React, {Component} from 'react';
import './Pipeline.css';
import AppBar from "./AppBar";
import {Grid, Row, Col, Tabs, Tab} from 'react-bootstrap';
import data from "../data/data";
import ComponentList from "./ComponentList";
import Snackbar from 'material-ui/Snackbar';
import Button from 'material-ui/Button';
import Auth from "../model/Auth";
import Dialog, {
    DialogContent,
    DialogContentText,
    DialogTitle,
} from 'material-ui/Dialog';

class Pipeline extends Component {

    constructor(props) {
        super(props);
        this.state = {
            author: null,
            pipelineName: null,
            pipeline: null,
            components: [],
            key: 1,
            draft: {
                components: {}
            },
            openTip: false,
            openDialog: false
        };
    }

    handleSelect = (key) => {
        this.setState({key});
    }

    componentWillMount() {
        // author/name should be lowercase when registered, but I always use lowercase to compare
        // other names can be uppercase when created
        this.setState({
            author: this.props.match.params.user.toLowerCase(),
            pipelineName: this.props.match.params.pipelineName,
            components: data.components.sort((a, b) => {
                return a.name > b.name;
            })
        });
    }

    componentDidMount() {
        this.search();
    }

    getComponentCounter(pipeline, components) {
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
        this.setState((state) => {
            const pipelines = data.pipelines.filter((pipeline) => {
                if (pipeline.author === state.author && pipeline.name.toLowerCase() === state.pipelineName.toLowerCase()) {
                    pipeline.componentCounter = this.getComponentCounter(pipeline, data.components)
                    return pipeline;
                }
                return null;
            });
            return {pipeline: pipelines[0]};
        })
    }

    handleChange = (_component, value) => {
        if (Auth.user.name === _component.author) {

            // update draft
            const draft = JSON.parse(JSON.stringify(this.state.draft));
            draft.components[_component.id] = value;
            this.setState({draft: draft});

            // update components
            const components = JSON.parse(JSON.stringify(this.state.components));
            components.map((component) => {
                if (component.id === _component.id) {
                    component.shared = value;
                }
                return component;
            });
            this.setState({components: components});

        } else {
            this.setState({openDialog: true});
        }
    }

    render() {
        let index = 1;
        const tabs = data.componentTypes.map((componentType) => {

            let using = [];
            let sharedByOthers = [];
            this.state.components.forEach((component) => {
                if (component.type === componentType) {
                    if (this.state.pipeline && this.state.pipeline.components[component.id] !== undefined) {
                        using.push(component);
                    } else if (component.shared) {
                        sharedByOthers.push(component);
                    }
                }
            })

            return <Tab key={++index} eventKey={++index}
                        title={componentType.toUpperCase() + '(' + (this.state.pipeline && this.state.pipeline.componentCounter[componentType] ? this.state.pipeline.componentCounter[componentType] : 0) + ')'}>
                <div className="tab">
                    <Grid>
                        <Row>
                            <Col xs={8} md={10}></Col>
                            <Col xs={2} md={1}>
                                <Button variant="raised" color="secondary"
                                        onClick={() => this.setState({openTip: !this.state.openTip})}>
                                    Add
                                </Button>
                            </Col>
                            <Col xs={2} md={1}>
                                <Button variant="raised" color="secondary"
                                        onClick={() => this.setState({openTip: !this.state.openTip})}>
                                    Provision
                                </Button>
                            </Col>
                        </Row>
                    </Grid>

                    <h3>Using</h3>
                    <ComponentList key={componentType + '_pipeline'} handleChange={this.handleChange} data={using}
                                   pipeline={this.state.pipeline} using={true}/>

                    {/*
                    <h3>Shared by others</h3>
                    <ComponentList key={componentType + '_shared'} handleChange={this.handleChange}
                                   data={sharedByOthers} using={false}/>
                     */}
                </div>
            </Tab>
        });

        return (
            <div className="Pipeline">
                <Snackbar
                    anchorOrigin={{vertical: 'bottom', horizontal: 'center'}}
                    open={this.state.openTip}
                    onClose={() => {
                        this.setState({openTip: false});
                    }}
                    message={'Not implemented.'}
                />

                <Dialog
                    open={this.state.openDialog}
                    onClose={() => {
                        this.setState({openDialog: false});
                    }}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">Why you cannot modify this?</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            - Are you logged in?
                            <br/>
                            - Is it your component?
                        </DialogContentText>
                    </DialogContent>
                </Dialog>

                <AppBar/>

                <Grid>
                    <Row className="info">
                        <Col xs={12} md={12}>
                            <h2>{this.state.author}/{this.state.pipeline ? this.state.pipeline.name : 'not-exists'}</h2>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Tabs activeKey={this.state.key}
                                  onSelect={this.handleSelect}
                                  id="controlled-tab-example">
                                <Tab eventKey={1} title="README">
                                    <div className="tab">
                                        {this.state.pipeline && this.state.pipeline.desc}
                                    </div>
                                </Tab>
                                {tabs}
                            </Tabs>
                        </Col>
                    </Row>
                </Grid>
            </div>
        );
    }
}

export default Pipeline;