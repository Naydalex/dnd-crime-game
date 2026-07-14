// Extra "evidence board" slots on the Gallery page, beyond the four
// characters (whose photos are pulled automatically from characters.js).
//
// To add a real photo for one of these locations:
//   1. Put the image file in src/assets/, e.g. src/assets/scene.jpg
//   2. Import it at the top of this file:
//        import scenePhoto from '../assets/scene.jpg';
//   3. Set `photo: scenePhoto` on the matching entry below (instead of null).
import scenePhoto from '../assets/scene.jpg';
import skladPhpto from '../assets/skladPhpto.jpg';
import whitePhoto from '../assets/whitePhoto.jpg';
import carPhoto from '../assets/carPhoto.jpg';
import purpurPhoto from '../assets/purpurPhoto.jpg';
import pahpah from '../assets/pahpah.png';


export const EXTRA_GALLERY_SLOTS = [
  { id: 'crime-scene', label: 'Поліція', photo: scenePhoto },
  { id: 'lucys-lounge', label: 'Містер білий', photo: whitePhoto },
  { id: 'garage', label: 'Склад', photo: skladPhpto },
  { id: 'hq', label: 'Авто міс зеленої', photo: carPhoto },
  { id: 'phiolet', label: 'Містер фіолетовий', photo: purpurPhoto },
  { id: 'phiolet', label: 'відстріл', photo: pahpah },
];
