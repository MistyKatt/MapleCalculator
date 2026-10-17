import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import HomePage from "@/app/page";

describe("HomePage", () => {
  it("shows the project identity and makes the unfinished scope clear", () => {
    render(<HomePage />);

    expect(screen.getByRole("heading", { level: 1, name: "MapleCalculator" })).toBeInTheDocument();
    expect(screen.getByText("项目正在搭建中，计算功能将于后续加入。")).toBeInTheDocument();
  });
});
