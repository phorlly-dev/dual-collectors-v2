import * as React from "react";
import Modal from "./Modal";

const GuideModals = ({ openModal, setOpenModal }) => {
    React.useEffect(() => {}, []);

    return (
        <>
            {/* Desktop Guide */}
            <Modal
                isOpen={openModal === "desktop"}
                onClose={() => setOpenModal(null)}
                title="▶ Desktop Controls"
            >
                <div className="control-item">
                    <div className="control-icon">⇌</div>
                    <div className="control-text">
                        <div className="control-key text-body">
                            ←/→ or A / D
                        </div>
                        <div className="control-desc text-info">
                            Move your player left / right
                        </div>
                    </div>
                </div>
                <div className="control-item">
                    <div className="control-icon">␣</div>
                    <div className="control-text">
                        <div className="control-key text-body">SPACE</div>
                        <div className="control-desc text-info">Jump</div>
                    </div>
                </div>

                <div className="control-item purple">
                    <div className="control-icon">⬜</div>
                    <div className="control-text">
                        <div className="control-key text-body">
                            Purple Boxes
                        </div>
                        <div className="control-desc text-info">
                            Multiply or Divide Power (x / ÷)
                        </div>
                    </div>
                </div>

                <div className="control-item orange">
                    <div className="control-icon">⬛</div>
                    <div className="control-text">
                        <div className="control-key text-body">
                            Orange Boxes
                        </div>
                        <div className="control-desc text-info">
                            Add or Subtract Score (+ / –)
                        </div>
                    </div>
                </div>

                <div className="game-info">
                    <div className="game-info-text">
                        🏆 Keep Power above 0 & maximize your Score!
                    </div>
                </div>
            </Modal>

            {/* Mobile Guide */}
            <Modal
                isOpen={openModal === "mobile"}
                onClose={() => setOpenModal(null)}
                title="📱 Mobile Controls"
            >
                <div className="control-item">
                    <div className="control-icon small">⬅➡</div>
                    <div className="control-text">
                        <div className="control-key text-body">
                            Tap Left / Right Buttons
                        </div>
                        <div className="control-desc text-info">
                            Move your player
                        </div>
                    </div>
                </div>
                <div className="control-item">
                    <div className="control-icon">⬆</div>
                    <div className="control-text">
                        <div className="control-key text-body">
                            Tap Up Button
                        </div>
                        <div className="control-desc text-info">Jump</div>
                    </div>
                </div>
                <div className="control-item purple">
                    <div className="control-icon">⬜</div>
                    <div className="control-text">
                        <div className="control-key text-body">
                            Purple Boxes
                        </div>
                        <div className="control-desc text-info">
                            Multiply or Divide Power (x / ÷)
                        </div>
                    </div>
                </div>

                <div className="control-item orange">
                    <div className="control-icon">⬛</div>
                    <div className="control-text">
                        <div className="control-key text-body">
                            Orange Boxes
                        </div>
                        <div className="control-desc text-info">
                            Add or Subtract Score (+ / –)
                        </div>
                    </div>
                </div>

                <div className="game-info">
                    <div className="game-info-text">
                        🏆 Keep Power above 0 & maximize your Score!
                    </div>
                </div>
            </Modal>
        </>
    );
};

export default GuideModals;
