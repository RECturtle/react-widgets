import React, { useState, useEffect } from "react";
import axios from "axios";

const Reps = () => {
    const [term, setTerm] = useState("27610");
    const [debouncedTerm, setDebouncedTerm] = useState(term);
    const [results, setResults] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        const timerId = setTimeout(() => {
            setDebouncedTerm(term);
        }, 750);

        return () => {
            clearTimeout(timerId);
        };
    }, [term]);

    useEffect(() => {
        const search = async () => {
            try {
                const { data } = await axios.get(
                    "https://www.googleapis.com/civicinfo/v2/representatives",
                    {
                        params: {
                            // this key is publically available, no cost/privileged access involved here
                            key: "AIzaSyClRzDqDh5MsXwnCWi0kOiiBivP6JsSyBw",
                            address: debouncedTerm,
                            includeOffices: true,
                            levels: "country",
                            roles: [
                                "legislatorUpperBody",
                                "legislatorLowerBody",
                            ],
                        },
                    }
                );
                setResults(data.officials);
                setErrorMessage("");
            } catch (e) {
                setErrorMessage("Invalid address or zipcode");
            }
        };
        search();
    }, [debouncedTerm]);

    const onClick = (event) => {
        if (event.metaKey || event.ctrlKey) {
            return;
        }
    };

    const Candidates = results.map((result) => {
        return (
            <div key={result.name} className="item">
                <div className="right floated content">
                    <a
                        target="_blank"
                        rel="noreferrer"
                        className="ui button"
                        href={result.urls[result.urls.length - 1]}
                        onClick={onClick}
                    >
                        Learn More
                    </a>
                </div>
                <div className="ui small header">{result.name}</div>
                <div className="content">
                    <p>
                        <strong>Party:</strong> {result.party}
                    </p>
                </div>
            </div>
        );
    });

    return (
        <div>
            <div className="ui form">
                <div className="field">
                    <label>
                        Enter your address or zipcode to view who represents you
                    </label>
                    <input
                        value={term}
                        onChange={(e) => setTerm(e.target.value)}
                        className="input"
                    />
                    {errorMessage && (
                        <div className="ui red message">{errorMessage}</div>
                    )}
                </div>
            </div>
            <div className="ui celled list">{Candidates}</div>
        </div>
    );
};

export default Reps;
