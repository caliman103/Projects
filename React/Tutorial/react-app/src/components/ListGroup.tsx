interface ListGroupProps {
  items: string[];
  heading: string;
  //(item : string) => void
  onSelectItem : (item : string) => void
}

import { useState } from "react";

function ListGroup({items, heading, onSelectItem}: ListGroupProps) {
  //Hook
  const [selectedIndex, setSelectedIndex] = useState(-1);

  return (
    <>
      <h1>{heading}</h1>
      <ul className="list-group">
        {items.length === 0 && <p>No item found</p> /* Rule = 1 and x = x */}
        {items.map((item, index) => (
          <li
            className={
              selectedIndex === index
                ? "list-group-item active"
                : "list-group-item"
            }
            onClick={() => {
              setSelectedIndex(index);
              onSelectItem(item)
            }}
            key={item}
          >
            {item}
          </li> //each item should have a key to uniquely identify them
        ))}
      </ul>
    </>
  );
}

export default ListGroup;
