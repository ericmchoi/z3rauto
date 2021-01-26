type SnesRequest = {
  Opcode: string;
  Space: string;
  Flags?: string[];
  Operands?: string[];
};

const hexString = (num: number): string => num.toString(16).toUpperCase();

class SnesConnector {
  private url: string;
  private timeout: number;
  private socket: WebSocket | undefined;
  private hasRequest;

  constructor(url: string, timeout: number) {
    this.url = url;
    this.timeout = timeout;
    this.hasRequest = false;
  }

  connect(): Promise<void> {
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
      this.socket.onclose = () => reject(Error('Socket was closed.'));
    });
  }

  sendRequest(request: SnesRequest, noReply = false): Promise<unknown> {
    return new Promise((resolve, reject) => {
      if (this.hasRequest) {
        reject(Error('Connection is busy.'));
        return;
      }

      if (!this.socket || this.socket.readyState > 1) {
        reject(Error('Connection is closed.'));
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
          reject(Error('Socket was closed.'));
        };

        setTimeout(() => {
          this.hasRequest = false;
          reject(Error('Request timed out.'));
        }, this.timeout);
      }
    });
  }

  getDevices(): Promise<string[]> {
    const request = {
      Opcode: 'DeviceList',
      Space: 'SNES',
    };

    return this.sendRequest(request).then((response) => {
      const json = response as string;
      return JSON.parse(json).Results;
    });
  }

  attachToDevice(device: string): Promise<boolean> {
    return this.getDevices().then((devices) => {
      if (!devices.includes(device)) throw Error('Device not found.');

      const request = {
        Opcode: 'Attach',
        Space: 'SNES',
        Operands: [device],
      };

      return this.sendRequest(request, true) as Promise<boolean>;
    });
  }

  getAddress(offset: number, size: number): Promise<ArrayBuffer> {
    if (size > 0x400) {
      return Promise.reject(
        Error('Cannot request more than 1024 bytes of data.')
      );
    }

    const request = {
      Opcode: 'GetAddress',
      Space: 'SNES',
      Operands: [hexString(offset), hexString(size)],
    };

    return this.sendRequest(request).then((response) => {
      const blob = response as Blob;
      return blob.arrayBuffer();
    });
  }
}

export default SnesConnector;
