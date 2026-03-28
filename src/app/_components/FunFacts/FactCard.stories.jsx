import FactCard from "./FactCard.jsx";

const meta = {
  title: "Components/FactCard",
  component: FactCard,
  parameters: {
    layout: "centered",
    backgrounds: {
      default: "light",
      values: [
        { name: "light", value: "#f4f7fb" },
        { name: "dark", value: "#0f172a" },
      ],
    },
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["sunrise", "meadow", "aurora", "dusk"],
    },
  },
};

export default meta;

const Template = (args) => (
  <div style={{ width: "340px" }}>
    <FactCard {...args} />
  </div>
);

export const Sunrise = {
  render: Template,
  args: {
    icon: "🤔",
    text: "Nobody’s born knowing how to cook: we all started by burning something.",
    variant: "sunrise",
  },
};

export const Meadow = {
  render: Template,
  args: {
    icon: "😅",
    text: "You don’t need fancy gear. A pan, a pot, and a spoon can do wonders.",
    variant: "meadow",
  },
};

export const Aurora = {
  render: Template,
  args: {
    icon: "✨",
    text: "The first time you nail a recipe, it feels like magic; and it kind of is.",
    variant: "aurora",
  },
};

export const Dusk = {
  render: Template,
  args: {
    icon: "🥡",
    text: "Cook a little extra: future you will thank you when you’re hungry tomorrow.",
    variant: "dusk",
  },
};
