/* eslint-disable react/prop-types */
// CarCard.jsx

import axios from "axios";

export const CarCard = ({car, onDelete}) => {
  console.log(car.model);

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:4000/cars/cars/${car.id}`);
      onDelete(car.id);
    } catch (error) {
      console.error("Error deleting car", error);
    }
  };

  return (
    <div className="car-card bg-white shadow-md rounded-md p-4 mb-4 w-full sm:w-1/2 md:w-1/4 lg:w-1/4 xl:w-1/4">
      <img
        src={`http://localhost:4000/images/${car.image}`}
        alt={car.name}
        className="car-image w-full h-40 object-cover rounded-md mb-4"
      />
      <div className="car-details">
        <h2 className="text-xl font-semibold mb-2">{name}</h2>
        <p className="text-gray-600">Model: {car.model}</p>
        <p className="text-gray-600">Transmissions: {car.transmissions}</p>
        <p className="text-gray-600">Year: {car.year}</p>
      </div>
      <div className="flex justify-end mt-4">
        <button className="mr-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300">
          Edit
        </button>
        <button
          onClick={handleDelete}
          className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring focus:border-red-300">
          Delete
        </button>
      </div>
    </div>
  );
};
