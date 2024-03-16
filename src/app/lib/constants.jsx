export const navLinks = [
  {
    title: 'About',
    path: '#about',
  },
  {
    title: 'Skills',
    path: '#skills',
  },
  {
    title: 'Contact',
    path: '#contact',
  },
];

export const achivementsList = [
  {
    metric: 'years',
    value: '10',
    prefix: '',
    suffix: '+',
  },
  {
    metric: 'certifications',
    value: '5',
    prefix: '',
    suffix: '+',
  },
  {
    metric: 'projects',
    value: '100',
    prefix: '',
    suffix: '+',
  },
  {
    metric: 'users',
    value: '1',
    prefix: '~',
    suffix: 'M',
  },
];

export const aboutSections = [
  {
    title: 'Skills',
    id: 'skills',
    content: (
      <ul className="list-disc pl-5 lg:pl-10">
        <li>python</li>
        <li>backend</li>
        <li>devops</li>
        <li>...more</li>
      </ul>
    ),
  },
  {
    title: 'Certifications',
    id: 'certifications',
    content: (
      <ul className="list-disc pl-5 lg:pl-10">
        <li>CKAD</li>
        <li>Professional Scrum Master I</li>
      </ul>
    ),
  },
];
