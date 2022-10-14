import { OverlayScrollbarsComponent as OverlayScrollbarsComponentUI } from "overlayscrollbars-react";
import React from "react";
import "./MyScrollbar.css";

type MyScrollbarProps = React.HTMLProps<HTMLDivElement>;

const MyScrollbar = React.forwardRef<HTMLDivElement, MyScrollbarProps>(
  ({ children, height }, ref) => {
    const isNotDesktop: boolean = document.body.clientWidth < 1200;
    const contentMaxHeight = !isNotDesktop ? height : "auto";

    const OverlayScrollbarsComponent: any = OverlayScrollbarsComponentUI;

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
  }
);

export default MyScrollbar;
