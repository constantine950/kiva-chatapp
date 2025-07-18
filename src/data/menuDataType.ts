type MenuItems = {
  id: number;
  link: string;
  text: string;
};

export const items: MenuItems[] = [
  {
    id: 1,
    link: "/",
    text: "Home",
  },
  {
    id: 2,
    link: "/dashboard",
    text: "Dashboard",
  },
  {
    id: 3,
    link: "/dashboard/chat",
    text: "Chats",
  },
  {
    id: 4,
    link: "/dashboard/friends",
    text: "Friends",
  },
  {
    id: 5,
    link: "/dashboard/settings",
    text: "Settings",
  },
];
