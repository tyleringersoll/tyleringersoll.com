import { mount } from "@vue/test-utils";
import { createPinia, setActivePinia } from "pinia";
import ResumeView from "@/views/ResumeView.vue";
import { useContentStore } from "@/store";

const Article = {
  name: "Article",
  props: ["article", "index"],
  template: "<div />",
};

const makeResumeEntry = (overrides = {}) => ({
  heading: "A Heading",
  headingLevel: 2,
  content: ["Some content paragraph."],
  ...overrides,
});

const makeEmployerEntry = (roleOverrides = {}) => ({
  heading: "Acme Corp",
  headingLevel: 3,
  roles: [
    {
      subheading: "Senior Engineer · 2020–2023",
      content: ["• Did something cool.", "<strong>Tech:</strong> Vue, Node"],
      ...roleOverrides,
    },
  ],
});

describe("ResumeView.vue", () => {
  let pinia;

  const mountView = (storeOverrides = {}) => {
    pinia = createPinia();
    setActivePinia(pinia);
    const store = useContentStore();
    Object.assign(store, { content: null, isLoading: false, ...storeOverrides });

    return mount(ResumeView, {
      global: {
        plugins: [pinia],
        components: { Article },
        stubs: { transition: true },
      },
    });
  };

  it("shows 'Page Not Found' when store.content is null", () => {
    const wrapper = mountView({ content: null, isLoading: false });
    expect(wrapper.find(".resume").exists()).toBe(false);
    expect(wrapper.find("h1").text()).toBe("Page Not Found");
  });

  it("shows 'Page Not Found' while isLoading is true", () => {
    const wrapper = mountView({ content: { resume: [makeResumeEntry()] }, isLoading: true });
    expect(wrapper.find(".resume").exists()).toBe(false);
    expect(wrapper.find("h1").text()).toBe("Page Not Found");
  });

  it("shows 'Page Not Found' when content has no resume key", () => {
    const wrapper = mountView({ content: { home: [] }, isLoading: false });
    expect(wrapper.find(".resume").exists()).toBe(false);
    expect(wrapper.find("h1").text()).toBe("Page Not Found");
  });

  it("renders .resume section when content.resume exists", () => {
    const wrapper = mountView({ content: { resume: [makeResumeEntry()] }, isLoading: false });
    expect(wrapper.find(".resume").exists()).toBe(true);
    expect(wrapper.find("h1").exists()).toBe(false);
  });

  it("renders Article components for non-employer entries (no roles key)", () => {
    const wrapper = mountView({
      content: { resume: [makeResumeEntry(), makeResumeEntry()] },
      isLoading: false,
    });
    expect(wrapper.findAllComponents(Article)).toHaveLength(2);
    expect(wrapper.find(".employer").exists()).toBe(false);
  });

  it("renders .employer article for entries with roles", () => {
    const wrapper = mountView({
      content: { resume: [makeEmployerEntry()] },
      isLoading: false,
    });
    expect(wrapper.find(".employer").exists()).toBe(true);
    expect(wrapper.findAllComponents(Article)).toHaveLength(0);
  });

  it("renders employer name in .employer__name", () => {
    const wrapper = mountView({
      content: { resume: [makeEmployerEntry()] },
      isLoading: false,
    });
    expect(wrapper.find(".employer__name").text()).toBe("Acme Corp");
  });

  it("renders dates from subheading in .role__dates-col", () => {
    const wrapper = mountView({
      content: { resume: [makeEmployerEntry()] },
      isLoading: false,
    });
    expect(wrapper.find(".role__dates-col").text()).toBe("2020–2023");
  });

  it("renders title from subheading in .role__subheading", () => {
    const wrapper = mountView({
      content: { resume: [makeEmployerEntry()] },
      isLoading: false,
    });
    expect(wrapper.find(".role__subheading").text()).toBe("Senior Engineer");
  });

  it("returns empty string for dates when subheading has no ' · ' separator", () => {
    const wrapper = mountView({
      content: {
        resume: [makeEmployerEntry({ subheading: "Engineer" })],
      },
      isLoading: false,
    });
    expect(wrapper.find(".role__dates-col").text()).toBe("");
  });

  it("role is collapsed initially (no .role--expanded class)", () => {
    const wrapper = mountView({
      content: { resume: [makeEmployerEntry()] },
      isLoading: false,
    });
    expect(wrapper.find(".role--expanded").exists()).toBe(false);
  });

  it("clicking .role__left expands the role", async () => {
    const wrapper = mountView({
      content: { resume: [makeEmployerEntry()] },
      isLoading: false,
    });
    await wrapper.find(".role__left").trigger("click");
    expect(wrapper.find(".role--expanded").exists()).toBe(true);
  });

  it("clicking .role__left again collapses the role", async () => {
    const wrapper = mountView({
      content: { resume: [makeEmployerEntry()] },
      isLoading: false,
    });
    await wrapper.find(".role__left").trigger("click");
    expect(wrapper.find(".role--expanded").exists()).toBe(true);
    await wrapper.find(".role__left").trigger("click");
    expect(wrapper.find(".role--expanded").exists()).toBe(false);
  });

  it("clicking .role__subheading also toggles expansion", async () => {
    const wrapper = mountView({
      content: { resume: [makeEmployerEntry()] },
      isLoading: false,
    });
    await wrapper.find(".role__subheading").trigger("click");
    expect(wrapper.find(".role--expanded").exists()).toBe(true);
    await wrapper.find(".role__subheading").trigger("click");
    expect(wrapper.find(".role--expanded").exists()).toBe(false);
  });

  it("renders .role__node on the timeline axis", () => {
    const wrapper = mountView({
      content: { resume: [makeEmployerEntry()] },
      isLoading: false,
    });
    expect(wrapper.find(".role__node").exists()).toBe(true);
  });

  it("multiple roles can be expanded simultaneously", async () => {
    const employer = {
      heading: "Big Co",
      headingLevel: 3,
      roles: [
        { subheading: "Role A · 2019–2020", content: ["Role A content"] },
        { subheading: "Role B · 2020–2022", content: ["Role B content"] },
      ],
    };
    const wrapper = mountView({
      content: { resume: [employer] },
      isLoading: false,
    });
    const roleLefts = wrapper.findAll(".role__left");
    await roleLefts[0].trigger("click");
    await roleLefts[1].trigger("click");
    expect(wrapper.findAll(".role--expanded")).toHaveLength(2);
  });

  it("roles from different employers tracked independently (entryIdx)", async () => {
    const entry0 = makeEmployerEntry();
    const entry1 = {
      heading: "Other Corp",
      headingLevel: 3,
      roles: [{ subheading: "Dev · 2018–2019", content: ["content"] }],
    };
    const wrapper = mountView({
      content: { resume: [entry0, entry1] },
      isLoading: false,
    });
    const roleLefts = wrapper.findAll(".role__left");
    await roleLefts[1].trigger("click");
    expect(wrapper.findAll(".role--expanded")).toHaveLength(1);
    await roleLefts[1].trigger("click");
    await roleLefts[0].trigger("click");
    expect(wrapper.findAll(".role--expanded")).toHaveLength(1);
  });

  it("renders .tech-divider hr before Tech lines", async () => {
    const wrapper = mountView({
      content: { resume: [makeEmployerEntry()] },
      isLoading: false,
    });
    await wrapper.find(".role__left").trigger("click");
    expect(wrapper.find(".tech-divider").exists()).toBe(true);
  });

  it("does NOT render .tech-divider for non-Tech paragraphs", async () => {
    const employer = makeEmployerEntry({
      subheading: "Dev · 2020–2022",
      content: ["• A bullet point", "Just a paragraph"],
    });
    const wrapper = mountView({
      content: { resume: [employer] },
      isLoading: false,
    });
    await wrapper.find(".role__left").trigger("click");
    expect(wrapper.find(".tech-divider").exists()).toBe(false);
  });

  it("renders .article__bullet-item class for paragraphs starting with •", async () => {
    const wrapper = mountView({
      content: { resume: [makeEmployerEntry()] },
      isLoading: false,
    });
    await wrapper.find(".role__left").trigger("click");
    const bullets = wrapper.findAll(".article__bullet-item");
    expect(bullets.length).toBeGreaterThan(0);
    expect(bullets[0].text()).toContain("Did something cool");
  });
});
