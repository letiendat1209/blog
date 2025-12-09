import { writeFile } from "fs/promises";

export async function POST(req) {
  const formData = await req.formData();
  const file = formData.get("file");

  if (!file) {
    return new Response("No file", { status: 400 });
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  const fileName = Date.now() + "-" + file.name;

  await writeFile(`./public/uploads/${fileName}`, buffer);

  return Response.json({
    url: `/uploads/${fileName}`,
  });
}
