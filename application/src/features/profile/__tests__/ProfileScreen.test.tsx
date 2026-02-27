import { render, screen } from "@testing-library/react-native";
import ProfileScreen from "../ProfileScreen";

describe("ProfileScreen", () => {
  it("renders without crashing", () => {
    render(<ProfileScreen />);
  });

  it("displays the name Ray Parkar", () => {
    render(<ProfileScreen />);
    expect(screen.getByText("Ray Parkar")).toBeTruthy();
  });
});
