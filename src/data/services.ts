import type { ClinicService } from "@/types/service";

const education =
  "This page is general education. It does not diagnose a condition or recommend a treatment for you. An eye specialist needs to examine you before advising on care.";

export const services: ClinicService[] = [
  {
    id: "svc-exam",
    slug: "comprehensive-eye-examination",
    title: "Comprehensive Eye Examination",
    shortDescription:
      "A full look at your vision and eye health, with time to explain what the findings mean.",
    description:
      "A comprehensive examination checks how clearly you see, how your eyes focus and work together, and whether the structures of the eye look healthy.",
    image: "/images/hero-exam.jpg",
    imageAlt: "Illustrative photograph of a clinician examining a patient at a slit lamp.",
    icon: "exam",
    category: "Examinations",
    isActive: true,
    featured: true,
    availabilityNote: "Confirm with the clinic that this visit type is offered.",
    overview: `At a comprehensive visit, the clinician asks what has changed, measures vision, and examines the eye from front to back. ${education}`,
    condition:
      "An eye examination is not a disease. It is the assessment used to look for focusing problems, cataract, glaucoma risk, retinal changes, and other findings that a symptom story alone cannot sort out.",
    symptoms: [
      "Blur that does not clear with your current glasses",
      "Headaches or tired eyes after reading or screen work",
      "Difficulty driving at night",
      "A change in vision in one eye",
      "A family history of glaucoma or a personal history of diabetes",
    ],
    causes: [
      "Glasses that no longer match the prescription",
      "Dryness or strain from long near work",
      "Age-related change in the lens",
      "Conditions such as diabetes or high blood pressure that can affect the retina",
      "Medicines that change focus or eye pressure",
    ],
    diagnosis: [
      "A history of symptoms, general health, and medicines",
      "Distance and near vision with and without current glasses",
      "A refraction to refine the prescription",
      "Slit-lamp examination of the front of the eye",
      "A view of the retina, sometimes after dilating drops",
      "Eye pressure and other tests when the findings call for them",
    ],
    treatments: [
      {
        title: "Updated glasses",
        description: "A new prescription when the measurement shows that lenses would help.",
      },
      {
        title: "Monitoring",
        description: "A planned review when a finding needs watching rather than immediate treatment.",
      },
      {
        title: "Further tests or referral",
        description: "Imaging or a visit focused on retina, glaucoma, or another area when the examination points there.",
      },
    ],
    whenToConsult: [
      "Your vision has changed since the last examination.",
      "You are over 40 and have not had a recent check.",
      "You have diabetes, or a parent or sibling with glaucoma.",
      "You have eye pain, sudden blur, or a new shadow in the vision — these need prompt care, not a routine wait.",
    ],
    relatedSlugs: ["cataract-treatment", "glaucoma-care", "contact-lens-optical"],
    faqs: [
      {
        question: "How long does the visit take?",
        answer: "A routine examination often needs 30 to 60 minutes, longer if dilating drops or extra tests are added. The clinic can tell you what to expect when you book.",
      },
      {
        question: "Will drops be used every time?",
        answer: "No. Drops are used when the clinician needs a wider view or a particular measurement. You can ask why a drop is suggested before it is used.",
      },
      {
        question: "Can I get a diagnosis online instead?",
        answer: "No. This page cannot see your eyes. The examination is the diagnosis.",
      },
    ],
    doctorSlugs: ["sample-a"],
  },
  {
    id: "svc-cataract",
    slug: "cataract-treatment",
    title: "Cataract Evaluation and Treatment",
    shortDescription:
      "Assessment of lens clouding, and a clear explanation of when observation or surgery may be discussed.",
    description:
      "A cataract is clouding of the eye’s natural lens. The evaluation looks at how much it affects daily life and whether the rest of the eye is healthy enough for the options being considered.",
    image: "/images/slit-detail.jpg",
    imageAlt: "Illustrative photograph of a slit lamp used to examine the lens.",
    icon: "cataract",
    category: "Treatments",
    isActive: true,
    featured: true,
    availabilityNote: "Surgical availability must be confirmed by the clinic before this page is published as an offered procedure.",
    overview: `Cataract care starts with an examination, not with a decision to operate. The clinician looks at the lens, measures how you see, and talks through whether a change of glasses, monitoring, or surgery fits your situation. ${education}`,
    condition:
      "The lens sits behind the coloured iris and focuses light. When it clouds, vision can become dim, hazy, or glaring, even if the glasses prescription is current. Cataract is common with age and can also follow injury, some medicines, or other eye disease.",
    symptoms: [
      "Gradual blur that glasses do not fully correct",
      "Glare and halos, especially at night",
      "Colours looking faded",
      "Frequent changes in the glasses prescription",
      "Double vision in one eye that goes away when that eye is covered",
    ],
    causes: [
      "Age-related change in lens proteins",
      "Long-term steroid use",
      "Diabetes",
      "Previous eye injury or inflammation",
      "Some cataracts are present from early life",
    ],
    diagnosis: [
      "Vision testing and a discussion of which tasks are affected",
      "Slit-lamp examination of the lens",
      "A look at the retina so another cause of blur is not missed",
      "Measurements of the eye if surgery is being considered",
    ],
    treatments: [
      {
        title: "Observation",
        description: "If the cataract is early and daily tasks are comfortable, review at an interval the clinician suggests.",
      },
      {
        title: "Glasses",
        description: "A prescription update can help for a time. It does not clear the clouding itself.",
      },
      {
        title: "Surgery, when appropriate",
        description: "Cataract surgery removes the cloudy lens and places a clear implant. It is considered when blur interferes with life and the examination shows it is a reasonable option. Risks, lens choices, and recovery are discussed before any decision.",
      },
    ],
    whenToConsult: [
      "Night driving has become uncomfortable because of glare.",
      "You struggle with reading, work, or recognising faces despite current glasses.",
      "Vision in one eye has become noticeably duller.",
      "You have been told a cataract is present and want it explained.",
    ],
    relatedSlugs: ["comprehensive-eye-examination", "retina-care", "glaucoma-care"],
    faqs: [
      {
        question: "Does every cataract need an operation?",
        answer: "No. Many early cataracts are monitored. Surgery is a decision based on how you function and on the health of the eye.",
      },
      {
        question: "Can drops dissolve a cataract?",
        answer: "There is no drop that removes an established cataract. Be wary of products that claim to. An examination is the right next step.",
      },
      {
        question: "Will this clinic perform the surgery?",
        answer: "Only if the clinic confirms that cataract surgery is part of its service. This page explains the pathway. It does not promise that an operating theatre is available.",
      },
    ],
    doctorSlugs: ["sample-a"],
  },
  {
    id: "svc-glaucoma",
    slug: "glaucoma-care",
    title: "Glaucoma Care",
    shortDescription:
      "Assessment and monitoring of the optic nerve, eye pressure, and side vision.",
    description:
      "Glaucoma is a group of conditions that can damage the optic nerve. Early disease is often silent, which is why measurement and follow-up matter.",
    image: "/images/clinician-notes.jpg",
    imageAlt: "Illustrative photograph of a clinician reviewing notes beside eye equipment.",
    icon: "glaucoma",
    category: "Conditions",
    isActive: true,
    featured: true,
    availabilityNote: "Confirm which glaucoma tests and treatments the clinic provides.",
    overview: `Glaucoma care is usually a series of visits, not a single test. Pressure, the optic nerve, and the visual field are looked at together. ${education}`,
    condition:
      "The optic nerve carries visual information to the brain. In glaucoma it can be damaged gradually. Raised eye pressure is an important risk, but some people develop damage even when pressure is in a range that looks ordinary. Angle-closure disease can present more suddenly and is an emergency when pain and blurred vision appear.",
    symptoms: [
      "Often none in early open-angle glaucoma",
      "Missing patches of side vision later in the disease",
      "In acute angle closure: severe eye pain, headache, halos, nausea, and sudden blur — this is urgent",
    ],
    causes: [
      "Poor drainage of fluid inside the eye",
      "A narrow drainage angle",
      "Age and a family history of glaucoma",
      "Previous injury or steroid eye drops",
      "Some people are affected without high pressure",
    ],
    diagnosis: [
      "Eye pressure measurement",
      "Examination of the optic nerve",
      "Gonioscopy to look at the drainage angle, when indicated",
      "Visual field testing",
      "OCT of the nerve fibre layer, if the clinic offers it",
    ],
    treatments: [
      {
        title: "Monitoring",
        description: "Some suspicious findings are watched with repeat tests before treatment starts.",
      },
      {
        title: "Pressure-lowering drops",
        description: "Drops are a common first treatment when the clinician judges that lowering pressure will protect the nerve. They are prescribed for a person, not chosen from a webpage.",
      },
      {
        title: "Laser or surgery",
        description: "Laser or an operation may be discussed if drops are not enough or are not suitable. The clinic must confirm which procedures it offers.",
      },
    ],
    whenToConsult: [
      "A parent or sibling has glaucoma.",
      "You are using steroid drops for a long period.",
      "You have been told your eye pressure or optic nerve looks suspicious.",
      "You have sudden painful vision loss — seek emergency care the same day.",
    ],
    relatedSlugs: ["comprehensive-eye-examination", "retina-care"],
    faqs: [
      {
        question: "If my pressure is normal, am I clear of glaucoma?",
        answer: "Not always. The nerve and the field of vision also matter. A single normal pressure reading is reassuring information, not a complete answer.",
      },
      {
        question: "Can glaucoma be cured?",
        answer: "Existing nerve damage is not reversed. Treatment aims to slow further damage. That is why follow-up matters.",
      },
      {
        question: "May I stop drops when my eyes feel fine?",
        answer: "Do not stop a prescribed drop because the eye feels comfortable. Glaucoma often has no feeling. Ask the clinician before any change.",
      },
    ],
    doctorSlugs: ["sample-b"],
  },
  {
    id: "svc-retina",
    slug: "retina-care",
    title: "Retina and Diabetic Eye Care",
    shortDescription:
      "Examination of the retina, including changes linked with diabetes and macular disease.",
    description:
      "The retina is the light-sensitive layer at the back of the eye. Diabetes, ageing, and other conditions can affect it before vision is badly reduced.",
    image: "/images/eye-detail.jpg",
    imageAlt: "Close photograph of a human eye, used to illustrate retinal care.",
    icon: "retina",
    category: "Conditions",
    isActive: true,
    featured: true,
    availabilityNote: "Retinal imaging and treatment must be confirmed by the clinic. Not every clinic provides injections or retinal surgery.",
    overview: `A retinal visit looks through the pupil, often with dilating drops, and may add photographs or a scan. The goal is to find changes early and explain what needs treatment, referral, or review. ${education}`,
    condition:
      "The macula is the central part of the retina used for reading and recognising faces. It can be affected by diabetes, by age-related macular change, by blockage of a blood vessel, or by a tear that leads toward detachment. Diabetic eye disease may have no symptoms at the stage when treatment is most useful.",
    symptoms: [
      "Blur or a blank patch in the centre of vision",
      "Distorted straight lines",
      "New floaters, flashes, or a curtain coming across the sight",
      "In diabetes, sometimes no symptom at all",
    ],
    causes: [
      "Diabetes, especially when glucose or blood pressure has been high for years",
      "Age-related changes at the macula",
      "High blood pressure and vascular disease",
      "Retinal tears related to the vitreous pulling on the retina",
      "Inflammation or inherited retinal conditions",
    ],
    diagnosis: [
      "Dilated examination of the retina",
      "Retinal photographs when a record is needed",
      "OCT scan of the macula, if available",
      "A discussion with your physician about glucose, blood pressure, and medicines",
    ],
    treatments: [
      {
        title: "Risk-factor care",
        description: "Glucose, blood pressure, and smoking status strongly influence diabetic eye disease. Eye treatment works alongside that medical care.",
      },
      {
        title: "Monitoring",
        description: "Mild changes are often photographed and reviewed on a schedule.",
      },
      {
        title: "Clinic or referral treatment",
        description: "Some macular conditions are treated with injections, laser, or surgery in a setting equipped for them. If this clinic does not provide a particular treatment, it should say so and help with an appropriate referral.",
      },
    ],
    whenToConsult: [
      "You have diabetes and have not had a retinal check in the last year.",
      "Straight lines look bent.",
      "A shadow or curtain appears in the vision — this needs same-day assessment.",
      "You notice a sudden shower of new floaters and flashes.",
    ],
    relatedSlugs: ["comprehensive-eye-examination", "glaucoma-care", "cataract-treatment"],
    faqs: [
      {
        question: "I see well. Do I still need a diabetic eye check?",
        answer: "Yes, if you have diabetes. Sight can be good while early retinal changes are already present.",
      },
      {
        question: "Are floaters always an emergency?",
        answer: "A few long-standing floaters are common. A sudden increase, especially with flashes or a shadow, should be examined promptly because it can be a retinal tear.",
      },
      {
        question: "Will glasses fix distortion?",
        answer: "Glasses sharpen focus. They do not repair a macular problem. Distortion needs an examination of the retina.",
      },
    ],
    doctorSlugs: ["sample-b"],
  },
  {
    id: "svc-pediatric",
    slug: "pediatric-eye-care",
    title: "Pediatric Eye Care",
    shortDescription:
      "Eye examinations for infants, children, and teenagers, with time for parents’ questions.",
    description:
      "Children’s eyes are still developing. A turned eye, a focusing difference, or a problem noticed at school is easier to help when it is found early.",
    image: "/images/pediatric-exam.jpg",
    imageAlt: "Illustrative photograph of a child having a slit-lamp examination.",
    icon: "pediatric",
    category: "Children’s eye care",
    isActive: true,
    featured: true,
    availabilityNote: "Confirm that the clinic sees children and the youngest age it accepts.",
    overview: `A children’s visit is paced for the child. The clinician uses pictures or matching games when letters are not known, and explains any drop before it is used. ${education}`,
    condition:
      "Common reasons for a visit include short sight, long sight, astigmatism, a squint (the eyes not pointing together), a lazy eye (amblyopia), watery eyes, and trouble seen by a teacher. Some children need assessment because they were born early or have a family history of childhood eye disease.",
    symptoms: [
      "Sitting very close to a screen or holding books near the face",
      "An eye that turns in or out, even if only sometimes",
      "Squinting, covering one eye, or a head tilt",
      "Watering, light sensitivity, or a white pupil in photographs",
      "A white pupil reflex needs prompt assessment",
    ],
    causes: [
      "A focusing error",
      "The eyes not working together",
      "A blocked tear duct in infants",
      "Less often, cataract or another condition present from early life",
    ],
    diagnosis: [
      "Observation of how the child looks and follows",
      "Vision testing matched to age",
      "A check for squint",
      "Refraction, sometimes with drops that relax focusing",
      "A look at the retina when cooperation and the question require it",
    ],
    treatments: [
      {
        title: "Glasses",
        description: "The right lenses can sharpen sight and, in some children, help a turned eye.",
      },
      {
        title: "Patching or other amblyopia care",
        description: "When one eye is not learning to see, the clinician may suggest a patch or other treatment for a set period. The plan is individual.",
      },
      {
        title: "Referral",
        description: "Surgery for squint, or care for a rarer condition, is discussed only after examination and only where that service is available.",
      },
    ],
    whenToConsult: [
      "A photo shows a white pupil, or the eye looks cloudy.",
      "An eye turns, or the child closes one eye in bright light.",
      "School has flagged reading or board work.",
      "There is a family history of childhood glasses or squint.",
    ],
    relatedSlugs: ["comprehensive-eye-examination", "contact-lens-optical"],
    faqs: [
      {
        question: "My child cannot read letters. Can they still be examined?",
        answer: "Yes. Infants and young children are examined with looking tests, pictures, and instruments. Reading is not required.",
      },
      {
        question: "Will the visit hurt?",
        answer: "Most of the visit is looking and talking. Drops can sting for a short time. The clinician should explain that before using them.",
      },
      {
        question: "Are screens the cause of every childhood glasses prescription?",
        answer: "Near work and time indoors are linked with short sight becoming more common, but each child’s measurement is individual. An examination is more useful than a screen rule made from a website.",
      },
    ],
    doctorSlugs: ["sample-c"],
  },
  {
    id: "svc-lasik",
    slug: "lasik-vision-correction",
    title: "LASIK and Vision Correction",
    shortDescription:
      "An explanation of laser and lens-based options, and of who needs a suitability assessment first.",
    description:
      "Vision correction procedures aim to reduce dependence on glasses. They are elective, and they are not suitable for every prescription or every eye.",
    image: "/images/optical.jpg",
    imageAlt: "Illustrative photograph of eyeglasses, related to vision correction.",
    icon: "lasik",
    category: "Treatments",
    isActive: true,
    featured: false,
    availabilityNote: "Do not publish this service as available until the clinic confirms it performs or refers for laser or lens procedures.",
    overview: `A vision-correction consultation measures the prescription, the shape and thickness of the cornea, and the health of the eye. Only then is it reasonable to talk about LASIK, another laser procedure, or a lens-based option. ${education}`,
    condition:
      "Short sight, long sight, and astigmatism are focusing errors. Glasses and contact lenses correct them while they are worn. Laser procedures reshape the cornea. Some people are better served by a lens implant, and some are better served by staying with glasses.",
    symptoms: [
      "Dependence on glasses for distance or reading",
      "Contact lens discomfort",
      "A wish to understand whether a procedure is even possible",
    ],
    causes: [
      "The length of the eye and the curve of the cornea determine much of the prescription",
      "The prescription can still be changing in younger adults",
      "Dry eye, thin corneas, or keratoconus can make laser unsuitable",
    ],
    diagnosis: [
      "A stable glasses measurement",
      "Corneal mapping and thickness",
      "A dry-eye assessment",
      "A dilated examination so the retina is not overlooked",
      "A frank talk about expectations, night vision, and the chance of still needing glasses",
    ],
    treatments: [
      {
        title: "Glasses or contact lenses",
        description: "These remain appropriate care for many people, including people who are not candidates for a procedure.",
      },
      {
        title: "Laser procedures",
        description: "LASIK and surface laser procedures are options only when measurements are suitable. They have risks, including dry eye and the need for a further procedure.",
      },
      {
        title: "Lens-based options",
        description: "A lens exchange or an implant may be discussed for some prescriptions, usually after a separate consent conversation.",
      },
    ],
    whenToConsult: [
      "Your prescription has been stable and you want a realistic opinion.",
      "Contact lenses are no longer comfortable.",
      "You have been told you have keratoconus or an unstable prescription — you need assessment before considering laser.",
    ],
    relatedSlugs: ["comprehensive-eye-examination", "cornea-care", "contact-lens-optical"],
    faqs: [
      {
        question: "Is LASIK guaranteed to remove glasses?",
        answer: "No. Many people rely on glasses much less, and some still need them for particular tasks or later for reading. A consultation should quote a range, not a promise.",
      },
      {
        question: "Am I a candidate because my prescription is small?",
        answer: "A small prescription is only one factor. Corneal shape, dryness, age, and eye health decide suitability.",
      },
      {
        question: "Does this clinic perform laser surgery?",
        answer: "Treat this page as educational until the clinic confirms the procedure and the facility. The availability note on this page is there for that reason.",
      },
    ],
    doctorSlugs: ["sample-d", "sample-a"],
  },
  {
    id: "svc-cornea",
    slug: "cornea-care",
    title: "Cornea Care",
    shortDescription:
      "Assessment of the clear front window of the eye, including injury, infection, and shape disorders.",
    description:
      "The cornea focuses light and protects the eye. Pain, light sensitivity, or a sudden white spot need an examination rather than a leftover drop from home.",
    image: "/images/slit-lamp.jpg",
    imageAlt: "Illustrative photograph of a slit lamp used to examine the cornea.",
    icon: "cornea",
    category: "Conditions",
    isActive: true,
    featured: false,
    availabilityNote: "Confirm corneal services, including whether emergency review and transplant referral are offered.",
    overview: `Corneal problems are examined at the slit lamp, sometimes with a dye that shows scratches. Treatment depends on whether the cause is dryness, a poorly fitting lens, infection, inflammation, or a change in corneal shape. ${education}`,
    condition:
      "The cornea is the clear dome at the front of the eye. A scratch, a contact-lens-related infection, keratoconus, and some inherited or inflammatory diseases all affect it in different ways. A red, painful eye with reduced vision can be an infection that needs same-day care.",
    symptoms: [
      "Pain, grit, or light sensitivity",
      "Redness with blur",
      "A white spot on the cornea",
      "Vision that changes through the day",
      "Ghosting or distortion, especially in keratoconus",
    ],
    causes: [
      "Trauma or a foreign body",
      "Contact lens overwear or sleeping in lenses",
      "Infection",
      "Severe dryness",
      "Keratoconus and other thinning disorders",
    ],
    diagnosis: [
      "Slit-lamp examination, often with fluorescein dye",
      "A check of contact lens hygiene and wear schedule",
      "Corneal mapping when shape is in question",
      "Culture or referral if infection is suspected and the clinic’s protocol requires it",
    ],
    treatments: [
      {
        title: "Remove the cause",
        description: "A foreign body, a damaged lens, or an unsuitable drop may need to be stopped or removed by a clinician.",
      },
      {
        title: "Prescribed treatment",
        description: "Antibiotic, lubricating, or anti-inflammatory drops are chosen after examination. Steroid drops can harm an infected cornea if used without a diagnosis.",
      },
      {
        title: "Specialty care",
        description: "Cross-linking, specialty contact lenses, or transplant referral may be discussed for keratoconus or scarring. Availability must be confirmed.",
      },
    ],
    whenToConsult: [
      "The eye is painful and light hurts after contact lens wear.",
      "Vision drops in a red eye.",
      "You were told you have keratoconus.",
      "A chemical entered the eye — irrigate immediately and seek emergency care.",
    ],
    relatedSlugs: ["dry-eye-care", "contact-lens-optical", "comprehensive-eye-examination"],
    faqs: [
      {
        question: "Can I use a relative’s antibiotic drop?",
        answer: "No. The wrong drop can worsen an infection or delay the right treatment. Have the eye examined.",
      },
      {
        question: "Is a corneal scratch serious?",
        answer: "Many scratches heal, and some do not. Contact lens wearers in particular should be examined because infection can look similar at the start.",
      },
      {
        question: "Does every corneal scar need a transplant?",
        answer: "No. Many scars are observed or managed with glasses or specialty lenses. Transplant is a later discussion for selected eyes.",
      },
    ],
    doctorSlugs: ["sample-d"],
  },
  {
    id: "svc-dry-eye",
    slug: "dry-eye-care",
    title: "Dry Eye Care",
    shortDescription:
      "A practical assessment of irritated, watery, or tired eyes, including the role of screens and lids.",
    description:
      "Dry eye is a disturbance of the tear film. It can sting, blur vision for a moment, or paradoxically water. Treatment is matched to the type of dryness.",
    image: "/images/eye-detail.jpg",
    imageAlt: "Close photograph of an eye, used to illustrate the tear film and ocular surface.",
    icon: "dry-eye",
    category: "Conditions",
    isActive: true,
    featured: false,
    availabilityNote: "Confirm which dry-eye treatments the clinic actually offers.",
    overview: `Dry-eye care looks at tears, the eyelids, the environment, and medicines. Simple changes help many people. Others need prescribed treatment. ${education}`,
    condition:
      "Tears need enough water, oil, and mucin, and they need a lid that spreads them. When that balance fails, the surface of the eye becomes uncomfortable. Air conditioning, screen use, contact lenses, some medicines, and eyelid inflammation are frequent contributors. Dry eye is also more common after some eye procedures.",
    symptoms: [
      "Burning, grit, or tired eyes",
      "Blur that clears with a blink",
      "Watering, especially outdoors",
      "Discomfort in air conditioning or after long screen use",
      "Contact lenses that used to be comfortable and no longer are",
    ],
    causes: [
      "Reduced watery tears",
      "Oil-gland blockage along the eyelid",
      "Incomplete blinking during screen work",
      "Medicines such as some antihistamines",
      "Autoimmune disease, which the clinician may ask about",
    ],
    diagnosis: [
      "A history of the pattern through the day",
      "Slit-lamp examination of the tear film and cornea",
      "A look at the eyelid margins",
      "Dye tests that show how quickly tears break up or whether the surface is stained",
    ],
    treatments: [
      {
        title: "Habits and lubricants",
        description: "Planned breaks, humidifying a dry room, and preservative-free lubricants help many people. The clinician can suggest how often to use them.",
      },
      {
        title: "Eyelid care",
        description: "Warm compresses and lid cleaning are used when oil glands are blocked. The technique should be shown, not guessed.",
      },
      {
        title: "Prescribed options",
        description: "Anti-inflammatory drops, plugs, or other treatments are considered when lubricants are not enough. They are not the starting point for every person.",
      },
    ],
    whenToConsult: [
      "Comfort drops are no longer enough for work or driving.",
      "Vision fluctuates through the day.",
      "You have a painful red eye — do not assume it is only dryness.",
      "You are about to consider laser vision correction and have dry-eye symptoms.",
    ],
    relatedSlugs: ["cornea-care", "contact-lens-optical", "lasik-vision-correction"],
    faqs: [
      {
        question: "Why does a dry eye water?",
        answer: "Irritation can trigger reflex tears that do not stick to the eye well. Watering does not rule out dryness.",
      },
      {
        question: "Are all artificial tears the same?",
        answer: "No. Some contain preservatives that sting when used often. Ask which product fits how frequently you need it.",
      },
      {
        question: "Can I treat this only with a website plan?",
        answer: "General habits are reasonable. Pain, light sensitivity, or a drop in vision needs an examination so infection or another cause is not missed.",
      },
    ],
    doctorSlugs: ["sample-d"],
  },
  {
    id: "svc-optical",
    slug: "contact-lens-optical",
    title: "Contact Lens and Optical Services",
    shortDescription:
      "Prescription glasses, lens advice, and contact lens checks after an eye examination.",
    description:
      "Optical care turns an examination into glasses or contact lenses that are comfortable and appropriate for how you use your eyes.",
    image: "/images/optical.jpg",
    imageAlt: "Photograph of eyeglasses resting on a book.",
    icon: "optical",
    category: "Optical",
    isActive: true,
    featured: false,
    availabilityNote: "Confirm whether glasses are dispensed on site and which contact lenses are offered.",
    overview: `An optical visit should start from a current examination, not from a frame you liked online. The prescription, the lens design, and the fit all change how well you see. ${education}`,
    condition:
      "Glasses correct focus while they are worn. Contact lenses do the same on the surface of the eye, which means fit, oxygen, and hygiene matter as much as the prescription. A lens that is slightly wrong can be uncomfortable or, if misused, unsafe.",
    symptoms: [
      "Glasses that slide, pinch, or leave you looking over the top",
      "Contact lenses that dry out by afternoon",
      "Blur in one lens of a pair",
      "A need for reading help after age 40 while distance glasses still work",
    ],
    causes: [
      "A prescription that has changed",
      "A frame that is bent or the wrong size",
      "Lenses chosen for a different working distance",
      "Overwear of contact lenses or poor replacement habits",
    ],
    diagnosis: [
      "Review of the written prescription and when it was measured",
      "A fit check of the frame or contact lens on the eye",
      "A vision check with the new lenses",
      "A corneal check for contact lens wearers",
    ],
    treatments: [
      {
        title: "Spectacles",
        description: "Single vision, bifocal, or progressive lenses are chosen around your work and reading distance. The dispenser should explain the adaptation.",
      },
      {
        title: "Contact lenses",
        description: "A trial lens, teaching on insertion and removal, and a review of the cornea are part of a proper fitting. Sleeping in lenses that are not approved for overnight wear raises the risk of infection.",
      },
      {
        title: "Review",
        description: "Return if a new pair causes persistent headache, double vision, or pain. A small adjustment often solves a glasses problem. Pain in a contact lens wearer should be examined.",
      },
    ],
    whenToConsult: [
      "Your glasses are more than one to two years old and vision has changed.",
      "You want contact lenses for the first time.",
      "A lens hurts, or the eye is red while wearing it — remove the lens and seek care.",
      "You need a spare pair for driving or work.",
    ],
    relatedSlugs: ["comprehensive-eye-examination", "dry-eye-care", "pediatric-eye-care"],
    faqs: [
      {
        question: "Can I order contact lenses from my glasses prescription?",
        answer: "No. A contact lens prescription includes the curve and diameter of the lens. It is measured on the eye.",
      },
      {
        question: "How long do glasses last?",
        answer: "The frame can last longer than the prescription. Have the prescription reviewed if vision changes or at the interval the clinician suggested.",
      },
      {
        question: "Are sunglasses part of eye care?",
        answer: "Lenses that block ultraviolet light protect the eyes outdoors. They do not replace an examination. Ask the optical team which tint suits driving.",
      },
    ],
    doctorSlugs: ["sample-a", "sample-d"],
  },
];
