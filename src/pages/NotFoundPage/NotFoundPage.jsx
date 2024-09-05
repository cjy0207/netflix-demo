import React from 'react'
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const NotFoundPage = () => {
  const navigate = useNavigate()
  const gotoHome = () =>{
    navigate("/")
  }
  return (
    <div>
      <h1>404</h1>
      <h2>Page Not Found</h2>
      <Button onClick={gotoHome}>back to MainPage</Button>
    </div>
  )
}

export default NotFoundPage;