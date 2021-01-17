import { shallowMount } from "@vue/test-utils";
import Welcome from "./Welcome.vue";

describe("Welcome.vue", () => {
  test("renders correctly", () => {
    const wrapper = shallowMount(Welcome, {});
    expect(wrapper.text()).toContain("welcome.welcome");
  });
});
