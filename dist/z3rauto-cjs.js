var __defProp = Object.defineProperty;
var __markAsModule = (target) => __defProp(target, "__esModule", {value: true});
var __export = (target, all) => {
  __markAsModule(target);
  for (var name in all)
    __defProp(target, name, {get: all[name], enumerable: true});
};

// src/Z3rAuto.ts
__export(exports, {
  default: () => Z3rAuto_default
});

// src/SnesConnector.ts
var hexString = (num) => num.toString(16).toUpperCase();
var SnesConnector = class {
  constructor(url, timeout) {
    this.url = url;
    this.timeout = timeout;
    this.hasRequest = false;
  }
  connect() {
    return new Promise((resolve, reject) => {
      if (this.socket && this.socket.readyState < 2) {
        resolve();
        return;
      }
      this.socket = new WebSocket(this.url);
      const timeout = setTimeout(() => this.socket?.close(), this.timeout);
      this.socket.onopen = () => {
        clearTimeout(timeout);
        resolve();
      };
      this.socket.onclose = () => reject(Error("Socket was closed."));
    });
  }
  sendRequest(request, noReply = false) {
    return new Promise((resolve, reject) => {
      if (this.hasRequest) {
        reject(Error("Connection is busy."));
        return;
      }
      if (!this.socket || this.socket.readyState > 1) {
        reject(Error("Connection is closed."));
        return;
      }
      this.hasRequest = true;
      this.socket.send(JSON.stringify(request));
      if (noReply) {
        this.hasRequest = false;
        resolve(true);
      } else {
        this.socket.onmessage = (e) => {
          this.hasRequest = false;
          resolve(e.data);
        };
        this.socket.onclose = () => {
          this.hasRequest = false;
          reject(Error("Socket was closed."));
        };
        setTimeout(() => {
          this.hasRequest = false;
          reject(Error("Request timed out."));
        }, this.timeout);
      }
    });
  }
  getDevices() {
    const request = {
      Opcode: "DeviceList",
      Space: "SNES"
    };
    return this.sendRequest(request).then((response) => {
      const json = response;
      return JSON.parse(json).Results;
    });
  }
  attachToDevice(device) {
    return this.getDevices().then((devices) => {
      if (!devices.includes(device))
        throw Error("Device not found.");
      const request = {
        Opcode: "Attach",
        Space: "SNES",
        Operands: [device]
      };
      return this.sendRequest(request, true);
    });
  }
  getAddress(offset, size) {
    if (size > 1024) {
      return Promise.reject(Error("Cannot request more than 1024 bytes of data."));
    }
    const request = {
      Opcode: "GetAddress",
      Space: "SNES",
      Operands: [hexString(offset), hexString(size)]
    };
    return this.sendRequest(request).then((response) => {
      const blob = response;
      return blob.arrayBuffer();
    });
  }
};
var SnesConnector_default = SnesConnector;

