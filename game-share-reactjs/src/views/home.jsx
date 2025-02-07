export default function Home() {
    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <h1 style={styles.title}>Web is still under development...</h1>
                <p style={styles.subtitle}>Follow my Instagram</p>
                <a
                    href="https://www.instagram.com/hilmygoodboy_"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={styles.button}
                >
                    @hilmygoodboy_
                </a>
            </div>
        </div>
    );
}

const styles = {
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        background: 'linear-gradient(135deg, #4f46e5, #d946ef)',
        padding: '20px', // Supaya tidak terlalu mepet di HP
    },
    card: {
        padding: '40px',
        textAlign: 'center',
        background: 'white',
        borderRadius: '15px',
        boxShadow: '0px 10px 30px rgba(0, 0, 0, 0.1)',
        maxWidth: '500px',
        width: '90%', // Agar responsif di HP
        marginTop: '-200px',

    },
    title: {
        fontSize: '2rem', // Ukuran font fleksibel
        fontWeight: 'bold',
        color: '#333',
        marginBottom: '10px',
    },
    subtitle: {
        fontSize: '1.2rem',
        color: '#666',
        marginBottom: '20px',
    },
    button: {
        display: 'inline-block',
        padding: '12px 24px',
        fontSize: '1rem',
        fontWeight: 'bold',
        color: 'white',
        backgroundColor: '#e1306c',
        borderRadius: '8px',
        textDecoration: 'none',
        transition: '0.3s',
    },
};

// Media query untuk layar kecil (mobile)
if (window.innerWidth < 768) {
    styles.card.padding = '30px';
    styles.title.fontSize = '1.5rem';
    styles.subtitle.fontSize = '1rem';
    styles.button.padding = '10px 20px';
}

// Hover effect untuk desktop
styles.button[':hover'] = {
    backgroundColor: '#c22f5b',
};

export { styles };
