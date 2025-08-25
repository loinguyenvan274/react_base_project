import { useEffect, useRef } from "react";
import "./css/InputBox.css";
export function InputBoxHasTitle({
  title,
  inputType,
  moTa,
  insertData,
  inputName,
  initInput = '',
}) {
  const refInput = useRef(null);
  const handleChange = (e) => {
    insertData(e.target.name, e.target.value);
  };
  useEffect(() => {
    refInput.current.value = initInput;
  }, []);

  return (
    <div className="InputBoxHasTitle_box">
      <div className="InputBoxHasTitle_title">{title}</div>
      <input
        ref={refInput}
        type={inputType}
        name={inputName}
        onChange={handleChange}
      />
      <div>{moTa}</div>
    </div>
  );
}
export function SelectBox({ children, title, moTa }) {
  return (
    <div className="InputBoxHasTitle_box">
      <div className="InputBoxHasTitle_title">{title}</div>
      <select>{children}</select>
      <div>{moTa}</div>
    </div>
  );
}
