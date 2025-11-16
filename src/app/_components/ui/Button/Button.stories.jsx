import React from "react";
import Button from "./index.jsx";

const meta = {
  title: "Components/Button",
  component: Button,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["hero", "primary", "secondary", "subtle", "text"],
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg", "none"],
    },
    block: {
      control: "boolean",
    },
    disabled: {
      control: "boolean",
    },
    onClick: { action: "clicked" },
  },
};

export default meta;

const Template = (args) => (
  <div style={{ width: args.block ? "320px" : "auto" }}>
    <Button {...args}>{args.children}</Button>
  </div>
);

export const Primary = {
  render: Template,
  args: {
    children: "Find recipes",
    variant: "primary",
    size: "lg",
    block: true,
    disabled: false,
  },
};

export const Secondary = {
  render: Template,
  args: {
    children: "Clear results",
    variant: "secondary",
    size: "lg",
    block: false,
    disabled: false,
  },
};

export const SubtleClose = {
  render: Template,
  args: {
    children: "Close",
    variant: "subtle",
    size: "sm",
    block: false,
    disabled: false,
  },
};

export const TextLink = {
  render: Template,
  args: {
    children: "View details",
    variant: "text",
    size: "none",
    block: false,
    disabled: false,
  },
};

export const Hero = {
  args: {
    children: (
      <>
        Start searching
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
          <path
            d="M5 12h14M13 5l7 7-7 7"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </>
    ),
    variant: "hero",
    size: "lg",
    block: false,
    disabled: false,
  },
  render: (args) => (
    <Button {...args} />
  ),
};

export const BlockPrimary = {
  render: Template,
  args: {
    children: "Block CTA",
    variant: "primary",
    size: "lg",
    block: true,
    disabled: false,
  },
};
