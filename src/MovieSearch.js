import {useState, useEffect} from 'react';
import MovieBg from './movie_bg.jpg'
// import 'bootstrap/dist/css/bootstrap.min.css';
// import {Button,Form,Row,Col,InputGroup, FormControl} from 'react-bootstrap';

function MovieSearch() {

    const [movieInfo, setMovieInfo] = useState(null);
    const [movieTitle, setMovieTitle] = useState('Shershaah');

    useEffect(() => {
        getMovieInfo();
    }, [])

    function readTitle(value) {
        setMovieTitle(value);
    }

    function getMovieInfo() {
      
        let apiKey = '590d02ae';
        let url = `https://omdbapi.com?t=${movieTitle}&apikey=${apiKey}`;

        fetch( url )
        .then( (response)=>response.json() )
        .then( (movie) => {
            console.log(movie);
            setMovieInfo(movie);
        } )
        .catch((err)=>{
            console.log(err);
        })

    }

    return(
        <div className="movie-search" style={{ backgroundImage:`url(${MovieBg})` }}>
            <div className="container">
                <div className="form-details">   
                    <h1>Movie Search</h1>
                    <div className="form-groups">
                        <input type="text" placeholder="Search Movie Here..." onChange={(event)=>readTitle(event.target.value)} />
                        <button onClick={getMovieInfo}>Search</button>
                    </div>
                </div>
                <div className="movie-data">
                    <div className="movie-poster">
                        <img src={movieInfo?.Poster} alt="" />
                    </div>
                    <div className="movie-info">
                        <p><strong>Title:</strong> {movieInfo?.Title}</p>
                        <p><strong>Year:</strong> {movieInfo?.Year}</p>
                        <p><strong>Released:</strong> {movieInfo?.Released}</p>
                        <p><strong>Director:</strong> {movieInfo?.Director}</p>
                        <p><strong>Genre:</strong> {movieInfo?.Genre}</p>
                        <p><strong>Country:</strong> {movieInfo?.Country}</p>
                        <p><strong>Language:</strong> {movieInfo?.Language}</p>
                        <p><strong>Awards:</strong> {movieInfo?.Awards}</p>
                        <div className="ratings">
                            {
                                movieInfo?.Ratings.map( ( rating, index ) => (
                                    <div key={index} className="ratings-item">
                                        <p><strong>{rating.Source}:</strong> <span>{rating.Value}</span></p>
                                    </div>
                                ) )
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default MovieSearch;