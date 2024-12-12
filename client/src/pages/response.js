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

    const { name, weakness, resistance, immunity, type, sprite } = pokemonData;

    return (
        <div className="image-background">
            <div className="response-container">
                <div className="header-container">
                    <button className="back-button" onClick={() => navigate(-1)}>
                        ← Back
                    </button>
                    <h1 className="pokemon-name">{name.charAt(0).toUpperCase() + name.slice(1)}</h1>
                </div>
                {/* pokemon image and its types */}
                <div className="flex justify-center">
                    <div className="bg-[#FFCC0080] rounded-xl flex">
                        <img src={sprite} className="w-[128px] h-[128px] flex" alt={name + " image"}></img>
                        {type ? (
                            <div className="m-5 min-w-[75px]">
                                {type.map((type) => (
                                    <div key={type} className={`type-label ${type}`}>
                                        {type}
                                    </div>
                                ))}
                            </div>
                        ) : null}
                    </div>
                </div>
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