// src/items.ts
var items = [
  {
    id: "bow",
    name: `Bow`,
    offset: 910,
    mask: 128
  },
  {
    id: "silverArrows",
    name: `Silver Arrows`,
    offset: 910,
    mask: 64
  },
  {
    id: "boomerang",
    name: `Blue Boomerang`,
    offset: 908,
    mask: 128
  },
  {
    id: "redBoomerang",
    name: `Magical Boomerang`,
    offset: 908,
    mask: 64
  },
  {
    id: "hookshot",
    name: `Hookshot`,
    offset: 834,
    mask: 1
  },
  {
    id: "bombs",
    name: `Bombs`,
    offset: 835,
    mask: 255
  },
  {
    id: "mushroom",
    name: `Mushroom`,
    offset: 908,
    mask: 32
  },
  {
    id: "powder",
    name: `Magic Powder`,
    offset: 908,
    mask: 16
  },
  {
    id: "fireRod",
    name: `Fire Rod`,
    offset: 837,
    mask: 1
  },
  {
    id: "iceRod",
    name: `Ice Rod`,
    offset: 838,
    mask: 1
  },
  {
    id: "bombos",
    name: `Bombos Medallion`,
    offset: 839,
    mask: 1
  },
  {
    id: "ether",
    name: `Ether Medallion`,
    offset: 840,
    mask: 1
  },
  {
    id: "quake",
    name: `Quake Medallion`,
    offset: 841,
    mask: 1
  },
  {
    id: "lamp",
    name: `Lamp`,
    offset: 842,
    mask: 1
  },
  {
    id: "hammer",
    name: `Hammer`,
    offset: 843,
    mask: 1
  },
  {
    id: "shovel",
    name: `Shovel`,
    offset: 908,
    mask: 4
  },
  {
    id: "flute",
    name: `Flute`,
    offset: 908,
    mask: 3
  },
  {
    id: "bugCatchingNet",
    name: `Bug Catching Net`,
    offset: 909,
    mask: 1
  },
  {
    id: "bookOfMudora",
    name: `Book of Mudora`,
    offset: 910,
    mask: 1
  },
  {
    id: "bottle1",
    name: `Bottle 1`,
    offset: 860,
    mask: 15
  },
  {
    id: "bottle2",
    name: `Bottle 2`,
    offset: 861,
    mask: 15
  },
  {
    id: "bottle3",
    name: `Bottle 3`,
    offset: 862,
    mask: 15
  },
  {
    id: "bottle4",
    name: `Bottle 4`,
    offset: 863,
    mask: 15
  },
  {
    id: "caneOfSomaria",
    name: `Cane of Somaria`,
    offset: 848,
    mask: 1
  },
  {
    id: "caneOfByrna",
    name: `Cane of Byrna`,
    offset: 849,
    mask: 1
  },
  {
    id: "cape",
    name: `Magic Cape`,
    offset: 850,
    mask: 1
  },
  {
    id: "magicMirror",
    name: `Magic Mirror`,
    offset: 851,
    mask: 1
  },
  {
    id: "powerGlove",
    name: `Power Glove`,
    offset: 852,
    mask: 1
  },
  {
    id: "titansMitt",
    name: `Titan's Mitt`,
    offset: 852,
    mask: 2
  },
  {
    id: "pegasusBoots",
    name: `PegasusBoots`,
    offset: 853,
    mask: 1
  },
  {
    id: "flippers",
    name: `Flippers`,
    offset: 854,
    mask: 1
  },
  {
    id: "moonPearl",
    name: `Moon Pearl`,
    offset: 855,
    mask: 1
  },
  {
    id: "sword",
    name: `Sword`,
    offset: 857,
    mask: 15
  },
  {
    id: "shield",
    name: `Shield`,
    offset: 858,
    mask: 15
  },
  {
    id: "armor",
    name: `Armor`,
    offset: 859,
    mask: 15
  }
];
var items_default = items;

// src/keys.ts
var keys = [
  {
    id: "KeyH2",
    name: `Sewers Key`,
    offset: 892,
    mask: 255
  },
  {
    id: "KeyH1",
    name: `Hyrule Castle Key`,
    offset: 893,
    mask: 255
  },
  {
    id: "KeyP1",
    name: `Eastern Palace Key`,
    offset: 894,
    mask: 255
  },
  {
    id: "KeyP2",
    name: `Desert Palace Key`,
    offset: 895,
    mask: 255
  },
  {
    id: "KeyA1",
    name: `Agahnims Tower Key`,
    offset: 896,
    mask: 255
  },
  {
    id: "KeyD2",
    name: `Swamp Palace Key`,
    offset: 897,
    mask: 255
  },
  {
    id: "KeyD1",
    name: `Palace of Darkness Key`,
    offset: 898,
    mask: 255
  },
  {
    id: "KeyD6",
    name: `Misery Mire Key`,
    offset: 899,
    mask: 255
  },
  {
    id: "KeyD3",
    name: `Skull Woods Key`,
    offset: 900,
    mask: 255
  },
  {
    id: "KeyD5",
    name: `Ice Palace Key`,
    offset: 901,
    mask: 255
  },
  {
    id: "KeyP3",
    name: `Tower of Hera Key`,
    offset: 902,
    mask: 255
  },
  {
    id: "KeyD4",
    name: `Thieves Town Key`,
    offset: 903,
    mask: 255
  },
  {
    id: "KeyD7",
    name: `Turtle Rock Key`,
    offset: 904,
    mask: 255
  },
  {
    id: "KeyA2",
    name: `Ganons Tower Key`,
    offset: 905,
    mask: 255
  }
];
var keys_default = keys;

