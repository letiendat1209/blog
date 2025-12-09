import StatCard from "@/components/admin/stat-card";
import StatusCard from "@/components/admin/status-card";
import {
  Server,
  Database,
  Mail,
  CircleCheck,
  Image as ImageIcon,
  FileText,
} from "lucide-react";

export default function Page() {
  return (
    <>
      <h2 className="text-2xl font-bold tracking-tight">Dashboard</h2>
      <p className="text-sm text-muted-foreground">Welcome back, Le Tien Dat</p>

      {/* TOP STATUS CARDS */}
      <div className="grid gap-4 md:grid-cols-3 mt-6">
        <StatusCard
          icon={<Server size={20} />}
          title="Backend API"
          status="Operational"
        />
        <StatusCard
          icon={<Database size={20} />}
          title="Database"
          status="Connected"
        />
        <StatusCard
          icon={<Mail size={20} />}
          title="Mail Service"
          status="Active"
        />
      </div>

      {/* STATS GRID */}
      <div className="grid gap-4 md:grid-cols-4">
        <StatCard
          title="Total Blogs"
          value="6"
          sub="6 published, 0 drafts"
          icon={<FileText size={18} />}
        />
        <StatCard
          title="Projects"
          value="8"
          sub="Showcased works"
          icon={<FileText size={18} />}
        />
        <StatCard
          title="Gallery"
          value="14"
          sub="Photos uploaded"
          icon={<ImageIcon size={18} />}
        />
        <StatCard
          title="Published"
          value="6"
          sub="Live articles"
          icon={<CircleCheck size={18} />}
        />
      </div>

      {/* BOTTOM SECTION (CHART AREA) */}
      <div className="grid gap-4 md:grid-cols-2">
        <div className="bg-muted/50 rounded-xl p-4 min-h-[350px] flex items-center justify-center">
          <span className="text-muted-foreground">Chart Placeholder</span>
        </div>
        <div className="bg-muted/50 rounded-xl p-4 min-h-[350px] flex items-center justify-center">
          <span className="text-muted-foreground">Chart Placeholder</span>
        </div>
      </div>
    </>
  );
}
