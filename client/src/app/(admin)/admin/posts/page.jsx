import { blogs } from "@/data/blog";
import BlogsClient from "./BlogsClient";

export default function Page() {
  return <BlogsClient data={blogs} />;
}
