import { Button } from "@/components/ui/button";
import { FilePen } from "lucide-react";
import { useRouter } from "next/navigation";

export function PostsPrimaryButtons() {
  const router = useRouter();
  return (
    <div className="flex gap-2">
      <Button className="space-x-1" onClick={() => router.push("/admin/posts/create")}>
        <span>Write New Post</span> <FilePen size={18} />
      </Button>
    </div>
  );
}
