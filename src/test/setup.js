import "@testing-library/jest-dom/vitest";
import { vi } from "vitest";

// jsdom does not implement scrolling; stub to avoid "Not implemented" noise.
window.scrollTo = vi.fn();
Element.prototype.scrollIntoView = vi.fn();