// src/bigKeys.ts
var bigKeys = [
  {
    id: "BigKeyA2",
    name: `Ganons Tower Big Key`,
    offset: 870,
    mask: 4
  },
  {
    id: "BigKeyD7",
    name: `Turtle Rock Big Key`,
    offset: 870,
    mask: 8
  },
  {
    id: "BigKeyD4",
    name: `Thieves Town Big Key`,
    offset: 870,
    mask: 16
  },
  {
    id: "BigKeyP3",
    name: `Tower of Hera Big Key`,
    offset: 870,
    mask: 32
  },
  {
    id: "BigKeyD5",
    name: `Ice Palace Big Key`,
    offset: 870,
    mask: 64
  },
  {
    id: "BigKeyD3",
    name: `Skull Woods Big Key`,
    offset: 870,
    mask: 128
  },
  {
    id: "BigKeyD6",
    name: `Misery Mire Big Key`,
    offset: 871,
    mask: 1
  },
  {
    id: "BigKeyD1",
    name: `Palace of Darkness Big Key`,
    offset: 871,
    mask: 2
  },
  {
    id: "BigKeyD2",
    name: `Swamp Palace Big Key`,
    offset: 871,
    mask: 4
  },
  {
    id: "BigKeyA1",
    name: `Agahnims Tower Big Key`,
    offset: 871,
    mask: 8
  },
  {
    id: "BigKeyP2",
    name: `Desert Palace Big Key`,
    offset: 871,
    mask: 16
  },
  {
    id: "BigKeyP1",
    name: `Eastern Palace Big Key`,
    offset: 871,
    mask: 32
  },
  {
    id: "BigKeyH1",
    name: `Hyrule Castle Big Key`,
    offset: 871,
    mask: 64
  },
  {
    id: "BigKeyH2",
    name: `Sewers Big Key`,
    offset: 871,
    mask: 128
  }
];
var bigKeys_default = bigKeys;

