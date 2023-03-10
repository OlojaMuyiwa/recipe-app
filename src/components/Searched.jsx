import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

const Searched = () => {
  const [searched, setSearched] = useState([]);
  let params = useParams();

  const getSearched = async (name) => {

    // let check = localStorage.getItem('cuisine');


    const data = await fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_API_KEY}&number=100&query=${name}`);
    const recipes = await data.json();

    console.log(recipes.results);
    setSearched(recipes.results);

    // localStorage.setItem('cuisine', JSON.stringify(recipes.results));
  }

  useEffect(() => {
    getSearched(params.search);
  }, [params.search])


  return (
    <Grid>
      {searched.map(item => {
        return (
          <Card key={item.id}>
            <img src={item.image} alt={item.title} />
            <h4>{item.title}</h4>
          </Card>
        )
      })}
    </Grid>
  )
}



const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 3rem;
`;
const Card = styled.div`
  img{
    width: 90%;
    border-radius: 2rem;
  }
  a {    
    text-decoration: none;
  }
  h4 {
    text-align: center;
    padding: 1rem;
  }
`;
export default Searched;
