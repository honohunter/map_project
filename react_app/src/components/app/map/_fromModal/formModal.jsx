/* eslint-disable react/sort-comp */
/* eslint-disable class-methods-use-this */
/* eslint-disable react/jsx-props-no-spreading */
import React, { Component } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

class FormModal extends Component {
  constructor(props) {
    super(props);
    this.handleComment = this.handleComment.bind(this);
    this.handleName = this.handleName.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.setModalProps = this.setModalProps.bind(this);
    this.state = {};
  }

  handleComment(event) {
    this.setState({ comments: event.target.value });
  }

  handleName(event) {
    this.setState({ name: event.target.value });
  }

  handleSave() {
    console.log('modal', this.state);
    this.props.handleSave(this.state);
    this.setState({});
  }

  handelHide() {
    this.setState({});
    this.props.onHide();
  }

  setModalProps() {
    let ModalTitle;
    let ModalBody;
    if (this.props.action === 'delete') {
      ModalTitle = 'Delete Place';
      ModalBody = (
        <Form.Group>
          <Form.Label>Do you want to delete this place</Form.Label>
        </Form.Group>
      );
    } else {
      ModalTitle = 'New Place';
      ModalBody = (
        <>
          <Form.Group>
            <Form.Label>Place Name</Form.Label>
            <Form.Control type="text" onChange={this.handleName} defaultValue={this.props.nameValue} />
          </Form.Group>
          <Form.Group>
            <Form.Control
              as="textarea"
              placeholder="Comments"
              rows="3"
              onChange={this.handleComment}
              defaultValue={this.props.commentsValue}
            />
          </Form.Group>
        </>
      );
    }
    return { ModalTitle, ModalBody };
  }

  render() {
    const { ModalTitle, ModalBody } = this.setModalProps();
    return (
      <Modal
        show={this.props.show}
        onHide={this.props.onHide}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">{ModalTitle}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{ModalBody}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={this.props.onHide}>
            Close
          </Button>
          <Button variant="primary" onClick={this.handleSave}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default FormModal;
