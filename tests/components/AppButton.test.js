import "react-native";
import React from "react";
import renderer from "react-test-renderer";

import AppButton from "../../app/components/AppButton";

// testing the AppButton component
describe("Testing AppButton component", () => {
  const wrapper = renderer.create(
    <AppButton
      title="Test Button"
      width="50%"
      color="secondary"
      onPress={() => console.log("pressed")}
    />
  );

  console.log(wrapper.toJSON());

  const styles = wrapper.toJSON().props.style;

  const { width, backgroundColor } = styles;

  it("Should render", () => {
    expect(wrapper.toJSON()).toBeTruthy();
  });

  it("Should have width of 50%", () => {
    expect(width).toBe("50%");
  });

  it("Should have white background", () => {
    expect(backgroundColor).toBe("#2E86C1");
  });
});
