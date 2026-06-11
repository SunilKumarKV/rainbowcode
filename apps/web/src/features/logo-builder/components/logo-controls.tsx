"use client";

import type {
  LogoFontFamily,
  LogoGradientDirection,
} from "@/features/logo-builder/types/logo";
import { useLogoStore } from "@/features/logo-builder/store/logo-store";

const fontFamilies: readonly LogoFontFamily[] = [
  "Inter",
  "Poppins",
  "Montserrat",
  "Playfair Display",
  "Space Grotesk",
];

const gradientDirections: readonly {
  readonly label: string;
  readonly value: LogoGradientDirection;
}[] = [
  { label: "Right", value: "to-right" },
  { label: "Bottom Right", value: "to-bottom-right" },
  { label: "Bottom", value: "to-bottom" },
  { label: "Top Right", value: "to-top-right" },
];

function fieldClass(): string {
  return "mt-1 h-11 w-full rounded-2xl border border-slate-200 bg-white px-3 text-sm font-semibold text-slate-950 outline-none transition focus:border-indigo-300 focus:ring-4 focus:ring-indigo-500/10 dark:border-slate-800 dark:bg-slate-950 dark:text-white";
}

export function LogoControls() {
  const logo = useLogoStore((state) => state.logo);
  const updateText = useLogoStore((state) => state.updateText);
  const updateTagline = useLogoStore((state) => state.updateTagline);
  const updateFontFamily = useLogoStore((state) => state.updateFontFamily);
  const updateFontWeight = useLogoStore((state) => state.updateFontWeight);
  const updateLetterSpacing = useLogoStore(
    (state) => state.updateLetterSpacing,
  );
  const updatePrimaryColor = useLogoStore((state) => state.updatePrimaryColor);
  const updateSecondaryColor = useLogoStore(
    (state) => state.updateSecondaryColor,
  );
  const updateBackgroundColor = useLogoStore(
    (state) => state.updateBackgroundColor,
  );
  const updateGradientDirection = useLogoStore(
    (state) => state.updateGradientDirection,
  );
  const updateRadius = useLogoStore((state) => state.updateRadius);

  return (
    <div className="grid gap-4">
      <div>
        <label
          htmlFor="logo-text"
          className="text-xs font-black uppercase tracking-[0.14em] text-slate-500"
        >
          Logo Text
        </label>
        <input
          id="logo-text"
          type="text"
          value={logo.text}
          onChange={(event) => updateText(event.currentTarget.value)}
          className={fieldClass()}
        />
      </div>

      <div>
        <label
          htmlFor="logo-tagline"
          className="text-xs font-black uppercase tracking-[0.14em] text-slate-500"
        >
          Tagline
        </label>
        <input
          id="logo-tagline"
          type="text"
          value={logo.tagline}
          onChange={(event) => updateTagline(event.currentTarget.value)}
          className={fieldClass()}
        />
      </div>

      <div>
        <label
          htmlFor="logo-font"
          className="text-xs font-black uppercase tracking-[0.14em] text-slate-500"
        >
          Font
        </label>
        <select
          id="logo-font"
          value={logo.fontFamily}
          onChange={(event) =>
            updateFontFamily(event.currentTarget.value as LogoFontFamily)
          }
          className={fieldClass()}
        >
          {fontFamilies.map((fontFamily) => (
            <option key={fontFamily} value={fontFamily}>
              {fontFamily}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label
            htmlFor="logo-weight"
            className="text-xs font-black uppercase tracking-[0.14em] text-slate-500"
          >
            Weight
          </label>
          <input
            id="logo-weight"
            type="number"
            min={300}
            max={900}
            step={100}
            value={logo.fontWeight}
            onChange={(event) =>
              updateFontWeight(Number(event.currentTarget.value))
            }
            className={fieldClass()}
          />
        </div>

        <div>
          <label
            htmlFor="logo-letter-spacing"
            className="text-xs font-black uppercase tracking-[0.14em] text-slate-500"
          >
            Spacing
          </label>
          <input
            id="logo-letter-spacing"
            type="number"
            min={-8}
            max={12}
            value={logo.letterSpacing}
            onChange={(event) =>
              updateLetterSpacing(Number(event.currentTarget.value))
            }
            className={fieldClass()}
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="logo-gradient-direction"
          className="text-xs font-black uppercase tracking-[0.14em] text-slate-500"
        >
          Gradient
        </label>
        <select
          id="logo-gradient-direction"
          value={logo.gradientDirection}
          onChange={(event) =>
            updateGradientDirection(
              event.currentTarget.value as LogoGradientDirection,
            )
          }
          className={fieldClass()}
        >
          {gradientDirections.map((direction) => (
            <option key={direction.value} value={direction.value}>
              {direction.label}
            </option>
          ))}
        </select>
      </div>

      <div className="grid gap-3">
        {[
          {
            id: "logo-primary-color",
            label: "Primary",
            value: logo.primaryColor,
            onChange: updatePrimaryColor,
          },
          {
            id: "logo-secondary-color",
            label: "Secondary",
            value: logo.secondaryColor,
            onChange: updateSecondaryColor,
          },
          {
            id: "logo-background-color",
            label: "Background",
            value: logo.backgroundColor,
            onChange: updateBackgroundColor,
          },
        ].map((field) => (
          <div
            key={field.id}
            className="rounded-2xl border border-slate-200 bg-slate-50 p-3 dark:border-slate-800 dark:bg-slate-900/70"
          >
            <label
              htmlFor={field.id}
              className="text-xs font-black uppercase tracking-[0.14em] text-slate-500"
            >
              {field.label}
            </label>

            <div className="mt-2 flex items-center gap-3">
              <input
                id={field.id}
                type="color"
                value={field.value}
                onChange={(event) => field.onChange(event.currentTarget.value)}
                className="size-11 cursor-pointer rounded-2xl border border-slate-200 bg-white p-1 dark:border-slate-800 dark:bg-slate-950"
              />
              <input
                type="text"
                value={field.value}
                aria-label={`${field.label} color value`}
                onChange={(event) => field.onChange(event.currentTarget.value)}
                className={fieldClass()}
              />
            </div>
          </div>
        ))}
      </div>

      <div>
        <label
          htmlFor="logo-radius"
          className="text-xs font-black uppercase tracking-[0.14em] text-slate-500"
        >
          Background Radius
        </label>
        <input
          id="logo-radius"
          type="range"
          min={0}
          max={72}
          value={logo.radius}
          onChange={(event) => updateRadius(Number(event.currentTarget.value))}
          className="mt-3 w-full accent-indigo-600"
        />
      </div>
    </div>
  );
}