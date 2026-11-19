import type { PolicySection } from "@/types/content";

export const privacySections: PolicySection[] = [
  {
    heading: "Review before publication",
    paragraphs: [
      "This privacy policy is a structured draft for VisionCare Eye Clinic. It must be reviewed and approved by the clinic, and adapted to the laws that apply in Nepal, before the website is used to collect patient information.",
    ],
  },
  {
    heading: "Who this policy covers",
    paragraphs: [
      "This policy describes information collected through the public website, including the contact form and appointment enquiry. Clinical records created during a visit are held by the clinic under its own medical-record practice and are not stored in this website.",
    ],
  },
  {
    heading: "Information the website may collect",
    paragraphs: [
      "If you use the contact form, you may provide your name, phone number, an optional email address, a subject, and a message. The appointment enquiry asks for a preferred service, an optional doctor, your name, mobile number, a preferred date and time, whether you have visited before, and an optional note.",
      "Please do not send diagnoses, eye photographs, identity documents, or detailed medical history through the general contact form.",
    ],
  },
  {
    heading: "Why information is collected",
    paragraphs: [
      "Contact details are used to reply to a question or to confirm whether an appointment time is available. They are not used by this website to make a diagnosis or to build a marketing profile.",
    ],
  },
  {
    heading: "How messages are delivered",
    paragraphs: [
      "When a form endpoint is configured, the contact form is forwarded to that service so the clinic can read it. When it is not configured, the form does not pretend to send. Appointment enquiries can be handed to WhatsApp so you send the message yourself from your own account.",
      "The website does not store these submissions in a clinic database of its own.",
    ],
  },
  {
    heading: "Third-party services",
    paragraphs: [
      "The site can connect to WordPress for articles, a form delivery service, WhatsApp, Google Maps, and a future clinic API. Each service receives only what is needed for that feature. Their own privacy terms apply once information reaches them.",
    ],
  },
  {
    heading: "Analytics",
    paragraphs: [
      "No analytics product is installed by default. If the clinic later adds analytics, this policy should name the provider, the data it receives, and how a visitor can opt out.",
    ],
  },
  {
    heading: "Protection and retention",
    paragraphs: [
      "Messages should be accessed only by people who need them to respond. The clinic should decide how long enquiries are kept, who can read them, and when they are deleted. Those decisions are not yet configured in this website.",
    ],
  },
  {
    heading: "Your choices",
    paragraphs: [
      "You may ask the clinic what contact information it holds from a website enquiry, request a correction, or ask for deletion where the law allows. Medical records may be kept for a period the clinic is required to observe. Use the contact details published on the contact page.",
    ],
  },
  {
    heading: "Contact",
    paragraphs: [
      "Privacy questions can be sent to the email address, phone number, or WhatsApp number published on the contact page.",
    ],
  },
];

export const termsSections: PolicySection[] = [
  {
    heading: "Review before publication",
    paragraphs: [
      "These terms are a draft for the public website. The clinic should approve them before launch. They cover use of the website, not the contract for a medical visit.",
    ],
  },
  {
    heading: "Using the website",
    paragraphs: [
      "You may read the pages for general information about the clinic and its services. You may send an enquiry using the contact details provided. You may not misuse the site, attempt to disrupt it, or present its content as your own medical service.",
    ],
  },
  {
    heading: "Content",
    paragraphs: [
      "Educational text is written for the general public. Photographs marked as illustrative are not photographs of this clinic. Sample doctor profiles and sample testimonials are layout content and are not claims about real clinicians or real patients.",
      "The clinic, or its licensors, will own the final text, logo, and original photographs once they replace the demonstration content.",
    ],
  },
  {
    heading: "Acceptable use",
    paragraphs: [
      "Do not send abusive, misleading, or unlawful messages. Do not upload another person’s medical information. Do not attempt to access non-public areas of the hosting environment.",
    ],
  },
  {
    heading: "Third-party links",
    paragraphs: [
      "Links to maps, WhatsApp, social networks, and the article system leave this website. Those services are responsible for their own content and availability.",
    ],
  },
  {
    heading: "Availability",
    paragraphs: [
      "The website is provided as a convenience. Pages may be updated or briefly unavailable during maintenance. A failure of the website is not a failure of emergency care, because the website is not an emergency service.",
    ],
  },
  {
    heading: "Appointment enquiries",
    paragraphs: [
      "Sending an enquiry does not create an appointment, a doctor–patient relationship, or a promise that a particular clinician is available. The relationship for care begins when the clinic accepts you for a visit under its own clinical process.",
    ],
  },
  {
    heading: "Your responsibilities",
    paragraphs: [
      "Provide a phone number the clinic can actually reach. Read the medical disclaimer. Seek urgent care for urgent symptoms rather than waiting on a form.",
    ],
  },
];

export const disclaimerSections: PolicySection[] = [
  {
    heading: "Educational information",
    paragraphs: [
      "The articles, service pages, and patient guide explain eye care in general language. They are here to help you prepare for a conversation with a qualified professional.",
    ],
  },
  {
    heading: "Not a consultation",
    paragraphs: [
      "Nothing on this website is a medical consultation, a diagnosis, a prescription, or a personal treatment plan. Two people with similar symptoms can need different care. Only an examination can sort that out.",
    ],
  },
  {
    heading: "No diagnosis from a form or article",
    paragraphs: [
      "Contact forms, WhatsApp messages, and search boxes cannot examine an eye. Do not decide to start, stop, or change medicine because of something you read here.",
    ],
  },
  {
    heading: "When to see a professional",
    paragraphs: [
      "Book an examination for gradual changes in vision, trouble reading, eye strain, or a condition your physician has asked you to monitor. Bring your questions to that visit.",
    ],
  },
  {
    heading: "Urgent symptoms",
    paragraphs: [
      "Sudden vision loss, severe eye pain, injury, a chemical in the eye, or a new curtain across the vision needs prompt in-person care. Go to emergency services or the nearest emergency department.",
    ],
  },
  {
    heading: "Website messages are not emergency care",
    paragraphs: [
      "The contact form and appointment enquiry are checked during clinic hours once they are connected. They do not page a doctor overnight. Do not use them as a substitute for emergency services.",
    ],
  },
];

export const accessibilitySections: PolicySection[] = [
  {
    heading: "Our aim",
    paragraphs: [
      "VisionCare Eye Clinic wants this website to be usable by people with low vision, by people who navigate with a keyboard, and by people using screen readers. The target is WCAG 2.2 Level AA.",
    ],
  },
  {
    heading: "What you should find",
    paragraphs: [
      "Pages use headings in order, visible focus, labels on form fields, and text that can be resized by the browser. Colour is not the only way information is shown. The mobile menu can be closed with the Escape key.",
    ],
  },
  {
    heading: "Known limits",
    paragraphs: [
      "Some photographs are illustrative and will be replaced. The contact map is loaded from OpenStreetMap, and articles are loaded from WordPress. If clinic coordinates have not been added, a text alternative is shown instead of a map pin.",
    ],
  },
  {
    heading: "Tell us about a barrier",
    paragraphs: [
      "If a page is hard to use, contact the clinic by phone, email, or the contact form and describe the page and the problem. A useful report includes the browser you used and what you expected to happen. The clinic should provide an alternative way to get the same information while the issue is fixed.",
    ],
  },
];
