import React, { useState, useEffect } from "react";

const App = () => {
  const [films, setFilms] = useState([]);
  ;
  const [loadFilms, setLoadFilms] = useState();
  const [people, setPeople] = useState([]);
  ;
  const [loadPeople, setLoadPeople] = useState();

    useEffect(() => {
      if (loadFilms) {
        fetch("http://ghibliapi.herokuapp.com/films")
        .then(res => res.json())
        .then(films => setFilms(films))
        .catch(err => console.log(err));
      }
    }, [loadFilms]);

    useEffect(() => {
      if (loadPeople) {
      fetch("http://ghibliapi.herokuapp.com/people")
      .then(res => res.json())
      .then(people => setPeople(people))
      .catch(err => console.log(err));
    }
  }, [loadPeople]);

  const handleLoadFilms = () => {
      setLoadFilms(true);
      setLoadPeople(false);
  }
      const handleLoadPeople = () => {
        setLoadPeople(true);
        setLoadFilms(false);
      }
  
  if (loadFilms) {
    return (
      <div className="container">
      {films.map(film => (
        <div class="card" >
        <div class="card-body">
          <h5 class="card-title">{film.title}</h5>
          <h6 class="card-subtitle mb-2 text-muted">{film.original_title}</h6>
          <p class="card-text">{film.description}</p>
          <img src={film.movie_banner} alt="image" class="card-img-top" />
          <a href={film.url} className="card-link">See Raw Data</a>
        </div>
      </div>
      ))}
     </div>

    )
}   else if(loadPeople) {
  return (
    <div className="container">
    <h1>Ghibli API</h1>
    <button className="btn-btn-dark" onClick={handleLoadFilms}>Load Films</button>
    <button className="btn-btn-dark" onClick={handleLoadPeople}>Load People</button>
    <h2>Characters of Ghib</h2>
    {people.map(person => (
        <div class="card" >
        <div class="card-body">
          <h5 class="card-title">{person.name}</h5>
          <h6 class="card-subtitle mb-2 text-muted">{person.gender}</h6>
          <p class="card-text">{person.age}</p>
          {/* <img src={person.movie_banner} alt="image" class="card-img-top" /> */}
          <a href={person.url} className="card-link">See Raw Data</a>
        </div>
      </div>
      ))}
    </div>
    
  )
}
  
  else {
    return (
      <div className="container">
      <h1>Ghibli API</h1>
      <button className="btn-btn-dark" onClick={handleLoadFilms}>Load Films</button>
      <button className="btn-btn-dark" onClick={handleLoadPeople}>Load People</button>
      </div>
    );
  }
}

export default App;