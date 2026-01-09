export const AuthSkeleton = () => {
  return (
    <div className="flex items-center gap-3">
      <div className="w-8 h-8 rounded-full bg-muted animate-pulse" />
      <div className="w-20 h-4 rounded bg-muted animate-pulse hidden sm:block" />
      <div className="w-16 h-8 rounded bg-muted animate-pulse" />
    </div>
  );
};
