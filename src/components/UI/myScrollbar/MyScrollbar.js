import { OverlayScrollbarsComponent } from "overlayscrollbars-react";
import React from "react";
import "./MyScrollbar.css";

const MyScrollbar = React.forwardRef(({ children, height }, ref) => {
  const isNotDesktop = document.body.clientWidth < 1200;
  const contentMaxHeight = !isNotDesktop ? height : "auto";

  return (
    <div ref={ref}>
      <OverlayScrollbarsComponent
        options={{
          scrollbars: { autoHide: "never" },
          className: "os-theme-light os-theme-light-edgy limited-handles",
        }}
        style={{ maxHeight: contentMaxHeight }}
        ref={ref}
      >
        {children}
      </OverlayScrollbarsComponent>
    </div>
  );
});

export default MyScrollbar;
