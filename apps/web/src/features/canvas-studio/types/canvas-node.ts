export type CanvasNodeType = "rectangle" | "text" | "group";

export type BaseCanvasNode = {
  readonly id: string;
  readonly type: CanvasNodeType;
  readonly x: number;
  readonly y: number;
  readonly width: number;
  readonly height: number;
};

export type RectangleCanvasNode = BaseCanvasNode & {
  readonly type: "rectangle";
  readonly fill: string;
  readonly radius: number;
};

export type TextCanvasNode = BaseCanvasNode & {
  readonly type: "text";
  readonly text: string;
  readonly fontSize: number;
  readonly fill: string;
};

export type GroupCanvasNode = BaseCanvasNode & {
  readonly type: "group";
  readonly childNodeIds: readonly string[];
};

export type CanvasNode = RectangleCanvasNode | TextCanvasNode | GroupCanvasNode;