export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
}) {
  const centered = align === "center";
  return (
    <div className={centered ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      {eyebrow ? <p className="text-sm font-semibold uppercase tracking-[0.16em] text-action">{eyebrow}</p> : null}
      <h2 className="mt-2 text-3xl text-balance md:text-4xl">{title}</h2>
      {description ? <p className="mt-4 text-lg text-muted">{description}</p> : null}
    </div>
  );
}
