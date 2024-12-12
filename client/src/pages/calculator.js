import '../styles/calculator.css'
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from "react-router-dom";

const Calculator = () => {

    const [searchInput, setSearchInput] = useState('');
    // const [isValid, setIsValid] = useState(false);
    // const [errorMessage, setErrorMessage] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [highlightIndex, setHighlightIndex] = useState(-1);

    const [allPokemonNames, setAllPokemonNames] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);

    const suggestionsRef = useRef(null); // ref for the suggestions list
    const inputRef = useRef(null); // ref for the input field

    useEffect(() => {
        const fetchPokemonNames = async () => {
            try {
                const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=10000'); // api call for all pokemon
                const data = await response.json();
                const names = data.results.map((pokemon) => pokemon.name);
                setAllPokemonNames(names);
            } catch (error) {
                console.error('Error fetching Pokémon names:', error);
            }
        };
        fetchPokemonNames();
    }, []);

    useEffect(() => {
        // filter suggestions dynamically
        const filteredSuggestions = allPokemonNames.filter((name) =>
            name.toLowerCase().startsWith(searchInput.toLowerCase())
        );
        setSuggestions(filteredSuggestions);
        //setIsValid(filteredSuggestions.includes(searchInput.toLowerCase()));
        //setIsValid(true);
        setHighlightIndex(-1); //reset highlight
    }, [searchInput, allPokemonNames]);

    const handleChange = (e) => {
        setSearchInput(e.target.value);
        //setErrorMessage(''); //clear error
        //setShowSuggestions(true);
    };

    const handleFocus = () => {
        setShowSuggestions(true);
    };

    const handleBlur = (e) => {
        setTimeout(() => {
            // if (!suggestionsRef.current.contains(e.relatedTarget)) {
            setShowSuggestions(false);
            // }
        }, 150);
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
                    setSuggestions([]);
                    //setShowSuggestions(false);
                }
            }
        }
    };

    const handleSuggestionClick = (suggestion) => {
        setSearchInput(suggestion);
        //setShowSuggestions(false);
        setSuggestions([]);
    };


    const navigate = useNavigate();

    const handleSubmit = async () => {
        if (!searchInput) return;

        try {
            const response = await fetch(`/pokemon/${searchInput.toLowerCase()}`);
            if (!response.ok) throw new Error('Error fetching data');
            const data = await response.json();
            navigate('/response', { state: { pokemonData: data } });
        } catch (error) {
            console.error('Error fetching Pokémon data:', error);
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
                <div className="instruction-text">Enter a Pokémon name</div>
                <div className="input-wrapper" style={{ position: 'relative' }}>
                    <input
                        ref={inputRef}
                        type="text"
                        className="search-bar"
                        placeholder={!searchInput ? 'Search' : ''}
                        value={searchInput}
                        onChange={handleChange}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        onKeyDown={handleKeyDown}
                        aria-label="Search Pokémon name"
                    />

                    {showSuggestions && suggestions.length > 0 && (
                        <ul
                            ref={suggestionsRef}
                            className="suggestions-list"
                        >
                            {suggestions.map((suggestion, index) => (
                                <li
                                    key={suggestion}
                                    className={highlightIndex === index ? 'highlight' : ''}
                                    onMouseDown={() => handleSuggestionClick(suggestion)}
                                >
                                    {suggestion}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
                <button className="send-button" onClick={handleSubmit}>
                    Send
                </button>
            </div>
        </div>
    );
}

export default Calculator;
