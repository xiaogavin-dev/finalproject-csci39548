import '../styles/calculator.css'
import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import pokemonJson from "../public/pokemon_names.json"

const Calculator = () => {

    // USING MOCK DATA FOR NOW

    const [searchInput, setSearchInput] = useState('');
    const [isValid, setIsValid] = useState(false);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [highlightIndex, setHighlightIndex] = useState(-1);


    // PLACEHOLDER: remember to replace with pokeAPI data later
    const allPokemonNames = pokemonJson;
    // console.log(allPokemonNames)

    useEffect(() => {
        // filter suggestions dynamically
        const filteredSuggestions = allPokemonNames.filter((name) =>
            name.toLowerCase().startsWith(searchInput.toLowerCase())
        );

        setSuggestions(filteredSuggestions);
        setIsValid(filteredSuggestions.includes(searchInput.toLowerCase()));
        setHighlightIndex(-1); //reset highlight
    }, [searchInput]);

    const handleChange = (e) => {
        setSearchInput(e.target.value);
        //setErrorMessage(''); //clear error
        setShowSuggestions(true);
    };

    const handleBlur = () => {
        //reset placeholder if empty input, close suggestions box
        if (searchInput.trim() === '') setSearchInput('');
        setShowSuggestions(false);
    };

    //keyboard arrowkeys functionality
    const handleKeyDown = (e) => {
        if (showSuggestions) {
            if (e.key === 'ArrowDown') {
                // nav down
                setHighlightIndex((prevIndex) =>
                    prevIndex < suggestions.length - 1 ? prevIndex + 1 : 0
                );
            } else if (e.key === 'ArrowUp') {
                // nav up
                setHighlightIndex((prevIndex) =>
                    prevIndex > 0 ? prevIndex - 1 : suggestions.length - 1
                );
            } else if (e.key === 'Enter') {
                // select highlighted
                if (highlightIndex >= 0 && suggestions[highlightIndex]) {
                    setSearchInput(suggestions[highlightIndex]);
                    setShowSuggestions(false);
                }
            }
        }
    };

    const handleSuggestionClick = (suggestion) => {
        setSearchInput(suggestion);
        setShowSuggestions(false);
    };


    const navigate = useNavigate();
    
    const handleSubmit = async () => {
        try {
            const response = await fetch(`/pokemon/${searchInput}`, {
                method: 'GET',
            });

            if (!response.ok) {
                throw new Error('Error fetching data');
            } 

            const data = await response.json();
            if (!data || Object.keys(data).length === 0) {
                throw new Error('No data returned from the server');
            }

            navigate('/response', {
                state: {
                    pokemonData: {
                        name: data.name,
                        weakness: data.weakness,
                        resistance: data.resistance,
                        immunity: data.immunity,
                    },
                },
            });

        } catch (error) {
            console.error('Error:', error);
            setErrorMessage('Please enter a valid Pokémon name.');
        }


        /*if (isValid) {
            console.log(`Searching for ${searchInput}`);
            setErrorMessage(''); //clear error

            const data = Object.values(dataToPass);
            console.log(data);

            const pokemonWeakness = data[4];
            const pokemonResistance = data[5];
            const pokemonImmunity = data[6];

            // go to response page
            navigate('/response', {
                state: {
                    pokemonData: {
                        name: searchInput,
                        weakness: [],
                        resistance: [],
                        immunity: [],
                    },
                },
            });

        } else {
            setErrorMessage('Please enter a valid Pokémon name.');
        }*/
    };


    return (
        <div className="container_calc">
            <div className="top-center-text font-semibold">Type Calculator</div>
            <div className="input-container">
		<div className="instruction-text">Enter a Pokémon name:</div>
                <div className="input-wrapper">
                    <input
                        type="text"
                        className="search-bar"
                        placeholder={!searchInput ? 'Search' : ''}
                        value={searchInput}
                        onChange={handleChange}
                        //onFocus={() => setShowSuggestions(true)}
                        onBlur={handleBlur}
                        onKeyDown={handleKeyDown}
                        aria-label="Search Pokémon name"
                    />
                    {showSuggestions && suggestions.length > 0 && (
                        <ul className="suggestions-list">
                            {suggestions.map((suggestion, index) => (
                                <li
                                    key={suggestion}
                                    onMouseDown={() => handleSuggestionClick(suggestion)} //prevent blur firing
                                    className={highlightIndex === index ? 'highlighted' : ''}
                                    tabIndex="0"
                                >
                                    {suggestion}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
                <button
                    className={`send-button`}
                    onClick={handleSubmit}
                    //disabled={!isValid}
                    //aria-disabled={!isValid}
                >
                    Send
                </button>
            </div>
            {errorMessage && <div className="error-message">{errorMessage}</div>}
        </div>
    );
}

export default Calculator;
