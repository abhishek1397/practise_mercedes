export const MERCEDES_MODELS = [
  {
    id: 'amg-gt-63',
    name: 'Mercedes-AMG GT 63 S 4-Door',
    series: 'AMG Performance',
    tagline: 'Pure Racing DNA in Four Doors',
    basePrice: 178000,
    acceleration: '3.1s',
    topSpeed: '196 mph',
    power: '630 hp',
    engine: '4.0L V8 Biturbo',
    image: '/images/mercedes_amg_gt.jpg',
    colors: [
      { name: 'Obsidian Black Metallic', hex: '#0B0D10', price: 0 },
      { name: 'Selenite Grey Magno', hex: '#3A3E45', price: 2500 },
      { name: 'Designo Hi-Tech Silver', hex: '#8B939C', price: 1800 },
      { name: 'Hyper Blue Metallic', hex: '#0047AB', price: 2100 }
    ],
    wheels: [
      { name: '21-inch AMG Forged Twin 5-Spoke', price: 0 },
      { name: '21-inch AMG Cross-Spoke Forged Black', price: 2200 },
      { name: '22-inch AMG Carbon Performance Edition', price: 4500 }
    ],
    packages: [
      { id: 'aerodynamics', name: 'AMG Aerodynamics Package', price: 3850 },
      { id: 'carbon', name: 'AMG Carbon Fiber Package II', price: 5400 },
      { id: 'burmester', name: 'Burmester 3D High-End Surround Sound', price: 4550 }
    ]
  },
  {
    id: 'eqs-580',
    name: 'Mercedes-Benz EQS 580 4MATIC',
    series: 'EQ Electric',
    tagline: 'Electric Luxury Redefined',
    basePrice: 127350,
    acceleration: '4.1s',
    topSpeed: '130 mph',
    power: '516 hp',
    range: '340 mi',
    engine: 'Dual Electric Motors',
    image: '/images/mercedes_eqs.jpg',
    colors: [
      { name: 'Diamond White Metallic', hex: '#F0F2F5', price: 1750 },
      { name: 'Obsidian Black', hex: '#111317', price: 0 },
      { name: 'Nautical Blue Metallic', hex: '#002B49', price: 1150 }
    ],
    wheels: [
      { name: '21-inch AMG Multi-Spoke w/ Black Accents', price: 0 },
      { name: '22-inch EQS Aerodynamic Turbine Wheels', price: 1950 }
    ],
    packages: [
      { id: 'hyperscreen', name: 'MBUX Hyperscreen Triple Display', price: 4900 },
      { id: 'rear-executive', name: 'Executive Rear Seat Package PLUS', price: 3800 },
      { id: 'drive-pilot', name: 'DRIVE PILOT Autonomous Suite', price: 2500 }
    ]
  },
  {
    id: 'g-63-amg',
    name: 'Mercedes-AMG G 63 SUV',
    series: 'G-Class Offroad',
    tagline: 'Unstoppable Icon of Superiority',
    basePrice: 179000,
    acceleration: '4.5s',
    topSpeed: '149 mph',
    power: '577 hp',
    engine: 'Handcrafted AMG 4.0L V8',
    image: '/images/mercedes_g63.jpg',
    colors: [
      { name: 'Satin Selenite Grey Magno', hex: '#4A4E54', price: 3950 },
      { name: 'G Manufaktur Night Black', hex: '#090A0C', price: 2800 },
      { name: 'Rubellite Red Metallic', hex: '#58111A', price: 2300 }
    ],
    wheels: [
      { name: '22-inch AMG Forged Cross-Spoke Gold', price: 3400 },
      { name: '22-inch AMG Matte Black Wheels', price: 2600 }
    ],
    packages: [
      { id: 'night-package', name: 'AMG Night Package II', price: 1950 },
      { id: 'g-manufaktur', name: 'G Manufaktur Interior Package Plus', price: 8100 },
      { id: 'trail-pkg', name: 'AMG Trail Package', price: 3050 }
    ]
  },
  {
    id: 'maybach-s680',
    name: 'Mercedes-Maybach S 680',
    series: 'Maybach Ultra-Luxury',
    tagline: 'The Pinnacle of Automotive Prestige',
    basePrice: 229000,
    acceleration: '4.4s',
    topSpeed: '155 mph',
    power: '621 hp',
    engine: '6.0L V12 Biturbo',
    image: '/images/mercedes_maybach.jpg',
    colors: [
      { name: 'Two-Tone Obsidian Black / Kalahari Gold', hex: '#C5A059', price: 12750 },
      { name: 'Cirrus Silver Metallic', hex: '#C4C9D0', price: 0 },
      { name: 'Onyx Black Metallic', hex: '#16181C', price: 0 }
    ],
    wheels: [
      { name: '20-inch Maybach Exclusive Champagne Flute Wheels', price: 0 },
      { name: '21-inch Maybach Forged Multi-Spoke Chrome', price: 4100 }
    ],
    packages: [
      { id: 'champagne', name: 'Refrigerated Compartment & Champagne Flutes', price: 3200 },
      { id: 'first-class', name: 'First-Class Rear Compartment Suite', price: 9500 },
      { id: 'burmester-4d', name: 'Burmester High-End 4D Surround Sound System', price: 6730 }
    ]
  }
];
