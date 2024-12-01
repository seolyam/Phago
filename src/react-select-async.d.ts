// react-select-async.d.ts

declare module "react-select/async" {
  import { AsyncProps } from "react-select";
  import { Component } from "react";

  export default class AsyncSelect<
    Option = unknown,
    IsMulti extends boolean = false,
    Group extends GroupBase<Option> = GroupBase<Option>
  > extends Component<AsyncProps<Option, IsMulti, Group>> {}
}
