import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { ThemePreview } from "@/features/theme-studio/components/theme-preview";
import { useThemeStore } from "@/features/theme-engine/store/theme-store";

vi.mock("next/navigation", () => ({
  usePathname: () => "/studio/theme",
  useRouter: () => ({
    push: vi.fn(),
  }),
}));

describe("ThemePreview", () => {
  beforeEach(() => {
    useThemeStore.getState().resetTheme();
  });

  it("renders all required live preview sections", () => {
    render(<ThemePreview />);

    expect(screen.getByText("Navbar Preview")).toBeDefined();
    expect(screen.getByText("Sidebar Preview")).toBeDefined();
    expect(screen.getByLabelText("Button preview")).toBeDefined();
    expect(screen.getByLabelText("Input preview")).toBeDefined();
    expect(screen.getByLabelText("Card preview")).toBeDefined();
    expect(screen.getByText("Dashboard Preview")).toBeDefined();
  });
});
