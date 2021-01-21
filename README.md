# z3rAuto

Promise-based library for autotracking game progression in _A Link to the Past Randomizer_

## Prerequisites

This library uses **QUsb2snes** or usb2snes to read memory values from your device. Please visit their [website](http://usb2snes.com/) for details and setup instructions.

## Usage

```js
import Z3rAuto from 'z3rauto';

(async () => {
  const z3r = new Z3rAuto();

  // connect to QUsb2Snes
  await z3r.connect();

  // attach to the SNES device
  const devices = await z3r.getDevices();
  await z3r.attachToDevice(devices[0]);

  // update read memory values
  await z3r.update();

  // tracked values
  const items = z3r.items;
  const keys = z3r.keys;
  const bigKeys = z3r.bigKeys;
  const locations = z3r.locations;

  console.log(items.bow);
  // > {id: "bow", name: "Bow", isFound: false}
})();
```
