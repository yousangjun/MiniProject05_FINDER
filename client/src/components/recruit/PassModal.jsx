import React from 'react';
import { Modal } from 'react-bootstrap';

const PassModal = ({ show, handleClose }) => {
  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title id="exampleModalLabel">종합이력서 결과 안내</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ textAlign: 'center' }}>
        <strong id="result1"></strong>
        <br />
        <br />
        <div id="result2"></div>
        <br />
        <div id="result3"></div>
      </Modal.Body>
      <Modal.Footer>
        {/* 필요 시 추가 버튼 등을 여기에 넣으세요 */}
      </Modal.Footer>
    </Modal>
  );
};

export default PassModal;
