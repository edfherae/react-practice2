import { describe, expect, test, vi } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Pagination } from "./Pagination";
import { afterEach } from "vitest";

function renderPagination({
  page = 1,
  totalPages = 5,
  onClick = vi.fn(),
}: {
  page?: number;
  totalPages?: number;
  onClick?: (pageNumber: number) => void;
} = {}) {
  render(<Pagination page={page} totalPages={totalPages} onClick={onClick} />);
  return { onClick };
}

describe("Pagination", () => {
  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  test("renders Prev and Next buttons", () => {
    renderPagination();
    expect(screen.getByRole("button", { name: "Prev" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Next" })).toBeInTheDocument();
  });

  describe("Prev button", () => {
    test("is disabled on first page", () => {
      renderPagination({ page: 1 });
      expect(screen.getByRole("button", { name: "Prev" })).toBeDisabled();
    });

    test("is enabled after first page", () => {
      renderPagination({ page: 2 });
      expect(screen.getByRole("button", { name: "Prev" })).toBeEnabled();
    });

    test("calls onClick when not on first page", () => {
      renderPagination({ page: 2 });
      expect(screen.getByRole("button", { name: "Prev" })).toBeEnabled();
    });

    test("is enabled after first page", async () => {
      const { onClick } = renderPagination({ page: 3 });
      await userEvent.click(screen.getByRole("button", { name: "Prev" }));
      expect(onClick).toHaveBeenCalledOnce();
      expect(onClick).toHaveBeenCalledWith(2);
    });

    test("doesn't call onClick when disabled", async () => {
      const { onClick } = renderPagination({ page: 1 });
      await userEvent.click(screen.getByRole("button", { name: "Prev" }));
      expect(onClick).not.toHaveBeenCalled();
    });
  });

  describe("Next button", () => {
    test("is disabled on last page", () => {
      renderPagination({ page: 5, totalPages: 5 });
      expect(screen.getByRole("button", { name: "Next" })).toBeDisabled();
    });

    test("is enabled on pages before last", () => {
      renderPagination({ page: 4, totalPages: 5 });
      expect(screen.getByRole("button", { name: "Next" })).toBeEnabled();
    });

    test("calls onClick with page + 1 when clicked", async () => {
      const { onClick } = renderPagination({ page: 2, totalPages: 5 });
      await userEvent.click(screen.getByRole("button", { name: "Next" }));
      expect(onClick).toHaveBeenCalledOnce();
      expect(onClick).toHaveBeenCalledWith(3);
    });

    test("doesn't call onClick when disabled", async () => {
      const { onClick } = renderPagination({ page: 5, totalPages: 5 });
      await userEvent.click(screen.getByRole("button", { name: "Next" }));
      expect(onClick).not.toHaveBeenCalled();
    });
  });

  describe("edge cases", () => {
    test("both buttons disabled when single page", () => {
      renderPagination({ page: 1, totalPages: 1 });
      expect(screen.getByRole("button", { name: "Prev" })).toBeDisabled();
      expect(screen.getByRole("button", { name: "Next" })).toBeDisabled();
    });

    test("Prev disabled on page 0", () => {
      renderPagination({ page: 0, totalPages: 5 });
      expect(screen.getByRole("button", { name: "Prev" })).toBeDisabled();
    });
  });
});
