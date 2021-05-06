import React, { useEffect, useRef } from "react";

const AutoHeightTextarea = ({
  defaultValue,
  content,
  setContent,

  ...etc
}) => {
  const textareaRef = useRef(null);

  useEffect(() => {
    textareaRef.current.style.height = "0px";
    const scrollHeight =
      textareaRef.current.scrollHeight > "300"
        ? "300"
        : textareaRef.current.scrollHeight;
    textareaRef.current.style.height = scrollHeight + "px";
  }, [content]);

  return (
    <textarea
      ref={textareaRef}
      {...etc}
      defaultValue={defaultValue}
      onChange={(e) => setContent(e.target.value)}
    ></textarea>
  );
};

export default AutoHeightTextarea;
