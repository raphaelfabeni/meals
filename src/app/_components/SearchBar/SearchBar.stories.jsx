import React from "react";
import SearchBar from "./index.jsx"; // adjust path if needed

export default {
  title: "Components/SearchBar",
  component: SearchBar,
  parameters: {
    layout: "centered",
  },
};

export const Default = {
  args: {
    onSearch: (q) => alert(`Searching for: ${q}`),
  },
  render: (args) => (
    <div style={{ width: "420px", padding: "20px", background: "#f9fafb" }}>
      <SearchBar {...args} />
    </div>
  ),
};