// Page
import CfxInput from "@/page/CfxInput.vue";
import ServerInfo from "@/page/ServerInfo.vue";

const routes = [
  {
    path: "/CFX-Finder",
    name: "Home",
    component: CfxInput,
  },
  {
    path: "/CFX-Finder/info:cfxKey",
    name: "ServerInfo",
    component: ServerInfo,
    props: true,
  },
];

export default routes;
