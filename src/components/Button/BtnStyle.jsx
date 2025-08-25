import "./css/BtnStyle.css";

export function TooltipBtn(props) {
  const { title, content, icon, icon_title, action } = props;
  let iconCpn = <></>;
  if (icon) {
    iconCpn = <img src={icon} alt={icon_title} />;
  }
  return (
    <button className={"tooltip-btn"} onClick={action}>
      <div className={"btn-icon"}>{iconCpn}</div>
      <div className={"btn-mo-ta"}>
        <span>{title}</span>
        <span>{content}</span>
      </div>
    </button>
  );
}

export function IconBtn({ children, btnIcon, action }) {
  return (
    <>
      <div className={"btn-icon-1"} onClick={action}>
        <img src={btnIcon} alt="" />
        {children}
      </div>
    </>
  );
}

export function TextBtn({ children, onClick, stylesPlus}) {
  return (
    <button onClick={onClick} className={"only-text-btn " + stylesPlus}>
      {children}
    </button>
  );
}

export function ConfirmCancelButtons({
  onCancel,
  onConfirm,
  confirmText = "Xác Nhận",
  cancelText = "Hủy bỏ",
}) {
  return (
    <div className={"ConfirmCancelButtons_box"}>
      <TextBtn onClick={onCancel}>{cancelText}</TextBtn>
      <TextBtn onClick={onConfirm}>{confirmText}</TextBtn>
    </div>
  );
}
