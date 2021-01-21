const items = [
  {
    id: 'bow',
    name: `Bow`,
    offset: 0x38e,
    mask: 0x80,
  },
  {
    id: 'silverArrows',
    name: `Silver Arrows`,
    offset: 0x38e,
    mask: 0x40,
  },
  {
    id: 'boomerang',
    name: `Blue Boomerang`,
    offset: 0x38c,
    mask: 0x80,
  },
  {
    id: 'redBoomerang',
    name: `Magical Boomerang`,
    offset: 0x38c,
    mask: 0x80,
  },
  {
    id: 'hookshot',
    name: `Hookshot`,
    offset: 0x342,
    mask: 0x01,
  },
  {
    id: 'bombs',
    name: `Bombs`,
    offset: 0x343,
    mask: 0xff, // any > 1
  },
  {
    id: 'mushroom',
    name: `Mushroom`,
    offset: 0x38c,
    mask: 0x20, // 0x20 - Mushroom in inventory, 0x08 - Mushroom turned in
  },
  {
    id: 'powder',
    name: `Magic Powder`,
    offset: 0x38c,
    mask: 0x10,
  },
  {
    id: 'fireRod',
    name: `Fire Rod`,
    offset: 0x345,
    mask: 0x01,
  },
  {
    id: 'iceRod',
    name: `Ice Rod`,
    offset: 0x346,
    mask: 0x01,
  },
  {
    id: 'bombos',
    name: `Bombos Medallion`,
    offset: 0x347,
    mask: 0x01,
  },
  {
    id: 'ether',
    name: `Ether Medallion`,
    offset: 0x348,
    mask: 0x01,
  },
  {
    id: 'quake',
    name: `Quake Medallion`,
    offset: 0x349,
    mask: 0x01,
  },
  {
    id: 'lamp',
    name: `Lamp`,
    offset: 0x34a,
    mask: 0x01,
  },
  {
    id: 'hammer',
    name: `Hammer`,
    offset: 0x34b,
    mask: 0x01,
  },
  {
    id: 'shovel',
    name: `Shovel`,
    offset: 0x38c,
    mask: 0x04,
  },
  {
    id: 'flute',
    name: `Flute`,
    offset: 0x38c,
    mask: 0x03, // 0x01 - active, 0x02 - inactive
  },
  {
    id: 'bugCatchingNet',
    name: `Bug Catching Net`,
    offset: 0x38d,
    mask: 0x01,
  },
  {
    id: 'bookOfMudora',
    name: `Book of Mudora`,
    offset: 0x38e,
    mask: 0x01,
  },
  {
    id: 'bottle1',
    name: `Bottle 1`,
    offset: 0x35c,
    mask: 0x0f,
  },
  {
    id: 'bottle2',
    name: `Bottle 2`,
    offset: 0x35d,
    mask: 0x0f,
  },
  {
    id: 'bottle3',
    name: `Bottle 3`,
    offset: 0x35e,
    mask: 0x0f,
  },
  {
    id: 'bottle4',
    name: `Bottle 4`,
    offset: 0x35f,
    mask: 0x0f,
  },
  {
    id: 'caneOfSomaria',
    name: `Cane of Somaria`,
    offset: 0x350,
    mask: 0x01,
  },
  {
    id: 'caneOfByrna',
    name: `Cane of Byrna`,
    offset: 0x351,
    mask: 0x01,
  },
  {
    id: 'cape',
    name: `Magic Cape`,
    offset: 0x352,
    mask: 0x01,
  },
  {
    id: 'magicMirror',
    name: `Magic Mirror`,
    offset: 0x353,
    mask: 0x01,
  },
  {
    id: 'powerGlove',
    name: `Power Glove`,
    offset: 0x354,
    mask: 0x01,
  },
  {
    id: 'titansMitt',
    name: `Titan's Mitt`,
    offset: 0x354,
    mask: 0x02,
  },
  {
    id: 'pegasusBoots',
    name: `PegasusBoots`,
    offset: 0x355,
    mask: 0x01,
  },
  {
    id: 'flippers',
    name: `Flippers`,
    offset: 0x356,
    mask: 0x01,
  },
  {
    id: 'moonPearl',
    name: `Moon Pearl`,
    offset: 0x357,
    mask: 0x01,
  },
  {
    id: 'sword',
    name: `Sword`,
    offset: 0x359,
    mask: 0x0f,
  },
  {
    id: 'shield',
    name: `Shield`,
    offset: 0x35a,
    mask: 0x0f,
  },
  {
    id: 'armor',
    name: `Armor`,
    offset: 0x35b,
    mask: 0x0f,
  },
];

export default items;
