export function EmptyNote({ children }: { children: string }) {
  return (
    <div className="shell py-14 lg:py-20">
      <p className="max-w-xl text-base leading-relaxed text-white/80">{children}</p>
    </div>
  );
}
