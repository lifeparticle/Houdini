import { test, expect, describe } from "vitest";
import ColorPicker from "pages/Colors/ColorPicker";
import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent, screen } from "@testing-library/react";
import { FORMAT_LABELS } from "pages/Colors/ColorPicker/utils/constant";

describe("ColorPicker Component", () => {
	test("renders without crashing", () => {
		render(<ColorPicker />);
	});

	test("displays color format options", () => {
		render(<ColorPicker />);

		FORMAT_LABELS.forEach((label) => {
			const tagElement = screen.getByText(label);
			expect(tagElement).toBeInTheDocument();
			fireEvent.click(tagElement);
			expect(tagElement).toHaveClass("ant-tag-success");
		});
	});
});
