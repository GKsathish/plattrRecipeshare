// import { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useParams } from 'react-router-dom';

// const RecipeDetail = () => {
//   const [recipe, setRecipe] = useState(null);
//   const { id } = useParams();

//   useEffect(() => {
//     const fetchRecipe = async () => {
//       const { data } = await axios.get(`http://localhost:5000/api/recipes/${id}`);
//       setRecipe(data);
//     };
//     fetchRecipe();
//   }, [id]);

//   return (
//     <div className='conatainer shadow'>
//       {recipe && (
//         <>
//           <h2>{recipe.title}</h2>
//           <h4>Ingredients</h4>
//           <ul>
//             {recipe.ingredients.map((ingredient, index) => (
//               <li key={index}>{ingredient}</li>
//             ))}
//           </ul>
//           <h4>Instructions</h4>
//           <p>{recipe.instructions}</p>
//         </>
//       )}
//     </div>
//   );
// };

// export default RecipeDetail;


import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const RecipeDetail = () => {
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();
  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        setLoading(true); // Start loading
        const { data } = await axios.get('http://localhost:5000/api/recipes'); // Fetch all recipes
        // Filter the recipe based on the id
        const foundRecipe = data.find((recipe) => recipe._id === parseInt(id)); 
        console.log(foundRecipe);
        setRecipe(foundRecipe); // Set the filtered recipe
        setLoading(false); // Stop loading
      } catch (err) {
        setError('Failed to fetch recipe details');
        setLoading(false); // Stop loading
      }
    };

    fetchRecipes();
  }, [id]); // Re-run when `id` changes


  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }
console.log(recipe)
  return (
    <div className='container shadow mt-4 p-5'>
      {recipe && (
        <>
          <h2>{recipe.title}</h2>
          <h4>Ingredients</h4>
          <ul>
            {recipe.ingredients.map((ingredient, index) => (
              <li key={index}>{ingredient}</li>
            ))}
          </ul>
          <h4>Instructions</h4>
          <p>{recipe.instructions}</p>
          <h4>Category</h4>
          <p>{recipe.category}</p>
          <h4>Cooking Time</h4>
          <p>{recipe.cookingTime} minutes</p>
        </>
      )}
    </div>
  );
};

export default RecipeDetail;
