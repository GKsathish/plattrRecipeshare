// import { useState } from 'react';
// import axios from 'axios';

// const AddRecipe = () => {
//   const [formData, setFormData] = useState({
//     title: '',
//     ingredients: '',
//     instructions: '',
//     category: '',
//     cookingTime: '',
//   });

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.post('http://localhost:5000/api/recipes', formData);
//       alert('Recipe added successfully!');
//     } catch (err) {
//       alert('Failed to add recipe');
//     }
//   };

//   return (
//     <div className="container shadow mt-4 p-5">
//       <h2 className="text-center mb-4">Add a New Recipe</h2>
//       <form onSubmit={handleSubmit}>
//         {/* Title Input */}
//         <div className="mb-3">
//           <label htmlFor="title" className="form-label">Recipe Title</label>
//           <input
//             type="text"
//             id="title"
//             name="title"
//             className="form-control"
//             value={formData.title}
//             onChange={handleChange}
//             placeholder="Enter recipe title"
//             required
//           />
//         </div>

//         {/* Ingredients Input */}
//         <div className="mb-3">
//           <label htmlFor="ingredients" className="form-label">Ingredients</label>
//           <textarea
//             id="ingredients"
//             name="ingredients"
//             className="form-control"
//             value={formData.ingredients}
//             onChange={handleChange}
//             placeholder="Enter ingredients (comma-separated)"
//             rows="3"
//             required
//           />
//         </div>

//         {/* Instructions Input */}
//         <div className="mb-3">
//           <label htmlFor="instructions" className="form-label">Instructions</label>
//           <textarea
//             id="instructions"
//             name="instructions"
//             className="form-control"
//             value={formData.instructions}
//             onChange={handleChange}
//             placeholder="Enter cooking instructions"
//             rows="5"
//             required
//           />
//         </div>

//         {/* Category Input */}
//         <div className="mb-3">
//           <label htmlFor="category" className="form-label">Category</label>
//           <input
//             type="text"
//             id="category"
//             name="category"
//             className="form-control"
//             value={formData.category}
//             onChange={handleChange}
//             placeholder="Enter recipe category (e.g., Breakfast, Lunch)"
//             required
//           />
//         </div>

//         {/* Cooking Time Input */}
//         <div className="mb-3">
//           <label htmlFor="cookingTime" className="form-label">Cooking Time (minutes)</label>
//           <input
//             type="number"
//             id="cookingTime"
//             name="cookingTime"
//             className="form-control"
//             value={formData.cookingTime}
//             onChange={handleChange}
//             placeholder="Enter cooking time in minutes"
//             required
//           />
//         </div>

//         {/* Submit Button */}
//         <div className="d-flex justify-content-center">
//           <button type="submit" className="btn btn-primary">Add Recipe</button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default AddRecipe;


import { useState } from 'react';
import axios from 'axios';

const AddRecipe = () => {
  const [formData, setFormData] = useState({
    title: '',
    ingredients: '',
    instructions: '',
    category: '',
    cookingTime: '',
  });

  // Handle form input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Convert ingredients into an array by splitting the string at commas
    const ingredientsArray = formData.ingredients.split(',').map(ingredient => ingredient.trim());

    // Prepare the data to send in the POST request
    const recipeData = {
      ...formData,
      ingredients: ingredientsArray, // Update ingredients to be an array
    };

    try {
      // Send POST request to API
      await axios.post('http://localhost:5000/api/recipes', recipeData);
      alert('Recipe added successfully!');
      setFormData({ // Reset the form after successful submission
        title: '',
        ingredients: '',
        instructions: '',
        category: '',
        cookingTime: '',
      });
    } catch (err) {
      alert('Failed to add recipe');
    }
  };

  return (
    <div className="container shadow mt-4 p-5">
      <h2 className="text-center mb-4">Add a New Recipe</h2>
      <form onSubmit={handleSubmit}>
        {/* Title Input */}
        <div className="mb-3">
          <label htmlFor="title" className="form-label">Recipe Title</label>
          <input
            type="text"
            id="title"
            name="title"
            className="form-control"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter recipe title"
            required
          />
        </div>

        {/* Ingredients Input */}
        <div className="mb-3">
          <label htmlFor="ingredients" className="form-label">Ingredients (comma-separated)</label>
          <textarea
            id="ingredients"
            name="ingredients"
            className="form-control"
            value={formData.ingredients}
            onChange={handleChange}
            placeholder="Enter ingredients (comma-separated)"
            rows="3"
            required
          />
        </div>

        {/* Instructions Input */}
        <div className="mb-3">
          <label htmlFor="instructions" className="form-label">Instructions</label>
          <textarea
            id="instructions"
            name="instructions"
            className="form-control"
            value={formData.instructions}
            onChange={handleChange}
            placeholder="Enter cooking instructions"
            rows="5"
            required
          />
        </div>

        {/* Category Input */}
        <div className="mb-3">
          <label htmlFor="category" className="form-label">Category</label>
          <input
            type="text"
            id="category"
            name="category"
            className="form-control"
            value={formData.category}
            onChange={handleChange}
            placeholder="Enter recipe category (e.g., Breakfast, Lunch)"
            required
          />
        </div>

        {/* Cooking Time Input */}
        <div className="mb-3">
          <label htmlFor="cookingTime" className="form-label">Cooking Time (minutes)</label>
          <input
            type="number"
            id="cookingTime"
            name="cookingTime"
            className="form-control"
            value={formData.cookingTime}
            onChange={handleChange}
            placeholder="Enter cooking time in minutes"
            required
          />
        </div>

        {/* Submit Button */}
        <div className="d-flex justify-content-center">
          <button type="submit" className="btn btn-primary">Add Recipe</button>
        </div>
      </form>
    </div>
  );
};

export default AddRecipe;
