export function DraftNotice({ children }: { children: React.ReactNode }) {
  return (
    <p className="rounded-2xl border border-border bg-background-secondary px-4 py-3 text-sm text-foreground">
      <strong className="font-semibold">Draft for clinic review. </strong>
      {children}
    </p>
  );
}

export function IllustrativeNote() {
  return (
    <p className="text-sm text-muted">
      Photographs are illustrative placeholders. They are not pictures of this clinic, its team, or its equipment. Replace them before publication.
    </p>
  );
}

export function SampleBanner({ children }: { children: React.ReactNode }) {
  return (
    <p className="rounded-2xl border border-primary/40 bg-secondary/25 px-4 py-3 text-sm text-foreground">
      <strong className="font-semibold">Sample content. </strong>
      {children}
    </p>
  );
}
