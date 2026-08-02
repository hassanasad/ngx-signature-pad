// jsdom does not implement the canvas 2D rendering context, which signature_pad
// requires. Provide a permissive stub so components that instantiate a canvas can
// be created and destroyed during unit tests.
const noopContext = new Proxy(
  {},
  {
    get: () => () => undefined,
    set: () => true,
  },
);

HTMLCanvasElement.prototype.getContext = function (): any {
  return noopContext;
};

HTMLCanvasElement.prototype.toDataURL = function (): string {
  return 'data:image/png;base64,';
};
