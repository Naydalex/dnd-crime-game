// Central data store for all characters.
// Each characteristic has three success thresholds (hard/medium/easy).
// Rule: roll a d100 (lower is better). A tier succeeds when
// threshold >= roll. Hard has the lowest threshold (narrowest window,
// best/rarest success), Easy has the highest threshold (widest window).

import angelinaPhoto from '../assets/angelina.jpg';
import annaPhoto from '../assets/anna.jpg';
import egorPhoto from '../assets/egor.jpg'
import olgaPhoto from '../assets/olga.jpg'

export const CHARACTERISTIC_NAMES = [
  'Сила',
  'Володіння револьвером',
  'Інтелект',
  'Психологія',
  'Пошук прихованого',
  'Водіння',
  'Знання інших мов',
  'Володіння ножем',
];

export const characters = [
  {
    id: 'angelina',
    name: 'Ангеліна',
    tagline: '«Лаунж Люсі», третій столик з краю',
    description:
      'Колишня співачка кабаре, що втратила голос у пожежі й знайшла новий інструмент — револьвер з перламутровою рукояткою. ' +
      'Ангеліна працює на боса Східного району вже сім років і жодного разу не схибила. Курить одну цигарку за іншою, ' +
      'носить фото доньки в нагрудній кишені та ніколи не питає, за що саме платять.',
    photoPlaceholder: angelinaPhoto,
    resources: [
      { key: 'health', label: 'Здоров\'я', icon: 'Heart', value: 12, min: 0, max: 12 },
      { key: 'sanity', label: 'Глузд', icon: 'Brain', value: 60, min: 0, max: 99 },
      { key: 'ammo', label: 'Патрони', icon: 'Crosshair', value: 6, min: 0, max: 999 },
    ],
    inventory: [
      'Пачка цигарок',
      'Револьвер',
      '1600 доларів',
      'Фото доньки',
      'Ніж',
    ],
    // Values given as "Легкий/Середній/Складний" (base / half / fifth,
    // classic descending stat-block order) — stored here as hard/medium/easy.
    characteristics: [
      { name: 'Сила', hard: 15, medium: 30, easy: 40 },
      { name: 'Володіння револьвером', hard: 15, medium: 30, easy: 40 },
      { name: 'Інтелект', hard: 20, medium: 35, easy: 50 },
      { name: 'Психологія', hard: 10, medium: 15, easy: 30 },
      { name: 'Пошук прихованого', hard: 25, medium: 40, easy: 50 },
      { name: 'Водіння', hard: 10, medium: 15, easy: 30 },
      { name: 'Знання інших мов', hard: 10, medium: 15, easy: 30 },
      { name: 'Володіння ножем', hard: 15, medium: 30, easy: 40 },
    ],
  },
  {
    id: 'anna',
    name: 'Анна',
    tagline: 'Бухгалтерка синдикату, поверх нагорі',
    description:
      'Анна веде рахунки синдикату й одночасно прибирає за чужими помилками — у прямому сенсі. ' +
      'Ввічлива, спокійна, завжди у рукавичках. Одні бояться її револьвера, інші — флакона в кишені пальта, ' +
      'про який краще взагалі не питати. Носить фото сина й ніколи не залишає роботу незакінченою.',
    photoPlaceholder: annaPhoto,
    resources: [
      { key: 'health', label: 'Здоров\'я', icon: 'Heart', value: 10, min: 0, max: 10 },
      { key: 'sanity', label: 'Глузд', icon: 'Brain', value: 50, min: 0, max: 99 },
      { key: 'ammo', label: 'Патрони', icon: 'Crosshair', value: 8, min: 0, max: 999 },
    ],
    inventory: [
      'Рукавички',
      'Револьвер',
      '500 доларів',
      'Фото сина',
      'Ніж',
      'Годинник',
      'Яд',
    ],
    characteristics: [
      { name: 'Сила', hard: 10, medium: 20, easy: 30 },
      { name: 'Володіння револьвером', hard: 20, medium: 30, easy: 45 },
      { name: 'Інтелект', hard: 20, medium: 35, easy: 50 },
      { name: 'Психологія', hard: 5, medium: 10, easy: 25 },
      { name: 'Пошук прихованого', hard: 25, medium: 40, easy: 50 },
      { name: 'Водіння', hard: 15, medium: 20, easy: 40 },
      { name: 'Знання інших мов', hard: 15, medium: 20, easy: 35 },
      { name: 'Володіння ножем', hard: 15, medium: 30, easy: 45 },
    ],
  },
  {
    id: 'olga',
    name: 'Ольга',
    tagline: 'Водійка, гараж на розі 5-ї та Мейн',
    description:
      'Ольга привозить "товар" туди, куди інші боятися їхати, і робить це швидше за поліцейські рації. ' +
      'За кермом вона стає іншою людиною — холодною, зосередженою, безжальною. Завжди тримає під рукою ' +
      'бінти й ліхтарик — на цій роботі рідко все йде за планом. Поза кермом — просто хоче ' +
      'відкрити власний бар колись, коли все це закінчиться.',
    photoPlaceholder: olgaPhoto,
    resources: [
      { key: 'health', label: 'Здоров\'я', icon: 'Heart', value: 14, min: 0, max: 14 },
      { key: 'sanity', label: 'Глузд', icon: 'Brain', value: 45, min: 0, max: 99 },
      { key: 'ammo', label: 'Патрони', icon: 'Crosshair', value: 6, min: 0, max: 999 },
    ],
    inventory: [
      'Пляшка віскі',
      'Револьвер',
      '50 доларів',
      'Ключі від автомобіля',
      'Ліхтарик',
      'Бінти',
    ],
    characteristics: [
      { name: 'Сила', hard: 17, medium: 35, easy: 45 },
      { name: 'Володіння револьвером', hard: 15, medium: 20, easy: 30 },
      { name: 'Інтелект', hard: 10, medium: 15, easy: 30 },
      { name: 'Психологія', hard: 10, medium: 15, easy: 30 },
      { name: 'Пошук прихованого', hard: 25, medium: 40, easy: 50 },
      { name: 'Водіння', hard: 10, medium: 15, easy: 30 },
      { name: 'Знання інших мов', hard: 10, medium: 15, easy: 30 },
      { name: 'Володіння ножем', hard: 15, medium: 30, easy: 40 },
    ],
  },
  {
    id: 'yegor',
    name: 'Єгор',
    tagline: 'Мовчазний, завжди біля дверей',
    description:
      'Єгор говорить мало, б\'є влучно, і пам\'ятає кожне обличчя, яке колись перейшло дорогу родині. ' +
      'Емігрував з портового міста разом з дідівським ножем за поясом — тим самим, яким досі користується. ' +
      'Психологи родини кажуть, що йому варто "попрацювати над емоціями". Єгор просто киває і йде працювати далі.',
    photoPlaceholder: egorPhoto,
    resources: [
      { key: 'health', label: 'Здоров\'я', icon: 'Heart', value: 12, min: 0, max: 12 },
      { key: 'sanity', label: 'Глузд', icon: 'Brain', value: 60, min: 0, max: 99 },
      { key: 'ammo', label: 'Патрони', icon: 'Crosshair', value: 6, min: 0, max: 999 },
    ],
    inventory: [
      'Пляшка віскі',
      'Револьвер',
      '50 доларів',
      'Ключі від автомобіля',
      'Ліхтарик',
      'Бінти',
    ],
    characteristics: [
      { name: 'Сила', hard: 12, medium: 25, easy: 35 },
      { name: 'Володіння револьвером', hard: 5, medium: 10, easy: 25 },
      { name: 'Інтелект', hard: 10, medium: 15, easy: 30 },
      { name: 'Психологія', hard: 15, medium: 30, easy: 40 },
      { name: 'Пошук прихованого', hard: 25, medium: 40, easy: 60 },
      { name: 'Водіння', hard: 10, medium: 15, easy: 40 },
      { name: 'Знання інших мов', hard: 10, medium: 25, easy: 30 },
      { name: 'Володіння ножем', hard: 25, medium: 35, easy: 45 },
    ],
  },
];

