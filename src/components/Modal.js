import React, { Component } from "react";
import Modal from "react-bootstrap/Modal";

class ShowModal extends Component {

  render() {
    return (
      <>
        <Modal
          show={this.props.show}
        >
          <Modal.Dialog>
            <Modal.Header>
              <Modal.Title>Congratulations</Modal.Title>
            </Modal.Header>

            <Modal.Body>
              <p>You have found the pair of this card!</p>
            </Modal.Body>
          </Modal.Dialog>
        </Modal>
      </>
    );
  }
}

export default ShowModal;
