import React from "react";
import { motion } from "framer-motion";
import "bootstrap/dist/css/bootstrap.min.css";
import img1 from "../assets/image1.png";
import img2 from "../assets/image2.png";
import bgMusic from "../assets/clip.mp3";



const OPEN_DATE = new Date("2026-01-01T00:00:00").getTime();
const ALLOWED_NAME = "radhika";



export default function BirthdayWebsite() {
    const [userName, setUserName] = React.useState("");

    const [isVerified, setIsVerified] = React.useState(false);
    const [error, setError] = React.useState("");

    const [isOpen, setIsOpen] = React.useState(Date.now() >= OPEN_DATE);
    const [timeLeft, setTimeLeft] = React.useState(OPEN_DATE - Date.now());


    const [showDialog, setShowDialog] = React.useState(false);

    const [showMemories, setShowMemories] = React.useState(false);


    const bgAudio = React.useRef(null);

    // iamge wrapper 
    const memoryImageStyle = React.useMemo(() => ({
        width: "300px",
        height: "400px",
        objectFit: "cover",
        borderRadius: "12px",
    }), []);

    React.useEffect(() => {
        if (isVerified && !isOpen) {
            const timer = setInterval(() => {
                const diff = OPEN_DATE - Date.now();

                setTimeLeft(diff);

                if (diff <= 0) {
                    setIsOpen(true);
                    clearInterval(timer);
                }
            }, 1000);

            return () => clearInterval(timer);

        }
    }, [isVerified, isOpen]);



    React.useEffect(() => {
        // 🎯 Main page is visible now
        if (isVerified && isOpen) {

            if (!bgAudio.current) {
                bgAudio.current = new Audio(bgMusic);
                bgAudio.current.loop = true;
                bgAudio.current.volume = 0.7;
            }

            bgAudio.current.play().catch(() => {
                console.log("Audio play blocked");
            });
        }
    }, [isVerified, isOpen]);



    const handleVerify = () => {
        if (userName.toLowerCase() === ALLOWED_NAME) {
            setIsVerified(true);   // सिर्फ verify
        } else {
            setError("❌ You are not allowed to view this website");
        }
    };


    /* ---------- NAME VERIFICATION ---------- */
    if (!isVerified) {
        return (
            <div
                className="d-flex align-items-center justify-content-center text-center"
                style={{ minHeight: "100vh", background: "#000" }}
            >
                <div className="text-white" style={{ maxWidth: "320px" }}>
                    <h2 className="mb-4">🔐 Enter Your Name</h2>

                    <input
                        type="text"
                        className="form-control text-center mb-3"
                        placeholder="Enter your name"
                        value={userName}
                        onChange={(e) => {
                            setUserName(e.target.value);
                            setError("");
                        }}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                handleVerify();
                            }
                        }}
                    />

                    <button
                        className="btn btn-danger w-100"
                        onClick={handleVerify}
                    >
                        Verify
                    </button>

                    {error && (
                        <p className="text-danger mt-3 fw-semibold">
                            {error}
                        </p>
                    )}
                </div>
            </div>
        );
    }

    /* ---------- COUNTDOWN SCREEN ---------- */
    if (!isOpen) {
        const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeLeft / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((timeLeft / (1000 * 60)) % 60);
        const seconds = Math.floor((timeLeft / 1000) % 60);

        return (
            <div
                className="d-flex align-items-center justify-content-center text-center"
                style={{
                    minHeight: "100vh",
                    background: "linear-gradient(135deg,#000428,#004e92)",
                }}
            >
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 1 }}
                    className="text-white"
                >
                    <h1 className="display-4 fw-bold">
                        🎁 💌 A Romantic Surprise Is Loading…
                    </h1>
                    <p className="lead">
                        This website will unlock on 1st January
                    </p>
                    <h2 className="mt-4">
                        ⏳ {days}d {hours}h {minutes}m {seconds}s
                    </h2>
                    <p className="mt-3">
                        Counting moments until I can see your smile ❤️
                    </p>
                </motion.div>
            </div>
        );
    }






    /* ---------- MAIN PAGE ---------- */
    return (
        <>


            <div
                className="container-fluid p-0"
                style={{
                    background: "linear-gradient(135deg,#ff9a9e,#fad0c4)",
                    minHeight: "100vh",
                }}
            >
                <motion.div
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                    className="text-center text-white py-5"
                >
                    <h1 className="display-4 fw-bold">
                        Happy Birthday {ALLOWED_NAME} ❤️
                    </h1>
                    <p className="lead">
                        A romantic surprise made just for you
                    </p>

                    <div className="d-flex flex-column flex-sm-row justify-content-center gap-3 mt-4">
                        <button
                            className="btn btn-light btn-lg"
                            onClick={() => setShowDialog(true)}
                        >
                            💌 Open Message
                        </button>

                        <button
                            className="btn btn-light btn-lg"
                            onClick={() => setShowMemories(true)}
                        >
                            📸 View Memories
                        </button>
                    </div>

                </motion.div>

                {/* DIALOG HERE */}
                {showDialog && (
                    <motion.div
                        className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
                        style={{ background: "rgba(0,0,0,0.6)", zIndex: 9999 }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        onClick={() => setShowDialog(false)}
                    >
                        <motion.div
                            className="bg-white rounded-4 p-4 text-center shadow-lg"
                            style={{ maxWidth: "400px", width: "90%" }}
                            initial={{ scale: 0.7, y: 50, opacity: 0 }}
                            animate={{ scale: 1, y: 0, opacity: 1 }}
                            transition={{ type: "spring", stiffness: 120 }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <h3 className="mb-3">💖 For You</h3>
                            <p>
                                Happy Birthday to the one who makes my life brighter in ways words can never fully explain. You bring love, calm, and happiness into my world just by being yourself. Every moment with you feels special, and I am grateful for every smile, every memory, and every dream we share. May this year give you endless reasons to smile, just like you give me every single day.
                            </p>

                            <button
                                className="btn btn-danger mt-3"
                                onClick={() => setShowDialog(false)}
                            >
                                Close
                            </button>
                        </motion.div>
                    </motion.div>
                )}


                {showMemories && (
                    <motion.div
                        className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
                        style={{ background: "rgba(0,0,0,0.7)", zIndex: 9999 }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        onClick={() => setShowMemories(false)}
                    >
                        <motion.div

                            className="bg-white rounded-4 p-4 shadow-lg"
                            style={{
                                maxWidth: "900px",
                                width: "95%",
                                maxHeight: "90vh",
                                overflowY: "auto",
                            }}
                            initial={{ scale: 0.8, y: 50, opacity: 0 }}
                            animate={{ scale: 1, y: 0, opacity: 1 }}
                            transition={{ type: "spring", stiffness: 120 }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="d-flex justify-content-between align-items-center mb-3">
                                <h3 className="mb-0">📸 Our Memories</h3>
                                <button
                                    className="btn btn-sm btn-danger"
                                    onClick={() => setShowMemories(false)}
                                >
                                    ✕
                                </button>
                            </div>

                            {/* 🔹 MEDIA GRID */}
                            <div className="row g-4 align-items-center">

                                {/* ===== MEMORY 1 IMAGE ===== */}
                                <div className="col-12 col-md-6 text-center order-1 order-md-1">
                                    <img
                                        src={img1}
                                        alt="Memory 1"
                                        style={memoryImageStyle}
                                        className="img-fluid"
                                    />
                                </div>

                                {/* ===== MEMORY 1 TEXT ===== */}
                                <div className="col-12 col-md-6 order-2 order-md-2">
                                    <h4 className="fw-semibold mb-3 text-center text-md-start">
                                        💫 A Moment to Remember
                                    </h4>

                                    <p className="mb-2 text-center text-md-start">
                                        Every memory with you feels like a beautiful chapter
                                        written straight from the heart.
                                    </p>

                                    <p className="mb-2 text-center text-md-start">
                                        These moments are not just pictures — they are emotions,
                                        smiles, and promises frozen in time.
                                    </p>

                                    <p className="mb-0 fst-italic text-center text-md-start">
                                        You are my favorite memory, always. ❤️
                                    </p>
                                </div>

                                {/* ===== MEMORY 2 TEXT ===== */}
                                <div className="col-12 col-md-6 order-4 order-md-3">
                                    <h4 className="fw-semibold mb-3 text-center text-md-start">
                                        💫 Wishing for these moments
                                    </h4>

                                    <p className="mb-2 text-center text-md-start">
                                        Our memories are my favorite place to revisit.
                                    </p>

                                    <p className="mb-2 text-center text-md-start">
                                        We didn’t just make memories, we built a story.
                                    </p>

                                    <p className="mb-0 fst-italic text-center text-md-start">
                                        Every laugh with you turned into a lifetime memory ❤️
                                    </p>
                                </div>

                                {/* ===== MEMORY 2 IMAGE ===== */}
                                <div className="col-12 col-md-6 text-center order-3 order-md-4">
                                    <img
                                        src={img2}
                                        alt="Memory 2"
                                        style={memoryImageStyle}
                                        className="img-fluid"
                                    />
                                </div>

                            </div>


                        </motion.div>
                    </motion.div>
                )
                }


                <motion.footer
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                    className="text-center text-white py-4"
                >
                    <p className="mb-0">Made with ❤️ by Himanshu</p>
                </motion.footer>
            </div >
        </>
    );
}