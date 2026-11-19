"use client";

export function ShareButtons({ title }: { title: string }) {
  function openShare(target: "whatsapp" | "facebook" | "linkedin") {
    const url = window.location.href;
    const href =
      target === "whatsapp"
        ? `https://wa.me/?text=${encodeURIComponent(`${title} ${url}`)}`
        : target === "facebook"
          ? `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`
          : `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
    window.open(href, "_blank", "noopener,noreferrer");
  }

  return (
    <div className="flex flex-wrap gap-3">
      <button type="button" className="inline-flex h-10 items-center rounded-xl border border-border px-3 text-sm font-semibold" onClick={() => openShare("whatsapp")}>
        Share on WhatsApp
      </button>
      <button type="button" className="inline-flex h-10 items-center rounded-xl border border-border px-3 text-sm font-semibold" onClick={() => openShare("facebook")}>
        Share on Facebook
      </button>
      <button type="button" className="inline-flex h-10 items-center rounded-xl border border-border px-3 text-sm font-semibold" onClick={() => openShare("linkedin")}>
        Share on LinkedIn
      </button>
    </div>
  );
}
