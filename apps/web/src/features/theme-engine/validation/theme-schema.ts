import { z } from "zod";

const hexColorSchema = z
  .string()
  .regex(/^#(?:[0-9a-fA-F]{3}){1,2}$/, "Expected a valid hex color.");

const remValueSchema = z
  .string()
  .regex(/^\d+(?:\.\d+)?rem$/, "Expected a valid rem value.");

const lineHeightSchema = z
  .string()
  .regex(/^\d+(?:\.\d+)?$/, "Expected a unitless line-height value.");

export const themeSchema = z.object({
  version: z.literal("1.0.0"),
  colors: z.object({
    primary: hexColorSchema,
    secondary: hexColorSchema,
    background: hexColorSchema,
    foreground: hexColorSchema,
    success: hexColorSchema,
    warning: hexColorSchema,
    destructive: hexColorSchema,
  }),
  typography: z.object({
    fontFamily: z.string().min(1, "Font family is required."),
    fontSizeBase: remValueSchema,
    lineHeightBase: lineHeightSchema,
  }),
  radius: z.object({
    sm: remValueSchema,
    md: remValueSchema,
    lg: remValueSchema,
    xl: remValueSchema,
  }),
  spacing: z.object({
    xs: remValueSchema,
    sm: remValueSchema,
    md: remValueSchema,
    lg: remValueSchema,
    xl: remValueSchema,
  }),
});

export type ThemeSchema = z.infer<typeof themeSchema>;