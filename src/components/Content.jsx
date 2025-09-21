import * as React from "react";
import { offEvents, onEvents } from "../hooks/remote";

// Lazy load the Phaser game
const PhaserGame = React.lazy(() => import("./PhaserGame"));
const Header = React.lazy(() => import("./Header"));
const Footer = React.lazy(() => import("./Footer"));

const Content = ({ player, onLogout }) => {
    const phaserRef = React.useRef();
    const [isFooter, setIsFooter] = React.useState(false);
    const [isHeader, setIsHeader] = React.useState(false);
    const [isMobile, setIsMobile] = React.useState(false);

    React.useEffect(() => {
        const events = ["header", "footer"];
        const callbacks = [
            (data = false) => setIsFooter(data),
            (data = false) => setIsHeader(data),
        ];

        onEvents({ events, callbacks });
        return () => offEvents({ events, callbacks });
    }, [isFooter, isHeader]);

    // Detect screen size
    React.useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth <= 768);
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <div className="game-container card bg-dark bg-opacity-75 rounded-4 m-0">
            {/* HEADER */}
            <Header
                player={player}
                onLogout={onLogout}
                isHeader={isHeader}
                isMobile={isMobile}
            />

            {/* GAME BOARD */}
            <main className="phaser-wrapper card-content">
                <PhaserGame
                    ref={phaserRef}
                    player={player}
                    style={{ maxWidth: "600px", width: "100%" }}
                />
            </main>

            {/* FOOTER */}
            <Footer isFooter={isFooter} isMobile={isMobile} />
        </div>
    );
};

export default Content;
