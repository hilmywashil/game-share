import { useState, useEffect } from "react";

export default function Home() {
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <div style={styles.container}>
            <div style={{ ...styles.card, padding: isMobile ? "30px" : "40px" }}>
                <h1 style={{ ...styles.title, fontSize: isMobile ? "1.5rem" : "2rem" }}>
                    Web is still under development...
                </h1>
                <p style={{ ...styles.subtitle, fontSize: isMobile ? "1rem" : "1.2rem" }}>
                    Follow my Instagram
                </p>
                <a
                    href="https://www.instagram.com/hilmygoodboy_"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={styles.button}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#c22f5b"}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "#e1306c"}
                >
                    @hilmygoodboy_
                </a>
            </div>
        </div>
    );
}

const styles = {
    container: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        background: "linear-gradient(135deg, #4f46e5, #d946ef)",
        padding: "20px",
    },
    card: {
        textAlign: "center",
        background: "white",
        borderRadius: "15px",
        boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.1)",
        maxWidth: "500px",
        width: "90%",
        marginTop: "-200px",
    },
    title: {
        fontWeight: "bold",
        color: "#333",
        marginBottom: "10px",
    },
    subtitle: {
        color: "#666",
        marginBottom: "20px",
    },
    button: {
        display: "inline-block",
        padding: "12px 24px",
        fontSize: "1rem",
        fontWeight: "bold",
        color: "white",
        backgroundColor: "#e1306c",
        borderRadius: "8px",
        textDecoration: "none",
        transition: "0.3s",
    },
};
