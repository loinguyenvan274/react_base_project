import "./tooltip.css";
import { useRef, useLayoutEffect } from "react";

export function OneStyleTooltip({ children, action }) {
  const tooltipRef = useRef();

  useLayoutEffect(() => {
    const tooltipEl = tooltipRef.current;
    if (!tooltipEl) return;

    const tooltipRect = tooltipEl.getBoundingClientRect();
    const willOverflowRight = tooltipRect.right > window.innerWidth;
    const willOverflowLeft = tooltipRect.left < 0;
    const willOverflowBottom = tooltipRect.bottom > window.innerHeight;
    const willOverflowTop = tooltipRect.top < 0;

    if (willOverflowRight) {
      tooltipEl.style.right = "100%";
      tooltipEl.style.left = "auto";
    } else if (willOverflowLeft) {
      tooltipEl.style.left = "100%";
      tooltipEl.style.right = "auto";
    }

    if (willOverflowBottom) {
      tooltipEl.style.top = "100%";
      tooltipEl.style.bottom = "auto";
    } else if (willOverflowTop) {
      tooltipEl.style.bottom = "100%";
      tooltipEl.style.top = "auto";
    }

    const handleClickOutside = (e) => {
      if (!e.target.closest(".btn-add-1-tooltip")) {
        action(false);
      }
    };

    document.addEventListener('click', handleClickOutside, true);
    return ()=>{removeEventListener('click',handleClickOutside,true)};
  }, []);

  return (
    <div className="btn-add-1-tooltip" ref={tooltipRef}>
      {children}
    </div>
  );
}
