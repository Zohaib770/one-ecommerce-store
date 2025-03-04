import headphone from "../assets/headphone1.png";
import h1 from "../assets/1.jpeg";
import h2 from "../assets/2.jpeg";

import p11 from "../assets/product1/p1-1.jpg";
import p12 from "../assets/product1/p1-2.jpg";
import p13 from "../assets/product1/p1-3.jpg";
import p14 from "../assets/product1/p1-4.jpg";

import p21 from "../assets/product2/p2-1.jpg";
import p22 from "../assets/product2/p2-2.jpg";
import p23 from "../assets/product2/p2-3.jpg";
import p24 from "../assets/product2/p2-4.jpg";

import p31 from "../assets/product3/p3-1.jpg";
import p32 from "../assets/product3/p3-2.jpg";
import p33 from "../assets/product3/p3-3.jpg";
import p34 from "../assets/product3/p3-4.jpg";

const items = [
  {
    id: 1,
    name: "Elegante Lederhandtasche – Modell 'Sophia'",
    description: "Diese luxuriöse Handtasche aus feinstem italienischen Leder...",
    price: 299.99,
    image: [p11, p12, p13, p14],
  },
  {
    id: 2,
    name: "Noise-Cancelling Bluetooth-Kopfhörer – 'SoundMax Pro'",
    description: "Erleben Sie kristallklaren Sound und ungestörten Musikgenuss...",
    price: 149.99,
    image: [p21, p22, p23, p24],
  },
  {
    id: 3,
    name: "Bio-Kaffee – Arabica-Mischung 'Morning Sun'",
    description: "Genießen Sie den vollmundigen Geschmack unserer Bio-Arabica-Mischung...",
    price: 9.99,
    image: [p31, p32, p33, p34],
  },
  {
    id: 4,
    name: "Damen-Laufschuhe – Modell 'SpeedRun Pro'",
    description: "Diese leichten und atmungsaktiven Laufschuhe bieten optimalen Komfort...",
    price: 79.99,
    image: [headphone, h1, h2],
  },
];

export default items;
