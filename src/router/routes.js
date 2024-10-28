// Page
import CfxInput from "@/page/CfxInput.vue";
import ServerInfo from "@/page/ServerInfo.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: CfxInput,
  },
  {
    path: "/info:cfxKey",
    name: "ServerInfo",
    component: ServerInfo,
    props: true,
  },
];

export default routes;
