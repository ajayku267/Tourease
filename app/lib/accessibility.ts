export const focusableElements = [
  'a[href]',
  'area[href]',
  'input:not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  'button:not([disabled])',
  'iframe',
  'object',
  'embed',
  '[contenteditable]',
  '[tabindex]:not([tabindex="-1"])'
].join(',');

export function trapFocus(element: HTMLElement) {
  const focusableEls = Array.from(element.querySelectorAll(focusableElements));
  const firstFocusableEl = focusableEls[0] as HTMLElement;
  const lastFocusableEl = focusableEls[focusableEls.length - 1] as HTMLElement;

  element.addEventListener('keydown', (e) => {
    const isTabPressed = e.key === 'Tab';

    if (!isTabPressed) return;

    if (e.shiftKey) {
      if (document.activeElement === firstFocusableEl) {
        lastFocusableEl.focus();
        e.preventDefault();
      }
    } else {
      if (document.activeElement === lastFocusableEl) {
        firstFocusableEl.focus();
        e.preventDefault();
      }
    }
  });
}

export function focusFirstFocusableElement(element: HTMLElement) {
  const focusableEls = Array.from(element.querySelectorAll(focusableElements));
  const firstFocusableEl = focusableEls[0] as HTMLElement;
  if (firstFocusableEl) {
    firstFocusableEl.focus();
  }
}

export function getAriaLabel(text: string, type: 'button' | 'link' | 'input' = 'button') {
  switch (type) {
    case 'button':
      return `Click to ${text.toLowerCase()}`;
    case 'link':
      return `Navigate to ${text.toLowerCase()}`;
    case 'input':
      return `Enter ${text.toLowerCase()}`;
    default:
      return text;
  }
}

export function getRole(type: 'button' | 'link' | 'input' | 'heading' | 'list' | 'listitem') {
  switch (type) {
    case 'button':
      return 'button';
    case 'link':
      return 'link';
    case 'input':
      return 'textbox';
    case 'heading':
      return 'heading';
    case 'list':
      return 'list';
    case 'listitem':
      return 'listitem';
    default:
      return undefined;
  }
} 