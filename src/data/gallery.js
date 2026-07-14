// Extra "evidence board" slots on the Gallery page, beyond the four
// characters (whose photos are pulled automatically from characters.js).
//
// To add a real photo for one of these locations:
//   1. Put the image file in src/assets/, e.g. src/assets/scene.jpg
//   2. Import it at the top of this file:
//        import scenePhoto from '../assets/scene.jpg';
//   3. Set `photo: scenePhoto` on the matching entry below (instead of null).
export const EXTRA_GALLERY_SLOTS = [
  { id: 'crime-scene', label: 'Місце злочину', photo: null },
  { id: 'lucys-lounge', label: 'Бар "Лаунж Люсі"', photo: null },
  { id: 'garage', label: 'Гараж', photo: null },
  { id: 'hq', label: 'Штаб-квартира', photo: null },
];
