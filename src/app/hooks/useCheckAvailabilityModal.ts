/**
 * useCheckAvailabilityModal Hook
 * 
 * Manages the open/close state of the Check Availability modal.
 * Can be used across multiple components (hero, pricing, sticky button, etc.)
 * 
 * Usage:
 * ```tsx
 * const { isOpen, open, close } = useCheckAvailabilityModal();
 * 
 * <button onClick={open}>Check Availability</button>
 * <CheckAvailabilityModal isOpen={isOpen} onClose={close} />
 * ```
 */

import { useState, useCallback } from "react";

export function useCheckAvailabilityModal() {
  const [isOpen, setIsOpen] = useState(false);

  const open = useCallback(() => {
    setIsOpen(true);
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
  }, []);

  const toggle = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  return {
    isOpen,
    open,
    close,
    toggle,
  };
}
