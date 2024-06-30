import React, { useState } from 'react'
import PassModal from './PassModal';

const RecruitListBtn = ({ ContentListItemText }) => {
    const [showModal, setShowModal] = useState(false);

    const handleShow = () => setShowModal(true);
    const handleClose = () => setShowModal(false);
    return (
        <div>
            <button
                type="button"
                className="btn-short1"
                id="btn-stop"
                onClick={handleShow}
            >
                <strong>{ContentListItemText}</strong>
            </button>

            <PassModal show={showModal} handleClose={handleClose} />
        </div>
    );
}

export default RecruitListBtn