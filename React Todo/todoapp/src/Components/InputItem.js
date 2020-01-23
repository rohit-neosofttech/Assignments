import React from "react";

export default ({
  title,
  add,
  onTitleChange
}) => {
  return (
    <div className="center">
      <input
        type="text"
        placeholder="title"
        className="input"
        value={title}
        onChange={e => onTitleChange(e.target.value)}
      />
        <button
          className="modalbutton"
          onClick={() => add()}
          disabled={!title}
        >
          Add
        </button>

    </div>
  );
};
