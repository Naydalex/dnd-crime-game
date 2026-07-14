import {
  Cigarette,
  DollarSign,
  Image,
  Crosshair,
  Slice,
  Package,
  Car,
  Search,
  Heart,
  Brain,
  Clock,
  Skull,
  HandMetal,
  Wine,
  Flashlight,
  Bandage,
} from 'lucide-react';

// Maps a string key (stored in data files as plain strings so the data
// stays JSON-friendly) to the actual lucide-react icon component.
const ICONS = {
  Cigarette,
  DollarSign,
  Image,
  Crosshair,
  Slice,
  Package,
  Car,
  Search,
  Heart,
  Brain,
  Clock,
  Skull,
  HandMetal,
  Wine,
  Flashlight,
  Bandage,
};

export default function Icon({ name, className }) {
  const Cmp = ICONS[name] || Package;
  return <Cmp className={className} />;
}
