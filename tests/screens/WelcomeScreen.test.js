import "react-native";
import React from "react";
import renderer from "react-test-renderer";

import WelcomeScreen from "../../app/screens/WelcomeScreen";

describe("<WelcomeScreen />", () => {
  it("has 4 children", () => {
    const tree = renderer.create(<WelcomeScreen />).toJSON();
    expect(tree.children.length).toBe(4);
  });
});