export const getCharacterById = (id) => characters.find((c) => c.id === id);

// Very small keyword -> lucide icon map for inventory items, used purely
// for decoration. Falls back to a generic "Package" icon.
export const guessInventoryIcon = (itemName) => {
  const n = itemName.toLowerCase();
  if (n.includes('цигар')) return 'Cigarette';
  if (n.includes('долар') || n.includes('$')) return 'DollarSign';
  if (n.includes('фото')) return 'Image';
  if (n.includes('револьвер') || n.includes('пістолет')) return 'Crosshair';
  if (n.includes('ніж')) return 'Slice';
  if (n.includes('ключ') || n.includes('cadillac')) return 'Car';
  if (n.includes('книг') || n.includes('ручк') || n.includes('окуляр')) return 'Search';
  if (n.includes('годинник')) return 'Clock';
  if (n.includes('яд') || n.includes('отрут')) return 'Skull';
  if (n.includes('рукавич') || n.includes('перчат')) return 'HandMetal';
  if (n.includes('віскі') || n.includes('пляшк') || n.includes('вино')) return 'Wine';
  if (n.includes('ліхтарик') || n.includes('фонарик')) return 'Flashlight';
  if (n.includes('бінт') || n.includes('бинт') || n.includes('аптечк')) return 'Bandage';
  if (n.includes('монтув') || n.includes('лом')) return 'Package';
  return 'Package';
};
