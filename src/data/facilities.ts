import type { Facility } from "@/types/content";

export const facilities: Facility[] = [
  {
    id: "exam-room",
    title: "Examination room",
    description:
      "A consultation room is where the specialist listens, checks vision, and explains findings. The photograph shows an illustrative examination, not this clinic.",
    purpose:
      "Gives space for history taking, vision testing, and a conversation about the next step.",
    image: "/images/hero-exam.jpg",
    imageAlt: "Illustrative photograph of a slit-lamp eye examination.",
    confirmed: false,
  },
  {
    id: "slit-lamp",
    title: "Slit lamp",
    description:
      "A slit lamp is a microscope with a narrow beam of light used to examine the eyelids, cornea, lens, and, with extra lenses, parts of the retina.",
    purpose: "Helps the clinician look at the structures of the eye in detail.",
    image: "/images/slit-lamp.jpg",
    imageAlt: "Illustrative photograph of a slit-lamp microscope.",
    confirmed: false,
  },
  {
    id: "autorefractor",
    title: "Auto refractor",
    description:
      "An auto refractor estimates the focusing prescription. It supports, and does not replace, the refraction performed with you reading a chart.",
    purpose: "Provides a starting measurement before the subjective glasses check.",
    image: "/images/clinician-notes.jpg",
    imageAlt: "Illustrative photograph of a clinician beside diagnostic eye equipment.",
    confirmed: false,
  },
  {
    id: "tonometry",
    title: "Eye pressure measurement",
    description:
      "Eye pressure is one measurement used when assessing glaucoma risk. It can be taken with a contact or non-contact device, depending on the equipment the clinic confirms it uses.",
    purpose: "Adds one piece of information to an optic nerve and visual field assessment.",
    image: null,
    imageAlt: null,
    confirmed: false,
  },
  {
    id: "oct",
    title: "OCT scanner",
    description:
      "Optical coherence tomography creates cross-section images of the retina or optic nerve. It is useful in macular disease, diabetic eye changes, and glaucoma monitoring when the clinic offers it.",
    purpose: "Shows layers of the retina or nerve that are not fully seen on a standard view.",
    image: null,
    imageAlt: null,
    confirmed: false,
  },
  {
    id: "fundus",
    title: "Fundus camera",
    description:
      "A fundus camera photographs the retina. Photographs can be compared over time when diabetic eye disease or other retinal conditions are being monitored.",
    purpose: "Records the appearance of the retina for review and explanation.",
    image: null,
    imageAlt: null,
    confirmed: false,
  },
  {
    id: "visual-field",
    title: "Visual field analyzer",
    description:
      "A visual field test maps side vision. It is commonly used when glaucoma is suspected or being monitored. The clinic must confirm that this test is available on site.",
    purpose: "Detects areas of missing side vision that a reading chart does not show.",
    image: null,
    imageAlt: null,
    confirmed: false,
  },
  {
    id: "theatre",
    title: "Operation theatre",
    description:
      "Some eye procedures are performed in an operating theatre. This photograph is a general theatre interior for illustration. It is not a photograph of TriNetra Netralaya, and theatre access has not been confirmed.",
    purpose: "Provides a sterile setting if the clinic offers procedures that require it.",
    image: "/images/theatre.jpg",
    imageAlt: "Illustrative photograph of a general operating theatre. Not this clinic.",
    confirmed: false,
  },
  {
    id: "optical",
    title: "Optical dispensing",
    description:
      "Glasses and contact lens advice may be offered after an examination. Frame choice, lens options, and fitting should be confirmed with the clinic’s optical service.",
    purpose: "Turns a written prescription into spectacles or a contact lens plan.",
    image: "/images/optical.jpg",
    imageAlt: "Illustrative photograph of eyeglasses.",
    confirmed: false,
  },
];
