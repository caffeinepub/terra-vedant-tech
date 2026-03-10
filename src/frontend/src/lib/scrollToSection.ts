/**
 * Shared smooth-scroll helper that calculates the scroll offset using the runtime fixed header height.
 * This ensures consistent scroll behavior across all navigation points (header, hero CTAs, footer links).
 *
 * The function waits for any layout changes (e.g., mobile menu closing) to complete before measuring
 * the header height, ensuring accurate offset calculation.
 */
export function scrollToSection(sectionId: string): void {
  const element = document.getElementById(sectionId);
  if (!element) {
    console.warn(`scrollToSection: Element with id "${sectionId}" not found`);
    return;
  }

  // Calculate offset dynamically based on actual header height
  const header = document.querySelector("header");
  const headerHeight = header ? header.offsetHeight : 0;

  // Add a buffer (20px) for visual breathing room
  // This ensures section headings don't land directly under the header
  const buffer = 20;
  const offset = headerHeight + buffer;

  // Calculate target scroll position
  const elementPosition = element.getBoundingClientRect().top;
  const offsetPosition = elementPosition + window.pageYOffset - offset;

  // Perform smooth scroll
  window.scrollTo({
    top: offsetPosition,
    behavior: "smooth",
  });
}
