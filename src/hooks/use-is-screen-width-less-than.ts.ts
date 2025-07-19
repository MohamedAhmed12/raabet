import * as React from "react";

export function useIsScreenWidthLessThan(width: number, defaultValue: boolean) {
  const [isWidth, setIsWidth] = React.useState<boolean>(defaultValue);

  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${width - 1}px)`);
    const onChange = () => {
      setIsWidth(window.innerWidth < width);
    };

    mql.addEventListener("change", onChange);
    setIsWidth(window.innerWidth < width);

    return () => mql.removeEventListener("change", onChange);
  }, [width]);

  return isWidth;
}
