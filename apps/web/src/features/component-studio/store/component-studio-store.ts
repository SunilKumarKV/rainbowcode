"use client";

import { create } from "zustand";
import { defaultButtonDefinition } from "@/features/component-studio/registry/button-definition";
import type {
  ButtonDefinition,
  ComponentType,
} from "@/features/component-studio/types/component-definition";

type ComponentStudioState = {
  readonly selectedComponent: ComponentType;
  readonly buttonDefinition: ButtonDefinition;
  readonly setSelectedComponent: (component: ComponentType) => void;
  readonly updateButton: (definition: Partial<ButtonDefinition>) => void;
  readonly resetButton: () => void;
};

export const useComponentStudioStore = create<ComponentStudioState>((set) => ({
  selectedComponent: "button",
  buttonDefinition: defaultButtonDefinition,

  setSelectedComponent: (component) => {
    set({ selectedComponent: component });
  },

  updateButton: (definition) => {
    set((state) => ({
      buttonDefinition: {
        ...state.buttonDefinition,
        ...definition,
        type: "button",
      },
    }));
  },

  resetButton: () => {
    set({ buttonDefinition: defaultButtonDefinition });
  },
}));