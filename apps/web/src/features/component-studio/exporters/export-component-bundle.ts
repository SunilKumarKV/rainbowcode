import { exportBadgeComponent } from "@/features/component-studio/exporters/export-badge-component";
import { exportButtonComponent } from "@/features/component-studio/exporters/export-button-component";
import { exportCardComponent } from "@/features/component-studio/exporters/export-card-component";
import { exportComponentIndex } from "@/features/component-studio/exporters/export-component-index";
import { exportInputComponent } from "@/features/component-studio/exporters/export-input-component";
import type {
  BadgeDefinition,
  ButtonDefinition,
  CardDefinition,
  InputDefinition,
} from "@/features/component-studio/types/component-definition";

export type ComponentBundleFile = {
  readonly filename: string;
  readonly content: string;
  readonly mimeType: string;
};

type ComponentBundleInput = {
  readonly buttonDefinition: ButtonDefinition;
  readonly cardDefinition: CardDefinition;
  readonly inputDefinition: InputDefinition;
  readonly badgeDefinition: BadgeDefinition;
};

export function exportComponentBundle({
  buttonDefinition,
  cardDefinition,
  inputDefinition,
  badgeDefinition,
}: ComponentBundleInput): readonly ComponentBundleFile[] {
  return [
    {
      filename: "rainbow-button.tsx",
      content: exportButtonComponent(buttonDefinition),
      mimeType: "text/typescript",
    },
    {
      filename: "rainbow-card.tsx",
      content: exportCardComponent(cardDefinition),
      mimeType: "text/typescript",
    },
    {
      filename: "rainbow-input.tsx",
      content: exportInputComponent(inputDefinition),
      mimeType: "text/typescript",
    },
    {
      filename: "rainbow-badge.tsx",
      content: exportBadgeComponent(badgeDefinition),
      mimeType: "text/typescript",
    },
    {
      filename: "index.ts",
      content: exportComponentIndex(),
      mimeType: "text/typescript",
    },
  ];
}