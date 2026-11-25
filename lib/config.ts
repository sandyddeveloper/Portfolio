/**
 * Feature flags derived from environment variables.
 */
export const isHireEnabled =
  process.env.NEXT_PUBLIC_ENABLE_HIRE?.trim().toLowerCase() !== "false";

export const isBlurEnabled =
  process.env.NEXT_PUBLIC_ENABLE_BLUR?.trim().toLowerCase() !== "false";

export const featuredProjectTitle =
  process.env.NEXT_PUBLIC_PROJECT_TITLE ?? "Confidential App";

export const secondProjectTitle =
  process.env.NEXT_PUBLIC_PROJECT_2_TITLE ?? "Confidential App";
