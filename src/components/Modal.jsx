import * as React from "react";

const Modal = ({ title, isOpen, onClose, children }) => {
    React.useEffect(() => {}, []);

    return (
        <div
            className={`modal fade ${isOpen ? "show d-block" : ""}`}
            tabIndex="-1"
            role="dialog"
            aria-hidden={!isOpen}
        >
            <div className="modal-dialog modal-dialog-centered" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title m-auto">{title}</h5>
                        <button
                            type="button"
                            className="btn-close control-btn rounded-circle"
                            aria-label="Close"
                            onClick={onClose}
                        ></button>
                    </div>
                    <div className="modal-body">{children}</div>
                </div>
            </div>
        </div>
    );
};

export default Modal;
