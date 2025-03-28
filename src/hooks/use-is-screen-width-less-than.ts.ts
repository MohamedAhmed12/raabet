import * as React from "react";

export function useIsScreenWidthLessThan(width: number) {
  const [iswidth, setIswidth] = React.useState<boolean | undefined>(undefined);

  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${width - 1}px)`);
    const onChange = () => {
      setIswidth(window.innerWidth < width);
    };
    mql.addEventListener("change", onChange);
    setIswidth(window.innerWidth < width);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  return !!iswidth;
}
