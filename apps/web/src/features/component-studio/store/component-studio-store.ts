"use client";

import { create } from "zustand";
import { defaultButtonDefinition } from "@/features/component-studio/registry/button-definition";
import { defaultCardDefinition } from "@/features/component-studio/registry/card-definition";
import type {
  ButtonDefinition,
  CardDefinition,
  ComponentType,
} from "@/features/component-studio/types/component-definition";

type ComponentStudioState = {
  readonly selectedComponent: ComponentType;
  readonly buttonDefinition: ButtonDefinition;
  readonly cardDefinition: CardDefinition;
  readonly setSelectedComponent: (component: ComponentType) => void;
  readonly updateButton: (definition: Partial<ButtonDefinition>) => void;
  readonly updateCard: (definition: Partial<CardDefinition>) => void;
  readonly resetButton: () => void;
  readonly resetCard: () => void;
};

export const useComponentStudioStore = create<ComponentStudioState>((set) => ({
  selectedComponent: "button",
  buttonDefinition: defaultButtonDefinition,
  cardDefinition: defaultCardDefinition,

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

  updateCard: (definition) => {
    set((state) => ({
      cardDefinition: {
        ...state.cardDefinition,
        ...definition,
        type: "card",
      },
    }));
  },

  resetButton: () => {
    set({ buttonDefinition: defaultButtonDefinition });
  },

  resetCard: () => {
    set({ cardDefinition: defaultCardDefinition });
  },
}));