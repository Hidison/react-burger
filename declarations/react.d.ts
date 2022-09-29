import { AriaAttributes, DOMAttributes } from "react";
import { TItem } from "../src/types";

declare module "react" {
  interface HTMLAttributes<T> extends AriaAttributes, DOMAttributes<T> {
    text?: string;
    card?: TItem;
    to?: string;
  }
}