// src/locations.ts
var locations = [
  {
    id: "spiralCave",
    name: `Spiral Cave`,
    offset: 508,
    mask: 16
  },
  {
    id: "mimicCave",
    name: `Mimic Cave`,
    offset: 536,
    mask: 16
  },
  {
    id: "paradoxCaveLowerFarLeft",
    name: `Paradox Cave Lower - Far Left`,
    offset: 478,
    mask: 16
  },
  {
    id: "paradoxCaveLowerLeft",
    name: `Paradox Cave Lower - Left`,
    offset: 478,
    mask: 32
  },
  {
    id: "paradoxCaveLowerRight",
    name: `Paradox Cave Lower - Right`,
    offset: 478,
    mask: 64
  },
  {
    id: "paradoxCaveLowerFarRight",
    name: `Paradox Cave Lower - Far Right`,
    offset: 478,
    mask: 128
  },
  {
    id: "paradoxCaveLowerMiddle",
    name: `Paradox Cave Lower - Middle`,
    offset: 479,
    mask: 1
  },
  {
    id: "paradoxCaveUpperLeft",
    name: `Paradox Cave Upper - Left`,
    offset: 510,
    mask: 16
  },
  {
    id: "paradoxCaveUpperRight",
    name: `Paradox Cave Upper - Right`,
    offset: 510,
    mask: 32
  },
  {
    id: "floatingIsland",
    name: `Floating Island`,
    offset: 645,
    mask: 64
  },
  {
    id: "oldMan",
    name: `Old Man`,
    offset: 1040,
    mask: 1
  },
  {
    id: "spectacleRockCave",
    name: `Spectacle Rock Cave`,
    offset: 469,
    mask: 4
  },
  {
    id: "etherTablet",
    name: `Ether Tablet`,
    offset: 1041,
    mask: 1
  },
  {
    id: "spectacleRock",
    name: `Spectacle Rock`,
    offset: 643,
    mask: 64
  },
  {
    id: "sahasrahlasHutLeft",
    name: `Sahasrahla's Hut - Left`,
    offset: 522,
    mask: 16
  },
  {
    id: "sahasrahlasHutMiddle",
    name: `Sahasrahla's Hut - Middle`,
    offset: 522,
    mask: 32
  },
  {
    id: "sahasrahlasHutRight",
    name: `Sahasrahla's Hut - Right`,
    offset: 522,
    mask: 64
  },
  {
    id: "sahasrahla",
    name: `Sahasrahla`,
    offset: 1040,
    mask: 16
  },
  {
    id: "kingZora",
    name: `King Zora`,
    offset: 1040,
    mask: 2
  },
  {
    id: "potionShop",
    name: `Potion Shop`,
    offset: 1041,
    mask: 32
  },
  {
    id: "zorasLedge",
    name: `Zora's Ledge`,
    offset: 769,
    mask: 64
  },
  {
    id: "waterfallFairyLeft",
    name: `Waterfall Fairy - Left`,
    offset: 552,
    mask: 16
  },
  {
    id: "waterfallFairyRight",
    name: `Waterfall Fairy - Right`,
    offset: 552,
    mask: 32
  },
  {
    id: "masterSwordPedestal",
    name: `Master Sword Pedestal`,
    offset: 768,
    mask: 64
  },
  {
    id: "kingsTomb",
    name: `King's Tomb`,
    offset: 550,
    mask: 16
  },
  {
    id: "kakarikoTavern",
    name: `Kakariko Tavern`,
    offset: 518,
    mask: 16
  },
  {
    id: "chickenHouse",
    name: `Chicken House`,
    offset: 528,
    mask: 16
  },
  {
    id: "kakarikoWellTop",
    name: `Kakariko Well - Top`,
    offset: 94,
    mask: 16
  },
  {
    id: "kakarikoWellLeft",
    name: `Kakariko Well - Left`,
    offset: 94,
    mask: 32
  },
  {
    id: "kakarikoWellMiddle",
    name: `Kakariko Well - Middle`,
    offset: 94,
    mask: 64
  },
  {
    id: "kakarikoWellRight",
    name: `Kakariko Well - Right`,
    offset: 94,
    mask: 128
  },
  {
    id: "kakarikoWellBottom",
    name: `Kakariko Well - Bottom`,
    offset: 94,
    mask: 1
  },
  {
    id: "blindsHideoutTop",
    name: `Blind's Hideout - Top`,
    offset: 570,
    mask: 16
  },
  {
    id: "blindsHideoutLeft",
    name: `Blind's Hideout - Left`,
    offset: 570,
    mask: 32
  },
  {
    id: "blindsHideoutRight",
    name: `Blind's Hideout - Right`,
    offset: 570,
    mask: 64
  },
  {
    id: "blindsHideoutFarLeft",
    name: `Blind's Hideout - Far Left`,
    offset: 570,
    mask: 128
  },
  {
    id: "blindsHideoutFarRight",
    name: `Blind's Hideout - Far Right`,
    offset: 570,
    mask: 1
  },
  {
    id: "pegasusRocks",
    name: `Pegasus Rocks`,
    offset: 584,
    mask: 16
  },
  {
    id: "bottleMerchant",
    name: `Bottle Merchant`,
    offset: 969,
    mask: 2
  },
  {
    id: "magicBat",
    name: `Magic Bat`,
    offset: 1041,
    mask: 128
  },
  {
    id: "sickKid",
    name: `Sick Kid`,
    offset: 1040,
    mask: 4
  },
  {
    id: "lostWoodsHideout",
    name: `Lost Woods Hideout`,
    offset: 451,
    mask: 2
  },
  {
    id: "lumberjackTree",
    name: `Lumberjack Tree`,
    offset: 453,
    mask: 2
  },
  {
    id: "graveyardLedge",
    name: `Graveyard Ledge`,
    offset: 567,
    mask: 2
  },
  {
    id: "mushroom",
    name: `Mushroom`,
    offset: 1041,
    mask: 16
  },
  {
    id: "floodgateChest",
    name: `Floodgate Chest`,
    offset: 534,
    mask: 16
  },
  {
    id: "linksHouse",
    name: `Link's House`,
    offset: 520,
    mask: 16
  },
  {
    id: "aginahsCave",
    name: `Aginah's Cave`,
    offset: 532,
    mask: 16
  },
  {
    id: "miniMoldormCaveFarLeft",
    name: `Mini Moldorm Cave - Far Left`,
    offset: 582,
    mask: 16
  },
  {
    id: "miniMoldormCaveLeft",
    name: `Mini Moldorm Cave - Left`,
    offset: 582,
    mask: 32
  },
  {
    id: "miniMoldormCaveRight",
    name: `Mini Moldorm Cave - Right`,
    offset: 582,
    mask: 64
  },
  {
    id: "miniMoldormCaveFarRight",
    name: `Mini Moldorm Cave - Far Right`,
    offset: 582,
    mask: 128
  },
  {
    id: "iceRodCave",
    name: `Ice Rod Cave`,
    offset: 576,
    mask: 16
  },
  {
    id: "hobo",
    name: `Hobo`,
    offset: 969,
    mask: 1
  },
  {
    id: "bombosTablet",
    name: `Bombos Tablet`,
    offset: 1041,
    mask: 2
  },
  {
    id: "cave45",
    name: `Cave 45`,
    offset: 567,
    mask: 4
  },
  {
    id: "checkerboardCave",
    name: `Checkerboard Cave`,
    offset: 589,
    mask: 2
  },
  {
    id: "miniMoldormCaveNPC",
    name: `Mini Moldorm Cave - NPC`,
    offset: 583,
    mask: 4
  },
  {
    id: "library",
    name: `Library`,
    offset: 589,
    mask: 2
  },
  {
    id: "mazeRace",
    name: `Maze Race`,
    offset: 680,
    mask: 64
  },
  {
    id: "desertLedge",
    name: `Desert Ledge`,
    offset: 688,
    mask: 64
  },
  {
    id: "lakeHyliaIsland",
    name: `Lake Hylia Island`,
    offset: 693,
    mask: 64
  },
  {
    id: "sunkenTreasure",
    name: `Sunken Treasure`,
    offset: 699,
    mask: 64
  },
  {
    id: "fluteSpot",
    name: `Flute Spot`,
    offset: 682,
    mask: 64
  },
  {
    id: "superbunnyCaveTop",
    name: `Superbunny Cave - Top`,
    offset: 496,
    mask: 16
  },
  {
    id: "superbunnyCaveBottom",
    name: `Superbunny Cave - Bottom`,
    offset: 496,
    mask: 32
  },
  {
    id: "hookshotCaveTopRight",
    name: `Hookshot Cave - Top Right`,
    offset: 120,
    mask: 16
  },
  {
    id: "hookshotCaveTopLeft",
    name: `Hookshot Cave - Top Left`,
    offset: 120,
    mask: 32
  },
  {
    id: "hookshotCaveBottomLeft",
    name: `Hookshot Cave - Bottom Left`,
    offset: 120,
    mask: 64
  },
  {
    id: "hookshotCaveBottomRight",
    name: `Hookshot Cave - Bottom Right`,
    offset: 120,
    mask: 128
  },
  {
    id: "spikeCave",
    name: `Spike Cave`,
    offset: 558,
    mask: 16
  },
  {
    id: "mireShedLeft",
    name: `Mire Shed - Left`,
    offset: 538,
    mask: 16
  },
  {
    id: "mireShedRight",
    name: `Mire Shed - Right`,
    offset: 538,
    mask: 32
  },
  {
    id: "catfish",
    name: `Catfish`,
    offset: 538,
    mask: 32
  },
  {
    id: "pyramid",
    name: `Pyramid`,
    offset: 731,
    mask: 64
  },
  {
    id: "pyramidFairySword",
    name: `Pyramid Fairy - Sword`,
    offset: 556,
    mask: 16
  },
  {
    id: "pyramidFairyBow",
    name: `Pyramid Fairy - Bow`,
    offset: 556,
    mask: 32
  },
  {
    id: "brewery",
    name: `Brewery`,
    offset: 524,
    mask: 16
  },
  {
    id: "cShapedHouse",
    name: `C-Shaped House`,
    offset: 568,
    mask: 16
  },
  {
    id: "chestGame",
    name: `Chest Game`,
    offset: 525,
    mask: 4
  },
  {
    id: "hammerPegs",
    name: `Hammer Pegs`,
    offset: 591,
    mask: 4
  },
  {
    id: "bumperCave",
    name: `Bumper Cave`,
    offset: 714,
    mask: 64
  },
  {
    id: "blacksmith",
    name: `Blacksmith`,
    offset: 1041,
    mask: 4
  },
  {
    id: "purpleChest",
    name: `Purple Chest`,
    offset: 969,
    mask: 16
  },
  {
    id: "hypeCaveTop",
    name: `Hype Cave - Top`,
    offset: 572,
    mask: 16
  },
  {
    id: "hypeCaveMiddleRight",
    name: `Hype Cave - Middle Right`,
    offset: 572,
    mask: 64
  },
  {
    id: "hypeCaveMiddleLeft",
    name: `Hype Cave - Middle Left`,
    offset: 572,
    mask: 32
  },
  {
    id: "hypeCaveBottom",
    name: `Hype Cave - Bottom`,
    offset: 572,
    mask: 128
  },
  {
    id: "stumpy",
    name: `Stumpy`,
    offset: 1040,
    mask: 8
  },
  {
    id: "hypeCaveNPC",
    name: `Hype Cave - NPC`,
    offset: 573,
    mask: 4
  },
  {
    id: "diggingGame",
    name: `Digging Game`,
    offset: 744,
    mask: 64
  }
];
var locations_default = locations;

