import type { GuideSection } from "@/types/content";

export const patientGuideSections: GuideSection[] = [
  {
    id: "first-visit",
    title: "First visit",
    summary: "What a first appointment is for, and what it is not.",
    paragraphs: [
      "A first visit is a chance to talk about your vision, have your eyes examined, and leave with a clearer idea of whether you need glasses, monitoring, or further care.",
      "It is not an emergency service and it does not confirm a diagnosis in advance. If you have sudden vision loss, injury, or severe pain, use emergency care instead of waiting for an appointment.",
    ],
    points: [
      "Arrive a little early so registration does not shorten the examination.",
      "Tell the team about diabetes, thyroid disease, previous eye surgery, and medicines.",
      "Say if you are pregnant or if you have had a reaction to eye drops.",
    ],
  },
  {
    id: "what-to-bring",
    title: "What to bring",
    summary: "A short list that makes the visit more useful.",
    paragraphs: [
      "The most helpful items are the ones that show how you see today and what has already been tried.",
    ],
    points: [
      "Current glasses and sunglasses.",
      "Contact lenses and the solution you use, if you wear them.",
      "A list of medicines and eye drops, including the dose.",
      "Previous prescriptions, scan reports, or discharge notes.",
      "The name of the person who should receive updates, if you want someone informed.",
    ],
  },
  {
    id: "preparing",
    title: "Preparing for an eye examination",
    summary: "Simple preparation. No special fasting is usually required for a routine visit.",
    paragraphs: [
      "You can eat and drink as usual unless the clinic has given you different instructions for a procedure. Routine examinations do not need you to stop medicines unless a clinician has told you to.",
      "If you wear contact lenses, ask whether to remove them before the visit. Some measurements are more reliable after lenses have been out for a period the clinic will specify.",
    ],
    points: [
      "Bring a driver if you think dilating drops may be used.",
      "Avoid booking a task that needs sharp near vision immediately afterwards until you know whether drops will be used.",
      "Write down the two or three questions you most want answered.",
    ],
  },
  {
    id: "children",
    title: "Bringing a child",
    summary: "A calmer visit starts before you leave home.",
    paragraphs: [
      "Tell your child that the clinician will look at their eyes with a light and may ask them to identify pictures or letters. Most of the visit is conversation and looking, not an injection.",
      "A familiar adult should stay with the child. If drops are suggested, the clinician should explain them before they are used.",
    ],
    points: [
      "Bring a comfort item for younger children.",
      "Share any concern from school, such as skipping lines while reading.",
      "Mention a turned eye, head tilt, or family history of childhood glasses.",
    ],
  },
  {
    id: "cataract-prep",
    title: "Preparing for a cataract consultation",
    summary: "The consultation decides whether surgery is even being considered.",
    paragraphs: [
      "A cataract consultation reviews how the clouding affects daily tasks, the health of the rest of the eye, and whether an operation is suitable. It is not a booking for surgery by itself.",
      "Bring previous glasses and any reports. Be ready to talk about driving, reading, night glare, and other illnesses. The clinician will explain measurements that may be needed before a procedure, if a procedure is appropriate.",
    ],
  },
  {
    id: "after-procedure",
    title: "After a procedure",
    summary: "Follow the written instructions you were given for your own operation.",
    paragraphs: [
      "People recover differently. Drops, shields, and activity limits are prescribed for a specific procedure and should come from the team that treated you.",
      "The notes below are general reminders only. They are not instructions for your operation, and they do not apply if you have not had a procedure.",
    ],
    points: [
      "Use only the drops prescribed for you.",
      "Ask which symptoms should prompt a same-day call, such as increasing pain or a sudden drop in vision.",
      "Keep the follow-up visit even if the eye feels comfortable.",
      "Do not swim, rub the eye, or restart contact lenses until the clinic says you may.",
    ],
  },
  {
    id: "payment",
    title: "Payment",
    summary: "Fees will be confirmed by the clinic. They are not listed here.",
    paragraphs: [
      "Ask for the consultation fee, and for the cost of extra tests, when you enquire. Insurance, receipts, and accepted payment methods should be confirmed by the reception team before you rely on them.",
      "This draft website does not quote prices and does not claim that any insurer will cover a visit.",
    ],
  },
  {
    id: "cancellation",
    title: "Cancellation",
    summary: "Draft policy — the clinic must approve the notice period.",
    paragraphs: [
      "Please tell the clinic as soon as you know you cannot attend, so the time can be offered to someone else. A final notice period and any fee for late cancellation must be set by the clinic and shared with patients before it is enforced.",
      "Until that policy is approved, do not treat this page as a binding cancellation rule.",
    ],
  },
];
