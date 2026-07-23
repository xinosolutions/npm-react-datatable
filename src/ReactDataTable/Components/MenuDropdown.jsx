import React, { useState, useRef, useEffect, useLayoutEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import styles from "../CSS/DataTable.module.css";
import MenuIcon from "./Icons/MenuIcon";

const MenuDropdown = ({ menuItems, row, rowIndex }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isPositioned, setIsPositioned] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState({
    top: 0,
    left: 0,
    right: null,
  });
  const menuRef = useRef(null);
  const buttonRef = useRef(null);
  const dropdownRef = useRef(null);

  const calculatePosition = useCallback(() => {
    if (!buttonRef.current || !dropdownRef.current) return false;

    const buttonRect = buttonRef.current.getBoundingClientRect();
    const dropdownRect = dropdownRef.current.getBoundingClientRect();
    const dropdownWidth = dropdownRect.width || 120;
    const dropdownHeight = dropdownRect.height || 40;
    const margin = 8;
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    // Prefer aligning the menu's right edge with the button (actions sit on the right)
    let left = buttonRect.right - dropdownWidth;
    let right = null;

    if (left < margin) {
      left = Math.min(buttonRect.left, viewportWidth - dropdownWidth - margin);
      left = Math.max(margin, left);
    }

    if (left + dropdownWidth > viewportWidth - margin) {
      left = null;
      right = margin;
    }

    const spaceBelow = viewportHeight - buttonRect.bottom - margin;
    const spaceAbove = buttonRect.top - margin;
    let top = buttonRect.bottom + 4;

    if (dropdownHeight > spaceBelow && spaceAbove > spaceBelow) {
      top = Math.max(margin, buttonRect.top - dropdownHeight - 4);
    } else if (top + dropdownHeight > viewportHeight - margin) {
      top = Math.max(margin, viewportHeight - dropdownHeight - margin);
    }

    setDropdownPosition({ top, left, right });
    return true;
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setIsOpen(false);
        if (buttonRef.current) {
          buttonRef.current.focus({ preventScroll: true });
        }
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen]);

  // Measure before paint so the menu never flashes at the wrong spot
  useLayoutEffect(() => {
    if (!isOpen) {
      setIsPositioned(false);
      return undefined;
    }

    let cancelled = false;
    let rafId = 0;

    const tryPosition = () => {
      if (cancelled) return;
      if (calculatePosition()) {
        setIsPositioned(true);
        return;
      }
      rafId = requestAnimationFrame(tryPosition);
    };

    tryPosition();

    const onReposition = () => {
      calculatePosition();
    };
    window.addEventListener("resize", onReposition);
    window.addEventListener("scroll", onReposition, true);

    return () => {
      cancelled = true;
      if (rafId) cancelAnimationFrame(rafId);
      window.removeEventListener("resize", onReposition);
      window.removeEventListener("scroll", onReposition, true);
    };
  }, [isOpen, calculatePosition]);

  const handleMenuClick = (e) => {
    e.stopPropagation();
    setIsOpen((open) => {
      if (open) {
        setIsPositioned(false);
        return false;
      }
      return true;
    });
    // Mouse/touch clicks set detail >= 1; keyboard activation is 0 — keep focus for a11y
    if (e.detail > 0) {
      e.currentTarget.blur();
    }
  };

  const handleMenuItemClick = (onClick) => {
    if (onClick) {
      onClick(row, rowIndex);
    }
    setIsOpen(false);
    setIsPositioned(false);
  };

  if (!menuItems || menuItems.length === 0) {
    return null;
  }

  const hasAnyIcon = menuItems.some(
    (item) => item.icon != null && item.icon !== false,
  );

  const dropdownContent = isOpen ? (
    <div
      ref={dropdownRef}
      className={styles.menuDropdown}
      role="menu"
      style={{
        top: `${dropdownPosition.top}px`,
        ...(dropdownPosition.left !== null && dropdownPosition.left !== undefined
          ? { left: `${dropdownPosition.left}px`, right: "auto" }
          : {}),
        ...(dropdownPosition.right !== null &&
        dropdownPosition.right !== undefined
          ? { right: `${dropdownPosition.right}px`, left: "auto" }
          : {}),
        visibility: isPositioned ? "visible" : "hidden",
        pointerEvents: isPositioned ? "auto" : "none",
      }}
    >
      {menuItems.map((item, index) => (
        <button
          key={index}
          className={`${styles.menuItem}${item.danger ? ` ${styles.menuItemDanger}` : ""}`}
          onClick={() => handleMenuItemClick(item.onClick)}
          type="button"
          role="menuitem"
          tabIndex={isPositioned ? 0 : -1}
        >
          {hasAnyIcon ? (
            <span className={styles.menuItemIcon} aria-hidden="true">
              {item.icon != null && item.icon !== false ? item.icon : null}
            </span>
          ) : null}
          <span className={styles.menuItemLabel}>{item.label}</span>
        </button>
      ))}
    </div>
  ) : null;

  return (
    <>
      <div className={styles.menuContainer} ref={menuRef}>
        <button
          ref={buttonRef}
          className={`${styles.menuButton}${isOpen ? ` ${styles.menuButtonOpen}` : ""}`}
          onClick={handleMenuClick}
          aria-label="Open menu"
          aria-expanded={isOpen}
          aria-haspopup="menu"
          type="button"
        >
          <MenuIcon className={styles.menuIcon} />
        </button>
      </div>
      {isOpen && createPortal(dropdownContent, document.body)}
    </>
  );
};

export default MenuDropdown;