// src/Z3rAuto.ts
var DEFAULT_TIMEOUT = 3e3;
var Z3rAuto = class extends SnesConnector_default {
  constructor(url = "ws://127.0.0.1:8080", timeout = DEFAULT_TIMEOUT) {
    super(url, timeout);
    this.sram = new Uint8Array(1280);
    this.gameStatus = 0;
  }
  async update() {
    this.sram.set(new Uint8Array(await this.getAddress(16117760, 1024)), 0);
    this.sram.set(new Uint8Array(await this.getAddress(16118784, 256)), 1024);
    this.gameStatus = new Uint8Array(await this.getAddress(16056336, 1))[0] & 255;
  }
  get status() {
    return this.gameStatus;
  }
  get items() {
    return items_default.reduce((prev, {id, name, offset, mask}) => ({
      ...prev,
      [id]: {id, name, isFound: !!(this.sram[offset] & mask)}
    }), {});
  }
  get keys() {
    return keys_default.reduce((prev, {id, name, offset, mask}) => ({
      ...prev,
      [id]: {id, name, count: this.sram[offset] & mask}
    }), {});
  }
  get bigKeys() {
    return bigKeys_default.reduce((prev, {id, name, offset, mask}) => ({
      ...prev,
      [id]: {id, name, isFound: !!(this.sram[offset] & mask)}
    }), {});
  }
  get locations() {
    return locations_default.reduce((prev, {id, name, offset, mask}) => ({
      ...prev,
      [id]: {id, name, isChecked: !!(this.sram[offset] & mask)}
    }), {});
  }
};
var Z3rAuto_default = Z3rAuto;
