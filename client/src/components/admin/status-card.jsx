import { CircleCheck } from "lucide-react";

export default function StatusCard({ icon, title, status }) {
  return (
    <div className="group relative rounded-lg border border-green-500/30 bg-card p-4 shadow-sm shadow-green-500/10 transition-all hover:border-green-500/50 hover:shadow-green-500/20">
      {/* Glow effect nền */}
      <div className="absolute inset-0 rounded-lg bg-green-500/5 opacity-0 transition-opacity group-hover:opacity-100" />

      <div className="relative flex items-center gap-3">
        <div className="text-green-400 p-3 rounded-lg bg-green-500/10">
          {icon}
        </div>
        <div className="flex-1">
          <h3 className="font-medium text-card-foreground">{title}</h3>
          <p className="flex items-center gap-1 text-emerald-400 text-sm">
            <CircleCheck size={14} />
            {status}
          </p>
        </div>
      </div>
    </div>
  );
}
