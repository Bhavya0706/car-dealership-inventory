function Hero() {
    return (
        <section className="hero">
            <div className="hero-content">
                <span className="hero-label">Smart car inventory</span>

                <h1>
                    Find a car that
                    <span> feels right.</span>
                </h1>

                <p>
                    Explore available vehicles and find the right match for
                    your budget and preferences.
                </p>

                <button className="explore-button">
                    Explore Cars
                    <span>→</span>
                </button>
            </div>

            <div className="hero-visual">
                <div className="visual-circle">
                    <span>🚗</span>
                </div>

                <div className="floating-card">
                    <strong>Verified Inventory</strong>
                    <small>Updated and managed by the dealership</small>
                </div>
            </div>
        </section>
    );
}

export default Hero;