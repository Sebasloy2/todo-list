import React from 'react';
import axios from 'axios';

const List = ({ list }) => {
  const handleDelete = () => {
    axios.delete(`/api/lists/${list._id}`)
      .then(() => {
        // Call a function to update the list of lists in the parent component
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleEdit = () => {
    // Call a function to open the list title editor in the parent component
  };

  return (
    <div className="list">
      <h3>{list.title}</h3>
      <p>{list.incompleteItems} items remaining</p>
      <button onClick={handleDelete}>Delete List</button>
      <button onClick={handleEdit}>Edit Title</button>
    </div>
  );
};

export default List;
