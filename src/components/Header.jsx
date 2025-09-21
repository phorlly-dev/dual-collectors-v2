import * as React from "react";
import { emitEvent, offEvents, onEvents } from "../hooks/remote";
import { formatNumber } from "../hooks/format";
import GuideModals from "./GuideModals";

const Header = ({ player, onLogout, isHeader, isMobile }) => {
    const [isMuted, setIsMuted] = React.useState(false);
    const [isPause, setIsPause] = React.useState(false);
    const [openModal, setOpenModal] = React.useState(null);
    const [score, setScore] = React.useState(0);
    const [power, setPower] = React.useState(100);

    // Listen for Phaser events and update state
    React.useEffect(() => {
        const events = ["score", "power"];
        const callbacks = [
            (data = 0) => setScore(data),
            (data = 100) => setPower(data),
        ];

        onEvents({ events, callbacks });
        return () => offEvents({ events, callbacks });
    }, [score, power]);

    const toggleMute = () => {
        const newMute = !isMuted;
        setIsMuted(newMute);
        emitEvent("mute", newMute);
    };

    const togglePause = () => {
        const newPause = !isPause;
        setIsPause(newPause);
        emitEvent("pause", newPause);
    };

    return (
        isHeader && (
            <>
                <header className="card-header bg-opacity-75 bg-gradient rounded-4 p-3">
                    <div className="d-flex flex-column flex-md-row justify-content-md-between gap-3">
                        {/* Row 1: Stats */}
                        <section className="d-flex justify-content-center justify-content-md-start align-items-center gap-1">
                            <div className="text-box text-light d-flex align-items-center fs-6 fs-md-5">
                                <i className="fa fa-bolt text-info me-1"></i>
                                Power:{" "}
                                <span className="text-info fw-bold ms-1">
                                    {formatNumber(power)}
                                </span>
                            </div>

                            <div className="text-box text-light fs-6 fs-md-5">
                                <i className="fa fa-user"></i>
                                <span className="text-info text-capitalize ms-1">
                                    {player}
                                </span>
                            </div>

                            <div className="text-box text-light d-flex align-items-center fs-6 fs-md-5">
                                <i className="fa fa-star text-warning me-1"></i>
                                Score:{" "}
                                <span className="text-warning fw-bold ms-1">
                                    {formatNumber(score)}
                                </span>
                            </div>
                        </section>

                        {/* Row 2: Buttons */}
                        <section className="d-flex flex-wrap justify-content-center justify-content-md-end align-items-center gap-2">
                            {/* Guide */}
                            <button
                                title={
                                    isMobile ? "Mobile Guide" : "Desktop Guide"
                                }
                                aria-label="Guide"
                                onClick={() =>
                                    setOpenModal(
                                        isMobile ? "mobile" : "desktop"
                                    )
                                }
                                className="control-btn guide rounded-circle"
                            >
                                <i
                                    className={`fa ${
                                        isMobile
                                            ? "fa-mobile-phone"
                                            : "fa-desktop"
                                    }`}
                                ></i>
                            </button>

                            {/* Play/Pause */}
                            <button
                                title={isPause ? "Play" : "Pause"}
                                aria-label="Play/Pause"
                                onClick={togglePause}
                                className={`control-btn rounded-circle ${
                                    isPause ? "play" : "pause"
                                }`}
                            >
                                <i
                                    className={`fa ${
                                        isPause ? "fa-play" : "fa-pause"
                                    }`}
                                ></i>
                            </button>

                            {/* Sound */}
                            <button
                                title={isMuted ? "Unmute" : "Mute"}
                                aria-label="Mute/Unmute"
                                onClick={toggleMute}
                                className={`control-btn rounded-circle ${
                                    isMuted ? "muted" : "volume"
                                }`}
                            >
                                <i
                                    className={`fa ${
                                        isMuted
                                            ? "fa-volume-mute"
                                            : "fa-volume-up"
                                    }`}
                                ></i>
                            </button>

                            {/* Exit */}
                            <button
                                title="Logout"
                                aria-label="Logout"
                                onClick={onLogout}
                                className="control-btn btn-sm off rounded-circle"
                            >
                                <i className="fa fa-power-off"></i>
                            </button>
                        </section>
                    </div>
                </header>

                <GuideModals
                    openModal={openModal}
                    setOpenModal={setOpenModal}
                />
            </>
        )
    );
};

export default Header;
