import React from "react";

const meta = {
  title: "Home",
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;

export const Overview = {
  name: "Welcome",
  render: () => (
    <div className="min-h-screen bg-slate-900 text-slate-50 px-8 py-16">
      <div className="max-w-3xl space-y-6">
        <p className="text-sm uppercase tracking-[0.3em] text-emerald-300">
          MealMatch Design System
        </p>
        <h1 className="text-4xl font-semibold">Welcome to Storybook</h1>
        <p className="text-lg text-slate-200">
          Use the sidebar to browse component stories. Each component exposes controls for props.
        </p>
        <p className="text-slate-400">
          Need another component documented? Add a `*.stories.jsx` file under `src/app/_components`.
        </p>
      </div>
    </div>
  ),
};
