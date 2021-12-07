import "react-native";
import React from "react";
import renderer from "react-test-renderer";

import AppText from "../../app/components/AppText";

// testing the AppText component
describe("Testing AppText component", () => {
  const wrapper = renderer.create(<AppText>Hello</AppText>);

  console.log(wrapper.toJSON());

  const styles = wrapper.toJSON().props.style[0];

  console.log(styles);

  const { fontWeight, fontSize } = styles;

  it("Should render", () => {
    expect(wrapper.toJSON()).toBeTruthy();
  });

  it("Should have fontWeight of 'bold' ", () => {
    expect(fontWeight).toBe("bold");
  });

  it("Should have fontSize 30", () => {
    expect(fontSize).toBe(20);
  });
});
