import "./css/CancelConfirmBox.css";
import { ConfirmCancelButtons } from "./../Button/BtnStyle.jsx";

export function Style1CancelConfirmBox({ batCuaSo, onConfirm }) {
  return (
    <div className="CancelConfirmBox">
      <ConfirmCancelButtons
        onCancel={() => batCuaSo(false)}
        onConfirm={onConfirm}
      ></ConfirmCancelButtons>
    </div>
  );
}
