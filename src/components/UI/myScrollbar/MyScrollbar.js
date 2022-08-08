import { OverlayScrollbarsComponent } from "overlayscrollbars-react";
import "./MyScrollbar.css";

const MyScrollbar = ({ children, height }) => {
  const isNotDesktop = document.body.clientWidth < 1200;
  const contentMaxHeight = !isNotDesktop ? height : "auto";

  return (
    <OverlayScrollbarsComponent
      options={{
        scrollbars: { autoHide: "never" },
        className: "os-theme-light os-theme-light-edgy limited-handles",
      }}
      style={{ maxHeight: contentMaxHeight }}
    >
      {children}
    </OverlayScrollbarsComponent>
  );
};

export default MyScrollbar;
