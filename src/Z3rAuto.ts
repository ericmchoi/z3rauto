import SnesConnector from './SnesConnector';
import items from './items';
import equips from './equips';
import keys from './keys';
import bigKeys from './bigKeys';
import locations from './locations';

const DEFAULT_TIMEOUT = 3000;

type Item = {
  id: string;
  name: string;
  isFound: boolean;
};

type Equip = {
  id: string;
  name: string;
  level: number;
};

type Key = {
  id: string;
  name: string;
  count: number;
};

type BigKey = {
  id: string;
  name: string;
  isFound: boolean;
};

type Location = {
  id: string;
  name: string;
  isChecked: boolean;
};

type TrackedValues<T> = {
  [key: string]: T;
};

class Z3rAuto extends SnesConnector {
  private sram: Uint8Array;
  private gameStatus: number;

  constructor(url = 'ws://127.0.0.1:8080', timeout = DEFAULT_TIMEOUT) {
    super(url, timeout);
    this.sram = new Uint8Array(0x500);
    this.gameStatus = 0x0;
  }

  async update(): Promise<void> {
    this.sram.set(new Uint8Array(await this.getAddress(0xf5f000, 0x400)), 0);
    this.sram.set(
      new Uint8Array(await this.getAddress(0xf5f400, 0x100)),
      0x400
    );

    this.gameStatus =
      new Uint8Array(await this.getAddress(0xf50010, 0x1))[0x0] & 0xff;
  }

  get status(): number {
    return this.gameStatus;
  }

  get items(): TrackedValues<Item> {
    return items.reduce(
      (prev, { id, name, offset, mask }) => ({
        ...prev,
        [id]: { id, name, isFound: !!(this.sram[offset] & mask) },
      }),
      {}
    );
  }

  get equips(): TrackedValues<Equip> {
    return equips.reduce(
      (prev, { id, name, offset, mask }) => ({
        ...prev,
        [id]: { id, name, level: this.sram[offset] & mask },
      }),
      {}
    );
  }

  get keys(): TrackedValues<Key> {
    return keys.reduce(
      (prev, { id, name, offset, mask }) => ({
        ...prev,
        [id]: { id, name, count: this.sram[offset] & mask },
      }),
      {}
    );
  }

  get bigKeys(): TrackedValues<BigKey> {
    return bigKeys.reduce(
      (prev, { id, name, offset, mask }) => ({
        ...prev,
        [id]: { id, name, isFound: !!(this.sram[offset] & mask) },
      }),
      {}
    );
  }

  get locations(): TrackedValues<Location> {
    return locations.reduce(
      (prev, { id, name, offset, mask }) => ({
        ...prev,
        [id]: { id, name, isChecked: !!(this.sram[offset] & mask) },
      }),
      {}
    );
  }
}

export default Z3rAuto;
