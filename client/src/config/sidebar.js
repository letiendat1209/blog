import { HardDriveUploadIcon } from "lucide-react";
import { Group } from "lucide-react";
import {
  Home,
  FileText,
  Tag,
  MessageSquare,
  Users,
  Settings,
} from "lucide-react";

export const SidebarItems = {
  user: {
    name: "Admin",
    email: "admin@example.com",
    avatar: "/avatars/admin.png",
  },

  navMain: [
    {
      title: "Dashboard",
      url: "/admin",
      icon: Home,
      isActive: true,
      items: [],
    },
    {
      title: "Posts",
      url: "/admin/posts",
      icon: FileText,
      items: [
        { title: "All Posts", url: "/admin/posts" },
        { title: "Add New", url: "/admin/posts/new" },
        { title: "Categories", url: "/admin/posts/categories" },
        { title: "Tags", url: "/admin/posts/tags" },
      ],
    },
    {
      title: "Comment",
      url: "/admin/comments",
      icon: Group,
      items: [],
    },
    {
      title: "Comments",
      url: "/admin/comments",
      icon: MessageSquare,
      items: [],
    },
    {
      title: "Users",
      url: "/admin/users",
      icon: Users,
      items: [
        { title: "All Users", url: "/admin/users" },
        { title: "Add New", url: "/admin/users/new" },
        { title: "Groups", url: "/admin/users/groups" },
      ],
    },
    {
      title: "Settings",
      url: "/admin/settings",
      icon: Settings,
      items: [],
    },
    {
      title: "Media",
      url: "/admin/media",
      icon: HardDriveUploadIcon,
      items: [],
    }
  ],
};
