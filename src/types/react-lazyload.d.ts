declare module "react-lazyload" {
  import * as React from "react";

  export interface LazyLoadProps {
    height?: number | string;
    offset?: number | number[];
    once?: boolean;
    overflow?: boolean;
    resize?: boolean;
    scroll?: boolean;
    children?: React.ReactNode;
    debounce?: boolean | number;
    throttle?: number;
    placeholder?: React.ReactNode;
    unmountIfInvisible?: boolean;
    scrollContainer?: string | HTMLElement;
    scrollPosition?: { x: number; y: number };
    experimentalLazyParent?: boolean;
  }

  export default class LazyLoad extends React.Component<LazyLoadProps> {}
}
