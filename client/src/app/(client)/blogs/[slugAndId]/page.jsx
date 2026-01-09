import SingleBlogClient from "./SingleBlogClient";

export default async function Page({ params }) {
  const { slugAndId } = await params;

  if (!slugAndId) return null;

  return <SingleBlogClient slugAndId={slugAndId} />;
}
