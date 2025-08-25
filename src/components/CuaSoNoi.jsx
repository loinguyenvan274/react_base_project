import { IconBtn } from "./Button/BtnStyle";
import './css/CuaSoNoi.css'

export function CuaSoNoi({ children , onEditBox}) {
  return (
    <div className="CuaSoNoi_man-nen-cua-so-noi">
      <div className="CuaSoNoi_form-chinh">
        {children}
        <div className="CuaSoNoi_nut-tat-form">
          <IconBtn btnIcon={'close.svg'} action={()=>onEditBox(false)}></IconBtn>
        </div>
      </div>
    </div>
  );
}
