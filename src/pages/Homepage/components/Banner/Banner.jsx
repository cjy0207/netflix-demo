import React from 'react'
import { usePopularMoviesQuery } from '../../../../hooks/usePopularMovies'
import Alert from 'react-bootstrap/Alert';
import "./Banner.style.css"

const Banner = () => {

    const {data, isLoading, isError, error} = usePopularMoviesQuery()
    console.log("dd", data)
    if(isLoading) {<h1>Loadind...</h1>}
    if(isError) {<Alert variant='danger'>{error.message}</Alert>}

  return (
    <div style={{
        backgroundImage:"url("+`https://media.themoviedb.org/t/p/w533_and_h300_bestv2${data?.results[8].poster_path}`+")"
    }}
    className='banner'
    >
    
    <div className='text-white banner-text-area'>
        <h1>{data?.results[1].title}</h1>
        <p>{data?.results[1].overview}</p>
    </div>

    </div>
  )
}

export default Banner