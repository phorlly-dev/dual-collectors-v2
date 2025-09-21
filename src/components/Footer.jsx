import * as React from "react";
import { emitEvent } from "../hooks/remote";

const Footer = ({ isFooter, isMobile }) => {
    React.useEffect(() => {}, []);

    const handlePress = (key) => {
        emitEvent(key, true);
    };

    const handleRelease = (key) => {
        emitEvent(key, false);
    };

    return (
        isFooter &&
        isMobile && (
            <footer className="d-flex justify-content-center align-items-center">
                <section className="controls-row card-footer rounded-4 p-3 bg-opacity-75 bg-gradient">
                    <button
                        onPointerDown={() => handlePress("left")}
                        onPointerUp={() => handleRelease("left")}
                        title="Go Left"
                        aria-label="Go Left"
                        className="control-btn left rounded-circle"
                    >
                        <i className="fa fa-arrow-left"></i>
                    </button>
                    <button
                        onPointerDown={() => handlePress("jump")}
                        onPointerUp={() => handleRelease("jump")}
                        title="Jump"
                        aria-label="Jump"
                        className="control-btn up rounded-circle"
                    >
                        <i className="fa fa-arrow-up"></i>
                    </button>
                    <button
                        onPointerDown={() => handlePress("right")}
                        onPointerUp={() => handleRelease("right")}
                        title="Go Right"
                        aria-label="Go Right"
                        className="control-btn right rounded-circle"
                    >
                        <i className="fa fa-arrow-right"></i>
                    </button>
                </section>
            </footer>
        )
    );
};

export default Footer;
