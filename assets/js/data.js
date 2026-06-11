// Centrálne dáta firmy a advokátov.
// Údaje overené z https://www.advoka.sk (2026-05-13).
// Polia označené null/TODO doplní klient.

export const company = {
  name: "ADVOKA, s.r.o.",
  legalName: "ADVOKA, s.r.o.",
  tagline:
    "Profesionálne právne služby s dôrazom na dôveru, odbornosť a individuálny prístup.",

  ico: null,
  dic: null,
  icDph: null,

  address: {
    street: "Komárnická 36",
    city: "Bratislava",
    zip: "821 02",
    country: "Slovensko",
    mapsUrl: "https://maps.app.goo.gl/R1Arh63LSm6oUFGo6"
  },

  phone: "+421908777813",
  phoneDisplay: "+421 908 777 813",
  email: "lubos.pejhovsky@advoka.sk",

  hours: {
    monFri: "9:00 – 17:00",
    sat: null,
    sun: null
  },

  languages: ["Slovenčina", "Nemčina", "Angličtina"],

  social: {
    facebook: null,
    linkedin: null,
    instagram: null
  }
};

export const lawyers = [
  {
    slug: "lubos-pejhovsky",
    name: "Ľuboš Pejhovský",
    titleBefore: "",
    titleAfter: "",
    sakNumber: null,
    photo: "/assets/images/team/lubos-pejhovsky.jpg",
    role: "Advokát",
    yearsOfPractice: 20,
    languages: ["Slovenčina", "Nemčina", "Angličtina"],
    specializations: [],
    bio: ""
  },
  {
    slug: "advokat-2",
    name: "TODO",
    titleBefore: "",
    titleAfter: "",
    sakNumber: null,
    photo: "/assets/images/team/advokat-2.jpg",
    role: "Advokát",
    yearsOfPractice: 20,
    languages: ["Slovenčina", "Nemčina", "Angličtina"],
    specializations: [],
    bio: ""
  }
];

export const services = [
  {
    slug: "dopravne-nehody",
    title: "Dopravné nehody",
    short:
      "Náhrada škody, bolestné, komunikácia s poisťovňami. Platíte len v prípade úspechu — 15 % z vymoženej sumy.",
    icon: "car"
  },
  {
    slug: "rodinne-pravo",
    title: "Rodinné právo",
    short:
      "Rozvody, zverenie detí, výživné. Diskrétnosť a citlivý prístup pri najťažších životných situáciách.",
    icon: "heart"
  },
  {
    slug: "dedicske-pravo",
    title: "Dedičské právo",
    short:
      "Komplexné poradenstvo pri dedení a predchádzanie rodinným sporom. Oboznámime Vás s Vašimi právami.",
    icon: "scroll"
  },
  {
    slug: "majetkove-usporiadanie",
    title: "Majetkové usporiadanie",
    short:
      "Vyporiadanie BSM, podielové spoluvlastníctvo, prevodové zmluvy. Pripravíme Vás na bezproblémový prevod.",
    icon: "key"
  },
  {
    slug: "trestne-pravo",
    title: "Trestné právo",
    short:
      "Obhajoba aj zastupovanie poškodených v trestnom konaní. Konáme rýchlo a dôsledne.",
    icon: "shield"
  },
  {
    slug: "pozemkove-pravo",
    title: "Pozemkové právo",
    short:
      "Spory o hranice pozemkov, ROEP, vecné bremená, prevody nehnuteľností. Skúsenosť s katastrálnymi konaniami.",
    icon: "map"
  },
  {
    slug: "pracovne-pravo",
    title: "Pracovné právo",
    short:
      "Neplatné výpovede, mzdové nároky, zamestnanecké spory. Zastupujeme zamestnancov aj zamestnávateľov.",
    icon: "briefcase"
  },
  {
    slug: "ustavne-pravo",
    title: "Ústavné právo",
    short:
      "Ústavné sťažnosti, zastupovanie pred Ústavným súdom SR. Tam, kde končia ostatné inštancie, my pokračujeme.",
    icon: "columns"
  },
  {
    slug: "vymahanie-pohladavok",
    title: "Vymáhanie pohľadávok",
    short:
      "Predžalobné výzvy, žaloby, exekučné konanie. Vrátime Vám peniaze, ktoré Vám patria.",
    icon: "gavel"
  }
];

export const stats = [
  { value: "20+", label: "rokov praxe" },
  { value: "Celé Slovensko", label: "pôsobnosť" },
  { value: "3 jazyky", label: "SK, DE, EN" }
];

export function fullAddress() {
  const a = company.address;
  return `${a.street}, ${a.zip} ${a.city}`;
}
