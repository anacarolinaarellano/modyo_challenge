import React, { Component } from "react";
import Modal from "react-bootstrap/Modal";
import "../App.css";

class ShowModal extends Component {
  render() {
    return (
      <>
        <Modal show={this.props.show}>
          <Modal.Dialog>
            <Modal.Header className={this.props.theme}>
              <Modal.Title>Congratulations</Modal.Title>
            </Modal.Header>
            <Modal.Body className={this.props.theme}>
              <p>You have found the pair of this card!</p>
            </Modal.Body>
          </Modal.Dialog>
        </Modal>
      </>
    );
  }
}

export default ShowModal;
