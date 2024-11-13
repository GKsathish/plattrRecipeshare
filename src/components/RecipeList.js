 import { useState, useEffect } from 'react';
import axios from 'axios';

const RecipeList = () => {
  const [recipes, setRecipes] = useState([]);
  const [filter, setFilter] = useState({ category: '', ingredient: '' });
  const [loading, setLoading] = useState(false); // State to handle loading
  const [error, setError] = useState(null); // State to handle errors

  useEffect(() => {
    const fetchRecipes = async () => {
      setLoading(true); // Set loading state to true before fetching
      setError(null); // Reset any previous errors

      try {
        const { data } = await axios.get('http://localhost:5000/api/recipes', { params: filter });
        setRecipes(data); // Set recipes data from API
      } catch (err) {
        setError('Failed to fetch recipes. Please try again later.'); // Handle error
      } finally {
        setLoading(false); // Set loading state to false once data is fetched or error occurs
      }
    };

    fetchRecipes();
  }, [filter]); // Effect depends on filter changes

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Recipe List</h2>

      {/* Search and Category Filters */}
      <div className="row mb-4">
        <div className="col-md m-2">
          <input
            type="text"
            className="form-control"
            placeholder="Search by ingredient"
            onChange={(e) => setFilter({ ...filter, ingredient: e.target.value })}
          />
        </div>
        <div className="col-md m-2">
          <select
            className="form-select"
            onChange={(e) => setFilter({ ...filter, category: e.target.value })}
          >
            <option value="">Select Category</option>
            <option value="Breakfast">Breakfast</option>
            <option value="Lunch">Lunch</option>
            <option value="Dinner">Dinner</option>
            <option value="Dessert">Dessert</option>
          </select>
        </div>
      </div>

      {/* Loading State */}
      {loading && <div className="text-center">Loading recipes...</div>}

      {/* Error State */}
      {error && <div className="alert alert-danger">{error}</div>}

      {/* Recipe List */}
      {!loading && !error && (
        <ul className="list-group shadow">
          {recipes.length > 0 ? (
            recipes.map((recipe) => (
              <li key={recipe._id} className="list-group-item">
                <a href={`/recipe/${recipe._id}`} className="text-decoration-none">
                  <h5>{recipe.title}</h5>
                  <p>
                    <strong>Category:</strong> {recipe.category} | <strong>Cooking Time:</strong> {recipe.cookingTime} mins
                  </p>
                </a>
              </li>
            ))
          ) : (
            <div className="text-center">No recipes found.</div>
          )}
        </ul>
      )}
    </div>
  );
};

export default RecipeList;
