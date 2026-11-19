export interface ClinicPhoto {
  id: string;
  src: string;
  alt: string;
  caption: string;
}

export const clinicPhotos: ClinicPhoto[] = [
  {
    id: "neuro-therapy-child",
    src: "/images/gallery/neuro-therapy-child.png",
    alt: "Before and after photographs of a child’s eyes, labeled after neuro vision therapy.",
    caption: "Before and after neuro vision therapy.",
  },
  {
    id: "neuro-therapy-adult",
    src: "/images/gallery/neuro-therapy-adult.png",
    alt: "Before and after photographs of an adult’s eyes, labeled after neuro vision therapy.",
    caption: "Before and after neuro vision therapy.",
  },
  {
    id: "vision-therapy-adult",
    src: "/images/gallery/vision-therapy-adult.png",
    alt: "Before and after photographs of an adult’s eyes, labeled after vision therapy.",
    caption: "Before and after vision therapy.",
  },
  {
    id: "trial-frame",
    src: "/images/gallery/trial-frame-examination.png",
    alt: "A person wearing a trial frame during an eye examination at the clinic.",
    caption: "An eye examination with a trial frame.",
  },
  {
    id: "vision-therapy-board",
    src: "/images/gallery/vision-therapy-board.png",
    alt: "A child at the clinic holding a board that reads I love vision therapy.",
    caption: "A child at the clinic, holding a board that reads “I love vision therapy.”",
  },
  {
    id: "clinic-with-children",
    src: "/images/gallery/clinic-with-children.jpg",
    alt: "Nikita KC seated with two children beside a slit lamp.",
    caption: "Nikita KC with two children beside a slit lamp.",
  },
];
