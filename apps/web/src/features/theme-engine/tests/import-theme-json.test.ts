import { describe, expect, it } from "vitest";
import { defaultTheme } from "@/features/theme-engine/constants/default-theme";
import { exportJsonTheme } from "@/features/theme-engine/exporters/export-json";
import { importThemeJson } from "@/features/theme-engine/importers/import-theme-json";

describe("importThemeJson", () => {
  it("parses exported theme JSON", () => {
    const importedTheme = importThemeJson(exportJsonTheme(defaultTheme));

    expect(importedTheme).toEqual(defaultTheme);
  });

  it("rejects invalid JSON", () => {
    expect(() => importThemeJson("{not-valid}")).toThrow(
      "Invalid theme.json: expected valid JSON.",
    );
  });

  it("rejects schema-invalid themes", () => {
    expect(() =>
      importThemeJson(
        JSON.stringify({
          version: "1.0.0",
          colors: {
            primary: "blue",
          },
        }),
      ),
    ).toThrow();
  });
});
