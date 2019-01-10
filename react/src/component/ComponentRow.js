import React, {Component} from 'react';
import './ComponentRow.css';
import {Row, Col, Panel} from 'react-bootstrap';
import {FormControlLabel} from 'material-ui/Form';
import Switch from 'material-ui/Switch';
import Button from 'material-ui/Button';
import Dialog, {
    DialogContent,
    DialogContentText,
    DialogTitle,
} from 'material-ui/Dialog';

class ComponentRow extends Component {

    constructor(props) {
        super(props);
        this.state = {
            openDesc: this.props.using,
            openDialog: false
        };
    }

    handleChange = (e, id) => {
        const target = e.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        console.log(id, value);
        this.props.handleChange(this.props.data, value);
    }

    render() {
        if (!this.props.data) {
            return null;
        }
        return (
            <Row className="ComponentRow">
                <Col>
                    <Row>
                        <Col xs={8} md={10}>
                            <Button variant="raised" color="primary"
                                    onClick={() => this.setState({openDesc: !this.state.openDesc})}>
                                <span className="name">{this.props.data.name}</span>
                            </Button>

                            {/* react route Link does not work here */}
                            <span className="pipeline">
                                {this.props.data.author}/{this.props.data.pipeline}
                            </span>
                        </Col>
                        <Col xs={4} md={2}>
                            {this.props.using && <FormControlLabel
                                control={
                                    <Switch
                                        checked={this.props.data.shared}
                                        onChange={(e) => this.handleChange(e, this.props.data.id)}
                                        color="secondary"
                                    />
                                }
                                label="shared"
                            />}
                            {!this.props.using && <FormControlLabel
                                control={
                                    <Switch
                                        checked={false}
                                        onChange={(e) => this.setState({openDialog: true})}
                                        color="secondary"
                                    />
                                }
                                label="use"
                            />}
                            <Dialog
                                open={this.state.openDialog}
                                onClose={() => {
                                    this.setState({openDialog: false});
                                }}
                                aria-labelledby="alert-dialog-title"
                                aria-describedby="alert-dialog-description"
                            >
                                <DialogTitle id="alert-dialog-title">My Info (Not implemented)</DialogTitle>
                                <DialogContent>
                                    <DialogContentText id="alert-dialog-description">
                                        Provide info for your specific pipeline.
                                    </DialogContentText>
                                </DialogContent>
                            </Dialog>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Panel onToggle expanded={this.state.openDesc}>
                                <Panel.Collapse>
                                    <Panel.Body>
                                        <strong>Description:</strong><br/>
                                        <span dangerouslySetInnerHTML={{__html:this.props.data.desc}} />
                                    </Panel.Body>
                                </Panel.Collapse>
                            </Panel>
                            {this.props.using && <Panel onToggle expanded={this.state.openDesc}>
                                <Panel.Collapse>
                                    <Panel.Body>
                                        <strong>My Info:</strong><br/>
                                        {this.props.pipeline && (<span dangerouslySetInnerHTML={{__html:this.props.pipeline.components[this.props.data.id]}} /> || 'Not provided.')}
                                    </Panel.Body>
                                </Panel.Collapse>
                            </Panel>}
                        </Col>
                    </Row>
                </Col>
            </Row>
        );
    }
}

export default ComponentRow;