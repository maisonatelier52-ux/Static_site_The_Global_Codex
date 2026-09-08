import {
  FiSearch,
  FiMenu,
  FiX,
  FiMail,
  FiList,
  FiCheck,
  FiChevronLeft,
  FiChevronRight,
  FiLink,
  FiFileText,
  FiMapPin,
} from "react-icons/fi";
import {
  FaXTwitter,
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
  FaWhatsapp,
} from "react-icons/fa6";

// Maps the same `name` strings used across the project to a react-icons component.
const ICONS = {
  x: FaXTwitter,
  facebook: FaFacebookF,
  instagram: FaInstagram,
  linkedin: FaLinkedinIn,
  youtube: FaYoutube,
  whatsapp: FaWhatsapp,

  search: FiSearch,
  menu: FiMenu,
  close: FiX,
  mail: FiMail,
  list: FiList,
  pin: FiMapPin,
  newspaper: FiFileText,
  check: FiCheck,
  chevronLeft: FiChevronLeft,
  chevronRight: FiChevronRight,
  link: FiLink,
};

export function SocialIcon({ name, size = 18 }) {
  const Icon = ICONS[name] ?? FiLink;
  return <Icon size={size} aria-hidden="true" />;
}