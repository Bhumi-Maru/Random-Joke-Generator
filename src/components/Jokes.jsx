import React, { useState } from "react";
import "./Jokes.css"; // External CSS file

export default function Jokes() {
  const [joke, setJoke] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  const fetchJoke = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        "https://official-joke-api.appspot.com/jokes/random"
      );
      const data = await response.json();
      setJoke(data);
    } catch (error) {
      console.error("Error fetching joke:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h1 className="heading">Random Joke Generator</h1>
      {loading ? (
        <h4>Loading...</h4>
      ) : (
        <div className="card">
          {joke ? (
            <>
              <p className="jokeText">{joke.setup}</p>
              <p className="punchline">{joke.punchline}</p>
            </>
          ) : (
            <p>Click the button to get a joke!</p>
          )}
        </div>
      )}
      <button
        className={`button ${isHovering ? "hover" : ""}`}
        onClick={fetchJoke}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        disabled={loading}
      >
        {loading ? "Loading..." : "Get New Joke"}
      </button>
    </div>
  );
}
