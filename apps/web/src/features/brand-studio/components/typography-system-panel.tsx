"use client";

import { RbcBadge } from "@/components/ui/rbc-badge";
import { RbcButton } from "@/components/ui/rbc-button";
import { rbcField } from "@/lib/design-system/ui-tokens";
import { exportTypographyCss } from "@/features/brand-studio/exporters/export-typography-css";
import { useTypographyStore } from "@/features/brand-studio/store/typography-store";
import type {
  BrandFontFamily,
  BrandTypographySystem,
} from "@/features/brand-studio/types/typography";
import { downloadFile } from "@/features/theme-engine/exporters/download-file";

const fonts: readonly BrandFontFamily[] = [
  "Inter",
  "Poppins",
  "Montserrat",
  "Playfair Display",
  "Space Grotesk",
  "System UI",
];

const scaleTokens: readonly (keyof BrandTypographySystem["scale"])[] = [
  "xs",
  "sm",
  "base",
  "lg",
  "xl",
  "2xl",
  "3xl",
  "4xl",
];

const fieldClass = `mt-1 w-full ${rbcField}`;

export function TypographySystemPanel() {
  const typography = useTypographyStore((state) => state.typography);
  const updateHeadingFont = useTypographyStore(
    (state) => state.updateHeadingFont,
  );
  const updateBodyFont = useTypographyStore((state) => state.updateBodyFont);
  const updateHeadingWeight = useTypographyStore(
    (state) => state.updateHeadingWeight,
  );
  const updateBodyWeight = useTypographyStore(
    (state) => state.updateBodyWeight,
  );
  const updateLineHeight = useTypographyStore(
    (state) => state.updateLineHeight,
  );
  const updateLetterSpacing = useTypographyStore(
    (state) => state.updateLetterSpacing,
  );
  const updateScaleToken = useTypographyStore(
    (state) => state.updateScaleToken,
  );
  const resetTypography = useTypographyStore(
    (state) => state.resetTypography,
  );

  function handleExportCss(): void {
    downloadFile(
      "rainbowcode-typography.css",
      exportTypographyCss(typography),
      "text/css",
    );
  }

  return (
    <section className="overflow-hidden rounded-[28px] rbc-surface-card">
      <div className="relative overflow-hidden border-b border-[var(--theme-border-soft)] p-4">
        <div className="absolute right-0 top-0 h-24 w-24 rounded-full bg-indigo-400/20 blur-2xl" />

        <div className="relative z-10 flex items-start justify-between gap-3">
          <div>
            <div className="flex flex-wrap gap-2">
              <RbcBadge variant="info">Typography</RbcBadge>
              <RbcBadge variant="success">CSS Export</RbcBadge>
            </div>

            <h3 className="mt-3 text-lg font-black tracking-tight text-[var(--surface-foreground)]">
              Brand typography system
            </h3>

            <p className="mt-1 text-xs leading-5 text-[var(--theme-text-muted)]">
              Define the font system used by brand kits, themes, components,
              and generated code.
            </p>
          </div>

          <RbcButton variant="ghost" onClick={resetTypography}>
            Reset
          </RbcButton>
        </div>
      </div>

      <div className="grid gap-5 p-4 2xl:grid-cols-[minmax(0,1fr)_360px]">
        <div className="rounded-[28px] rbc-surface-muted p-5">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-[var(--theme-text-subtle)]">
            Preview
          </p>

          <h4
            className="mt-4 text-4xl font-black tracking-tight text-[var(--surface-foreground)]"
            style={{
              fontFamily: typography.headingFont,
              fontWeight: typography.headingWeight,
              letterSpacing: `${typography.letterSpacing}em`,
              lineHeight: typography.lineHeight,
            }}
          >
            Build beautiful interfaces faster.
          </h4>

          <p
            className="mt-4 text-base leading-7 text-[var(--theme-text-muted)]"
            style={{
              fontFamily: typography.bodyFont,
              fontWeight: typography.bodyWeight,
              lineHeight: typography.lineHeight,
            }}
          >
            RainbowCode typography tokens keep brand, theme, component, canvas,
            and code output visually consistent.
          </p>

          <div className="mt-6 grid grid-cols-2 gap-3">
            {scaleTokens.map((token) => (
              <div
                key={token}
                className="rounded-2xl rbc-surface-panel p-3"
              >
                <p className="text-xs font-bold text-[var(--theme-text-subtle)]">{token}</p>
                <p
                  className="mt-1 font-black text-[var(--surface-foreground)]"
                  style={{
                    fontSize: typography.scale[token],
                    fontFamily: typography.headingFont,
                  }}
                >
                  Aa
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="grid gap-4">
          <div>
            <label
              htmlFor="typography-heading-font"
              className="text-xs font-black uppercase tracking-[0.14em] text-[var(--theme-text-subtle)]"
            >
              Heading Font
            </label>
            <select
              id="typography-heading-font"
              value={typography.headingFont}
              onChange={(event) =>
                updateHeadingFont(event.currentTarget.value as BrandFontFamily)
              }
              className={fieldClass}
            >
              {fonts.map((font) => (
                <option key={font} value={font}>
                  {font}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="typography-body-font"
              className="text-xs font-black uppercase tracking-[0.14em] text-[var(--theme-text-subtle)]"
            >
              Body Font
            </label>
            <select
              id="typography-body-font"
              value={typography.bodyFont}
              onChange={(event) =>
                updateBodyFont(event.currentTarget.value as BrandFontFamily)
              }
              className={fieldClass}
            >
              {fonts.map((font) => (
                <option key={font} value={font}>
                  {font}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label
                htmlFor="typography-heading-weight"
                className="text-xs font-black uppercase tracking-[0.14em] text-[var(--theme-text-subtle)]"
              >
                Heading Weight
              </label>
              <input
                id="typography-heading-weight"
                type="number"
                min={300}
                max={900}
                step={100}
                value={typography.headingWeight}
                onChange={(event) =>
                  updateHeadingWeight(Number(event.currentTarget.value))
                }
                className={fieldClass}
              />
            </div>

            <div>
              <label
                htmlFor="typography-body-weight"
                className="text-xs font-black uppercase tracking-[0.14em] text-[var(--theme-text-subtle)]"
              >
                Body Weight
              </label>
              <input
                id="typography-body-weight"
                type="number"
                min={300}
                max={900}
                step={100}
                value={typography.bodyWeight}
                onChange={(event) =>
                  updateBodyWeight(Number(event.currentTarget.value))
                }
                className={fieldClass}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label
                htmlFor="typography-line-height"
                className="text-xs font-black uppercase tracking-[0.14em] text-[var(--theme-text-subtle)]"
              >
                Line Height
              </label>
              <input
                id="typography-line-height"
                type="number"
                min={1}
                max={2}
                step={0.05}
                value={typography.lineHeight}
                onChange={(event) =>
                  updateLineHeight(Number(event.currentTarget.value))
                }
                className={fieldClass}
              />
            </div>

            <div>
              <label
                htmlFor="typography-letter-spacing"
                className="text-xs font-black uppercase tracking-[0.14em] text-[var(--theme-text-subtle)]"
              >
                Letter Spacing
              </label>
              <input
                id="typography-letter-spacing"
                type="number"
                min={-0.12}
                max={0.12}
                step={0.01}
                value={typography.letterSpacing}
                onChange={(event) =>
                  updateLetterSpacing(Number(event.currentTarget.value))
                }
                className={fieldClass}
              />
            </div>
          </div>

          <div className="grid gap-3">
            <p className="text-xs font-black uppercase tracking-[0.14em] text-[var(--theme-text-subtle)]">
              Type Scale
            </p>

            {scaleTokens.map((token) => (
              <div key={token}>
                <label
                  htmlFor={`typography-scale-${token}`}
                  className="text-xs font-bold uppercase tracking-[0.12em] text-[var(--theme-text-subtle)]"
                >
                  {token}
                </label>
                <input
                  id={`typography-scale-${token}`}
                  type="text"
                  value={typography.scale[token]}
                  onChange={(event) =>
                    updateScaleToken(token, event.currentTarget.value)
                  }
                  className={fieldClass}
                />
              </div>
            ))}
          </div>

          <RbcButton
            variant="primary"
            onClick={handleExportCss}
            className="w-full"
          >
            Export Typography CSS
          </RbcButton>
        </div>
      </div>
    </section>
  );
}
