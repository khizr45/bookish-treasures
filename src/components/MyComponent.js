import React, { useState } from 'react';

function MyComponent() {
  const [elements, setElements] = useState([]);

  const addElement = () => {
    // Create the JSX element you want to add
    const newElement = <p key={elements.length}>New JSX Element</p>;

    // Add the new element to the array of elements
    setElements([...elements, newElement]);
  };

  const deleteElement = (index) => {
    // Remove the element at the specified index from the array
    const updatedElements = elements.filter((_, i) => i !== index);
    setElements(updatedElements);
  };

  return (
    <div>
      <button onClick={addElement}>Add JSX</button>
      {elements.map((element, index) => (
        <div key={index}>
          {element}
          <button onClick={() => deleteElement(index)}>Delete</button>
        </div>
      ))}
    </div>
  );
}

export default MyComponent;
