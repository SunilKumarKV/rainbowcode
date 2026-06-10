export type CanvasReadinessInput = {
  readonly nodesCount: number;
  readonly selectedCount: number;
  readonly zoomPercent: number;
  readonly snapToGridEnabled: boolean;
  readonly canUndo: boolean;
  readonly canRedo: boolean;
};

export type CanvasReadinessItem = {
  readonly label: string;
  readonly value: string;
};

export function getCanvasReadinessItems(
  input: CanvasReadinessInput,
): readonly CanvasReadinessItem[] {
  return [
    {
      label: "Nodes",
      value: String(input.nodesCount),
    },
    {
      label: "Selected",
      value: String(input.selectedCount),
    },
    {
      label: "Zoom",
      value: `${input.zoomPercent}%`,
    },
    {
      label: "Snap",
      value: input.snapToGridEnabled ? "On" : "Off",
    },
    {
      label: "Undo",
      value: input.canUndo ? "Ready" : "Empty",
    },
    {
      label: "Redo",
      value: input.canRedo ? "Ready" : "Empty",
    },
  ];
}