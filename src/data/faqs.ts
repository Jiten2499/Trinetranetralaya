import type { FaqItem } from "@/types/content";

export const faqs: FaqItem[] = [
  {
    id: "exam-why",
    category: "General Eye Care",
    question: "How often should I have an eye examination?",
    answer:
      "Many adults benefit from a routine eye examination every one to two years, and sooner if vision changes, diabetes, glaucoma risk, or new symptoms appear. The eye specialist will suggest a follow-up interval after examining you. This website cannot set a personal schedule.",
  },
  {
    id: "symptoms-urgent",
    category: "General Eye Care",
    question: "Which eye symptoms need prompt attention?",
    answer:
      "Sudden loss of vision, a curtain or shadow in the vision, flashes with a new shower of floaters, severe eye pain, a chemical splash, or an injury should be assessed urgently. Contact emergency services or the nearest emergency department. Do not wait for a reply to a website form.",
  },
  {
    id: "screen-strain",
    category: "General Eye Care",
    question: "Can screens damage my eyes?",
    answer:
      "Long screen use often causes tiredness, dryness, and temporary blur because people blink less and focus at one distance. Breaks, comfortable lighting, and a full eye examination help sort strain from a focusing problem or another condition. Screens have not been shown to cause a single disease that this page can diagnose.",
  },
  {
    id: "book-how",
    category: "Appointments",
    question: "How do I request an appointment?",
    answer:
      "Use the appointment page to prepare an enquiry and send it through WhatsApp, or call and email the clinic. The message is a request only. The clinic confirms the time after checking the diary.",
  },
  {
    id: "book-confirm",
    category: "Appointments",
    question: "Is my appointment confirmed when I submit the form?",
    answer:
      "No. The website does not reserve a clinic slot. A team member needs to confirm the date, time, and clinician. Please wait for that confirmation before travelling.",
  },
  {
    id: "bring-what",
    category: "Appointments",
    question: "What should I bring to my visit?",
    answer:
      "Bring current glasses or contact lenses, a list of eye drops and medicines, any previous eye reports, and a way to pay if the clinic has shared its fees. Parents should bring a child’s previous prescription if they have one.",
  },
  {
    id: "exam-length",
    category: "Eye Examinations",
    question: "What happens during a comprehensive eye examination?",
    answer:
      "The visit usually includes a conversation about symptoms and health, a vision check, and a look at the front and back of the eye. Drops that widen the pupil are sometimes needed. The specialist explains the findings and whether glasses, monitoring, or treatment should be considered.",
  },
  {
    id: "drops-drive",
    category: "Eye Examinations",
    question: "Will I be able to drive after the examination?",
    answer:
      "Dilating drops can blur near vision and increase light sensitivity for several hours. If drops are likely, arrange a driver or extra time. The clinic will tell you on the day if driving is unwise.",
  },
  {
    id: "glasses-same-day",
    category: "Eye Examinations",
    question: "Will I get glasses on the same day?",
    answer:
      "A prescription can often be written after the examination. Making the glasses depends on the optical workshop and the lenses chosen. The clinic will explain the timeline when optical services are available.",
  },
  {
    id: "surgery-decide",
    category: "Treatments",
    question: "Does the website tell me whether I need surgery?",
    answer:
      "No. Surgery is considered only after an examination, a discussion of benefits and risks, and your own circumstances. Articles on this website explain common approaches so you can prepare questions. They are not a recommendation for you.",
  },
  {
    id: "cataract-wait",
    category: "Treatments",
    question: "When is a cataract usually treated?",
    answer:
      "A cataract is treated when the clouding affects everyday tasks enough to matter to you, and when an examination shows that surgery is appropriate. Some people are monitored. Only the examining clinician can advise on timing.",
  },
  {
    id: "child-age",
    category: "Children’s Eye Health",
    question: "When should a child have an eye check?",
    answer:
      "Children can be examined from infancy when a parent, teacher, or pediatrician notices a concern, and many children are screened in the early school years. A turned eye, squinting, sitting very close to screens, or a family history of childhood eye problems are reasons to book sooner.",
  },
  {
    id: "child-drops",
    category: "Children’s Eye Health",
    question: "Are eye drops used for children?",
    answer:
      "Drops are sometimes used to measure focusing or to view the retina. The clinician explains why a drop is suggested and what to expect. You can ask questions before anything is put in your child’s eyes.",
  },
  {
    id: "fees",
    category: "Payments and Clinic Information",
    question: "How much does a visit cost?",
    answer:
      "Fees are not published on this website until the clinic confirms them. Please ask when you enquire. Bring the payment method the clinic requests, and ask for a receipt.",
  },
  {
    id: "cancel",
    category: "Payments and Clinic Information",
    question: "How do I cancel or change an appointment?",
    answer:
      "Contact the clinic by phone, email, or WhatsApp as early as you can. The cancellation notice period will be confirmed by the clinic and should not be assumed from this draft website.",
  },
  {
    id: "records",
    category: "Payments and Clinic Information",
    question: "Do contact forms store my medical record?",
    answer:
      "The general contact form is for practical questions. Please do not send diagnoses, photos of your eyes, or detailed medical history through it. Appointment enquiries collect only the details needed to request a visit. Clinical records are created at the clinic, not in your browser.",
  },
];

export const faqCategories = [
  "General Eye Care",
  "Appointments",
  "Eye Examinations",
  "Treatments",
  "Children’s Eye Health",
  "Payments and Clinic Information",
] as const;
