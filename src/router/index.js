import { createRouter, createWebHistory } from "vue-router";
import ContentView from "../views/ContentView.vue";
import ResumeView from "../views/ResumeView.vue";
import MusicView from "../views/MusicView.vue";

const viewMap = {
  resume: ResumeView,
  music: MusicView,
};

const createRoutesFromContent = (content) => {
  const routes = [
    {
      path: "/",
      name: "home",
      component: ContentView,
    },
  ];

  if (content && content.navigation) {
    content.navigation.forEach((navItem) => {
      if (navItem.url && navItem.url !== "/") {
        const routeName = navItem.url.slice(1).replace(/\//g, "-");
        routes.push({
          path: navItem.url,
          name: routeName,
          component: viewMap[routeName] || ContentView,
        });
      }
    });
  }

  routes.push({
    path: "/:pathMatch(.*)*",
    name: "not-found",
    component: ContentView,
  });

  return routes;
};

const router = createRouter({
  history: createWebHistory(),
  routes: createRoutesFromContent(null),
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0 };
    }
  },
});

export const updateRoutes = (content) => {
  if (!content) return;

  const newRoutes = createRoutesFromContent(content);

  newRoutes.forEach((route) => {
    try {
      if (router.hasRoute(route.name)) {
        router.removeRoute(route.name);
      }
      router.addRoute(route);
    } catch (error) {
      console.warn(`Failed to add route ${route.name}:`, error);
    }
  });
};

export default router;
