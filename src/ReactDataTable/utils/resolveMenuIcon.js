import React from "react";
import { ActionIcon, resolveActionIconName } from "../Components/Icons/actionIcons";

/**
 * Resolve a menu item `icon` prop to a React node.
 * Strings map to built-in icons (`"edit"`, `"trash"`, aliases like `"delete"`).
 * Custom React nodes pass through unchanged.
 */
export function resolveMenuIcon(icon) {
  if (icon == null || icon === false) return null;
  if (typeof icon === "string") {
    if (!resolveActionIconName(icon)) return null;
    return <ActionIcon name={icon} />;
  }
  return icon;
}

export function hasMenuIcon(icon) {
  if (icon == null || icon === false) return false;
  if (typeof icon === "string") return Boolean(resolveActionIconName(icon));
  return true;
}
