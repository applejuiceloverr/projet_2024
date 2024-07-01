import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CourseForm = () => {
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    video: null,
    category: '',
    difficulty: '',
    pdf: null,
    image: null,
    quizFile: null, // Add field for the Excel file
  });
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch categories from the backend
    axios.get('http://127.0.0.1:8000/courses/categories/')
      .then(response => {
        setCategories(response.data);
      })
      .catch(error => {
        console.error('Error fetching categories:', error);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData({
        ...formData,
        [name]: files[0],
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userData = JSON.parse(localStorage.getItem('user'));
    if (!userData || !userData.user || !userData.user.id) {
      console.error('User is not authenticated or user data is missing.');
      return;
    }

    const data = new FormData();
    for (const key in formData) {
      data.append(key, formData[key]);
    }
    data.append('created_by', userData.user.id);

    try {
      const response = await axios.post('http://127.0.0.1:8000/courses/courses/', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${userData.access_token}`
        },
      });
      console.log('Course created:', response.data);
      navigate('/teacher');
    } catch (error) {
      console.error('Error creating course:', error.response?.data || error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} encType="multipart/form-data">
      <label htmlFor="title" className="block font-medium text-gray-700 mb-2">
        Title:
      </label>
      <input
        type="text"
        id="title"
        name="title"
        value={formData.title}
        onChange={handleChange}
        className="border border-gray-300 rounded-md p-2 w-full mb-4"
        required
      />

      <label htmlFor="description" className="block font-medium text-gray-700 mb-2">
        Description:
      </label>
      <input
        type="text"
        id="description"
        name="description"
        value={formData.description}
        onChange={handleChange}
        className="border border-gray-300 rounded-md p-2 w-full mb-4"
        required
      />

      <label htmlFor="video" className="block font-medium text-gray-700 mb-2">
        Video:
      </label>
      <input
        type="file"
        id="video"
        name="video"
        accept="video/*"
        onChange={handleChange}
        className="border border-gray-300 rounded-md p-2 w-full mb-4"
      />

      <label htmlFor="category" className="block font-medium text-gray-700 mb-2">
        Category:
      </label>
      <select
        id="category"
        name="category"
        value={formData.category}
        onChange={handleChange}
        className="border border-gray-300 rounded-md p-2 w-full mb-4"
        required
      >
        <option value="">Select a category</option>
        {categories.map(category => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </select>

      <label htmlFor="difficulty" className="block font-medium text-gray-700 mb-2">
        Difficulty:
      </label>
      <select
        id="difficulty"
        name="difficulty"
        value={formData.difficulty}
        onChange={handleChange}
        className="border border-gray-300 rounded-md p-2 w-full mb-4"
        required
      >
        <option value="">Select difficulty</option>
        <option value="beginner">Beginner</option>
        <option value="intermediate">Intermediate</option>
        <option value="advanced">Advanced</option>
      </select>

      <label htmlFor="pdf" className="block font-medium text-gray-700 mb-2">
        PDF Document:
      </label>
      <input
        type="file"
        id="pdf"
        name="pdf"
        accept=".pdf"
        onChange={handleChange}
        className="border border-gray-300 rounded-md p-2 w-full mb-4"
      />

      <label htmlFor="image" className="block font-medium text-gray-700 mb-2">
        Image:
      </label>
      <input
        type="file"
        id="image"
        name="image"
        accept="image/*"
        onChange={handleChange}
        className="border border-gray-300 rounded-md p-2 w-full mb-4"
      />

      <label htmlFor="quizFile" className="block font-medium text-gray-700 mb-2">
        Quiz File (Excel):
      </label>
      <input
        type="file"
        id="quizFile"
        name="quizFile"
        accept=".xlsx, .xls"
        onChange={handleChange}
        className="border border-gray-300 rounded-md p-2 w-full mb-4"
      />

      <input
        type="submit"
        value="Add"
        className="bg-[#00df9a] text-white font-medium py-2 px-4 rounded-md cursor-pointer hover:bg-green-600 transition duration-300"
      />
    </form>
  );
};

export default CourseForm;
