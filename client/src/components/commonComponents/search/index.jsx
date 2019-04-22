import React from "react";
import { Input } from "antd";
const SearchFor = Input.Search;

export default function Search(props) {
  return <SearchFor onChange={props.onChange} style={{ width: 250 }} />;
}
