import React from "react";
import { Input } from "antd";
const SearchFor = Input.Search;

export default function Search(props) {
  return (
    <SearchFor
      onChange={props.onChange}
      enterButton="Search"
      style={{ width: 250 }}
    />
  );
}
