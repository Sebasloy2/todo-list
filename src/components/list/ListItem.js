import React from 'react';

function ListItem(props) {
  const { description, completed, onCheck, onDelete } = props;

  return (
    <li>
      <input type="checkbox" checked={completed} onChange={onCheck} />
      <label>{description}</label>
      <button onClick={onDelete}>Delete</button>
    </li>
  );
}

export default ListItem;
