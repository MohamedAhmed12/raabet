import { useEffect } from "react";

export const useIframeClickTracker = (
  handleBlockClick: (id: string) => void
) => {
  useEffect(() => {
    const onBlur = () => {
      const active = document.activeElement;
      if (active && active.tagName === "IFRAME") {
        const id = active.getAttribute("data-block-id");
        if (id) {
          handleBlockClick(id);
          setTimeout(() => window.focus(), 0); // re-focus parent to detect next click
        }
      }
    };
    window.addEventListener("blur", onBlur);

    return () => window.removeEventListener("blur", onBlur);
  }, [handleBlockClick]);
};
