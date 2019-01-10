import React, {Component} from 'react';
import {Modal, Button} from 'react-bootstrap';

class NotYet extends Component {

    handleClose = (e) => {
        this.props.handleClose(e);
    }

    render() {
        return (
            <Modal show={this.props.show} onHide={this.handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>not implemented yet</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>
                        we think a lot before act :)
                    </p>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={this.handleClose}>Close</Button>
                </Modal.Footer>
            </Modal>
        );
    }
}

export default NotYet;