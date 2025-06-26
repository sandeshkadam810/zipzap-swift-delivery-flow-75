
declare global {
  interface Window {
    google: {
      maps: {
        Map: new (mapDiv: Element, opts?: any) => any;
        Marker: new (opts?: any) => any;
        event: {
          addListener: (instance: any, eventName: string, handler: (event: any) => void) => void;
        };
      };
    };
  }
}

export {};
