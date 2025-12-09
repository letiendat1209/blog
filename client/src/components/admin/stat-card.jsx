export default function StatCard({ title, value, sub, icon }) {
  return (
    <div className="bg-muted/40 border border-border rounded-xl p-4 flex flex-col gap-1">
      <div className="flex items-center justify-between">
        <span className="text-sm text-muted-foreground">{title}</span>
        {icon}
      </div>
      <span className="text-2xl font-bold">{value}</span>
      <span className="text-xs text-muted-foreground">{sub}</span>
    </div>
  );
}