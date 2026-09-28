import React from "react";
import styles from "../CSS/DataTable.module.css";
import { resolveMenuIcon, hasMenuIcon } from "../utils/resolveMenuIcon";

const TONE_CLASS = {
  neutral: styles.actionBtnNeutral,
  info: styles.actionBtnInfo,
  success: styles.actionBtnSuccess,
  warning: styles.actionBtnWarning,
  danger: styles.actionBtnDanger,
};

const resolveActionTone = (item) => {
  const raw = typeof item.tone === "string" ? item.tone.trim() : "";
  if (raw && TONE_CLASS[raw]) {
    return { kind: "preset", value: raw };
  }
  if (raw) {
    return { kind: "custom", value: raw };
  }
  if (item.danger) return { kind: "preset", value: "danger" };
  return { kind: "preset", value: "neutral" };
};

const resolveLabel = (item) => {
  if (typeof item.tooltip === "string" && item.tooltip) return item.tooltip;
  if (typeof item.label === "string" && item.label) return item.label;
  return "Action";
};

const ActionButtons = ({ menuItems, row, rowIndex }) => {
  if (!menuItems || menuItems.length === 0) return null;

  return (
    <div className={styles.actionButtons} role="group" aria-label="Row actions">
      {menuItems.map((item, index) => {
        const resolved = resolveActionTone(item);
        const label = resolveLabel(item);
        const isCustom = resolved.kind === "custom";
        const iconNode = resolveMenuIcon(item.icon);
        const className = [
          styles.actionBtn,
          isCustom ? styles.actionBtnCustom : TONE_CLASS[resolved.value],
          item.emphasized ? styles.actionBtnEmphasized : "",
        ]
          .filter(Boolean)
          .join(" ");

        const style = isCustom
          ? { "--action-btn-color": resolved.value }
          : undefined;

        return (
          <span key={index} className={styles.actionBtnWrap}>
            <button
              type="button"
              className={className}
              style={style}
              aria-label={label}
              title={label}
              disabled={Boolean(item.disabled)}
              onClick={(e) => {
                e.stopPropagation();
                // Mouse/touch clicks set detail >= 1; blur so no focus ring sticks
                if (e.detail > 0) {
                  e.currentTarget.blur();
                }
                if (item.onClick) item.onClick(row, rowIndex);
              }}
            >
              {hasMenuIcon(item.icon) ? (
                <span className={styles.actionBtnIcon} aria-hidden="true">
                  {iconNode}
                </span>
              ) : (
                <span className={styles.actionBtnFallback} aria-hidden="true">
                  {label.charAt(0).toUpperCase()}
                </span>
              )}
            </button>
          </span>
        );
      })}
    </div>
  );
};

export default ActionButtons;
