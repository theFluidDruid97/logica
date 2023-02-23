import { faker } from '@faker-js/faker'

export const airmanTrainings = []

export const trainings = [
  {
    name: 'Sig Sauer M18',
    duration: 6,
    link: 'https://www.sigsaueracademy.com/productdisplay/sig-sauer-m18',
    description:
      'This program content focuses on the mechanical functioning, disassembly/reassembly, maintenance, troubleshooting, and field repair of the M18 variant of the Modular Handgun System.',
  },
  {
    name: 'Colt M4',
    duration: 6,
    link: 'https://dag-usa.com/courses/military-law-enforcement/m4-operator-course',
    description:
      'Maximize your proficiency, tactical skills, and weapons handling with live fire drills that are intense, realistic and physically demanding. When you graduate this course, you will be confident and proficient in your marksmanship and weapons handling skills.',
  },
  {
    name: 'FN M240B',
    duration: 12,
    link: 'https://fnamerica.com/training/courses/fn-m240-armorer-course/',
    description:
      'Explain and demonstrate the removal, disassembly, repair and/or replacement of component parts. Conduct the appropriate inspection, gauging and adjustment of the FNÂ® M240.',
  },
  {
    name: 'Cyber Awareness',
    duration: 12,
    link: 'https://public.cyber.mil/training/cyber-awareness-challenge/',
    description:
      'The purpose of the Cyber Awareness Challenge is to influence behavior, focusing on actions that authorized users can engage to mitigate threats and vulnerabilities to DoD Information Systems. This training is current, designed to be engaging, and relevant to the user.',
  },
  {
    name: 'Controlled Unclassified Information (CUI)',
    duration: 12,
    link: 'https://lms-jets.cce.af.mil/moodle/course/view.php?id=11998',
    description:
      'Provides awareness training for designating CUI, relevant CUI categories, the CUI registry, associated markings, and applicable safeguarding, dissemination, and decontrolling policies and procedures.',
  },
  {
    name: 'Collect and Report Information',
    duration: 24,
    link: 'https://lms-jets.cce.af.mil/moodle/course/view.php?id=10305',
    description:
      "Provides an overview of types of information that are important in a deployed environment and methods of reporting this information. Specific topics that are highlighted for the student's awareness include Commander's Critical Information Requirements, Priority Information Requirements, visual observation techniques, and formats for up-channeling suspicious events, hostile activity and combat status.",
  },
  {
    name: 'Force Protection',
    duration: 24,
    link: 'https://lms-jets.cce.af.mil/moodle/course/view.php?id=12739',
    description:
      'Provides you with general force protection awareness-level training (Preventive measures taken to mitigate hostile actions against DoD Personnel, to include family members, resources, facilities, and critical information.)',
  },
  {
    name: 'Law of War',
    duration: 24,
    link: 'https://lms-jets.cce.af.mil/moodle/course/view.php?id=12609',
    description:
      'This training area describes the Law of War, principles, rules for Airmen, and how these principles are practically applied to contemporary conflicts.',
  },
  {
    name: 'Religious Freedom Training',
    duration: 36,
    link: 'https://lms-jets.cce.af.mil/moodle/course/view.php?id=13018',
    description:
      'The Total Force Awareness Training Religious Freedom Training (RFT) is a new course that replaces both the Free Exercise of Religion and Free Exercise of Religion for Supervisors Courses. Following the Introduction, it includes training on: Terms and Definitions, Guidance, and Religious Accommodation.',
  },
  {
    name: 'DoD Combating Trafficking in Persons (CTIP) General Awareness Course',
    duration: 600,
    link: 'https://lms-jets.cce.af.mil/moodle/course/view.php?id=12005',
    description:
      'The Combating Trafficking in Persons General Awareness course is designed for all DoD personnel. This course provides information regarding policy and laws applicable to Trafficking in Persons.',
  },
]

export const status = ['Current', 'Due', 'Overdue']

const repeat = (func, times) => {
  func()
  times && --times && repeat(func, times)
}
const createAssignedTraining = () => {

  airmanTrainings.push({
    // airman: [],
    airmanId: faker.datatype.number({
      min: 1,
      max: 101,
      allowLeadingZeros: false,
    }),
    // training: [],
    trainingId: faker.datatype.number({
      min: 1,
      max: 10,
      allowLeadingZeros: false,
    }),
    status: faker.helpers.arrayElement(status),
    start: faker.date.between('2020-01-01T00:00:00.000Z', '2023-02-21T00:00:00.000Z'),
    end: faker.date.between('2020-01-01T00:00:00.000Z', '2023-02-21T00:00:00.000Z'),
  })
  // console.log("CAT", airmanTrainings)
}


 repeat(createAssignedTraining, 65)