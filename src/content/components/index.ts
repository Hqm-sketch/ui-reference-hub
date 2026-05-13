import { ComponentMeta } from "@/lib/registry";
import { basicComponents } from "./basic";
import { formComponents } from "./form";
import { layoutComponents } from "./layout";
import { dataDisplayComponents } from "./data-display";
import { navigationComponents } from "./navigation";
import { feedbackComponents } from "./feedback";
import { animationComponents } from "./animation";
import { mobileComponents } from "./mobile";

export const allComponents: ComponentMeta[] = [
  ...basicComponents,
  ...formComponents,
  ...layoutComponents,
  ...dataDisplayComponents,
  ...navigationComponents,
  ...feedbackComponents,
  ...animationComponents,
  ...mobileComponents,
];

export const componentsByCategory: Record<string, ComponentMeta[]> = {
  basic: basicComponents,
  form: formComponents,
  layout: layoutComponents,
  "data-display": dataDisplayComponents,
  navigation: navigationComponents,
  feedback: feedbackComponents,
  animation: animationComponents,
  mobile: mobileComponents,
};

export { basicComponents, formComponents, layoutComponents, dataDisplayComponents, navigationComponents, feedbackComponents, animationComponents, mobileComponents };
