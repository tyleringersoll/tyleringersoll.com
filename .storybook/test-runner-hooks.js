import { getStoryContext, setPreVisit } from "@storybook/test-runner";
import { INITIAL_VIEWPORTS } from "storybook/viewport";

// Stories that declare a viewport global (mobile navigation, phone pages) need
// the page itself resized; the test runner visits iframe.html directly.
setPreVisit(async (page, story) => {
  const context = await getStoryContext(page, story);
  const id = context.storyGlobals?.viewport?.value;
  const viewport = INITIAL_VIEWPORTS[id];
  await page.setViewportSize(
    viewport
      ? {
          width: Number.parseInt(viewport.styles.width),
          height: Number.parseInt(viewport.styles.height),
        }
      : { width: 1280, height: 800 },
  );
});
