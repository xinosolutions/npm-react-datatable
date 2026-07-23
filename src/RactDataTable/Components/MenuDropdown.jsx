import React, { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import styles from "../CSS/DataTable.module.css";
import MenuIcon from "./Icons/MenuIcon";

const MenuDropdown = ({ menuItems, row, rowIndex }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: null, right: null });
  const menuRef = useRef(null);
  const buttonRef = useRef(null);
  const dropdownRef = useRef(null);

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

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  // Separate effect to calculate position after dropdown is rendered
  useEffect(() => {
    if (isOpen && buttonRef.current) {
      const calculatePosition = () => {
        if (buttonRef.current && dropdownRef.current) {
          const buttonRect = buttonRef.current.getBoundingClientRect();
          const dropdownRect = dropdownRef.current.getBoundingClientRect();
          const dropdownWidth = dropdownRect.width;
          const leftMargin = 20; // margin from left screen edge
          const rightMargin = 12; // margin from right screen edge (smaller for less gap)
          const viewportWidth = window.innerWidth;
          
          let left = null;
          let right = null;
          
          // Calculate the ideal left position (aligned with button)
          const idealLeft = buttonRect.left;
          
          // Check if dropdown fits with margins on both sides
          const fitsWithMargins = (idealLeft >= leftMargin) && (idealLeft + dropdownWidth + rightMargin <= viewportWidth);
          
          if (fitsWithMargins) {
            // Perfect fit - use ideal position
            left = idealLeft;
            right = null;
          } else {
            // Need to adjust positioning
            // Check if it would overflow on the right
            if (idealLeft + dropdownWidth + rightMargin > viewportWidth) {
              // Try positioning to the left of button
              const leftOfButton = buttonRect.right - dropdownWidth - rightMargin;
              
              // If that would go off the left edge, use minimum left margin
              if (leftOfButton < leftMargin) {
                left = leftMargin;
                right = null;
              } else {
                // Position using right property to ensure margin from right edge
                // Dropdown's right edge should be at: buttonRect.right - rightMargin
                // So right = viewportWidth - (buttonRect.right - rightMargin)
                right = viewportWidth - buttonRect.right + rightMargin;
                left = null;
              }
            } else {
              // Would overflow on left, ensure left margin
              left = leftMargin;
              right = null;
              
              // But also check if this causes right overflow
              if (left + dropdownWidth + rightMargin > viewportWidth) {
                // Adjust to ensure right margin
                left = viewportWidth - dropdownWidth - rightMargin;
              }
            }
          }
          
          setDropdownPosition({
            top: buttonRect.bottom + 4,
            left: left,
            right: right,
          });
        }
      };

      // Initial position - render dropdown first
      if (buttonRef.current) {
        const rect = buttonRef.current.getBoundingClientRect();
        setDropdownPosition({
          top: rect.bottom + 4,
          left: rect.left,
          right: null,
        });
      }

      // Recalculate after dropdown renders with actual width
      // Use double requestAnimationFrame to ensure DOM is updated
      const frameId = requestAnimationFrame(() => {
        requestAnimationFrame(calculatePosition);
      });
      
      return () => cancelAnimationFrame(frameId);
    }
  }, [isOpen]);

  const handleMenuClick = (e) => {
    e.stopPropagation();
    setIsOpen(!isOpen);
  };

  const handleMenuItemClick = (onClick) => {
    if (onClick) {
      onClick(row, rowIndex);
    }
    setIsOpen(false);
  };

  if (!menuItems || menuItems.length === 0) {
    return null;
  }

  const dropdownContent = isOpen && (
    <div
      ref={dropdownRef}
      className={styles.menuDropdown}
      style={{
        top: `${dropdownPosition.top}px`,
        ...(dropdownPosition.left !== null && dropdownPosition.left !== undefined
          ? { left: `${dropdownPosition.left}px` }
          : {}),
        ...(dropdownPosition.right !== null && dropdownPosition.right !== undefined
          ? { right: `${dropdownPosition.right}px` }
          : {}),
      }}
    >
      {menuItems.map((item, index) => (
        <button
          key={index}
          className={styles.menuItem}
          onClick={() => handleMenuItemClick(item.onClick)}
          type="button"
        >
          {item.label}
        </button>
      ))}
    </div>
  );

  return (
    <>
      <div className={styles.menuContainer} ref={menuRef}>
        <button
          ref={buttonRef}
          className={styles.menuButton}
          onClick={handleMenuClick}
          aria-label="Open menu"
          aria-expanded={isOpen}
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
