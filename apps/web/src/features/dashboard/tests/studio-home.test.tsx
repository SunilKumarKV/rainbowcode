import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { StudioHome } from "@/features/dashboard/components/studio-home";

describe("StudioHome", () => {
  it("renders the studio dashboard sections", () => {
    render(<StudioHome />);

    expect(screen.getByText("RainbowCode Studio")).toBeDefined();
    expect(screen.getByText("Recent work")).toBeDefined();
    expect(screen.getByText("RainbowCode studios")).toBeDefined();
    expect(screen.getByText("Latest studio updates")).toBeDefined();
  });
});