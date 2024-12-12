import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../styles/response.css";

const ResponsePage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { pokemonData } = location.state || {};

    if (!pokemonData) {
        return (
            <div className="response-container">
                <h1>Error</h1>
                <p>No Pokémon data available. Please go back and try again.</p>
                <button className="back-button" onClick={() => navigate(-1)}>
                    Back
                </button>
            </div>
        );
    }

    const { name, weakness, resistance, immunity } = pokemonData;

    return (
        <div className="image-background">
            <div className="response-container">
                <button className="back-button" onClick={() => navigate(-1)}>
                    ← Go back to calculator
                </button>
                <h1 className="pokemon-name">{name}</h1>
                <div className="type-container">
                    <div className="type-box">
                        <h2>Weakness</h2>
                        {weakness.length > 0 ? (
                            weakness.map((type) => (
                            <div key={type} className={`type-label ${type}`}>
                                {type}
                            </div>
                            ))
                        ) : (
                            <div className="blank">No weakness found</div>
                        )}
                    </div>
                    <div className="type-box">
                        <h2>Resistance</h2>
                        {resistance.length > 0 ? (
                            resistance.map((type) => (
                            <div key={type} className={`type-label ${type}`}>
                                {type}
                            </div>
                            ))
                        ) : (
                                <div className="blank">No resistance found</div>
                        )}
                    </div>
                    <div className="type-box">
                        <h2>Immunity</h2>
                        {immunity.length > 0 ? (
                            immunity.map((type) => (
                            <div key={type} className={`type-label ${type}`}>
                                {type}
                            </div>
                            ))
                        ) : (
                                <div className="blank">No immunity found</div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ResponsePage;
