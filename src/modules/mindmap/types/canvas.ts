import { v4 as uuidv4 } from 'uuid';

export class Canvas {
  id: string;
  x: number;
  y: number;
  scale: number;
  initialPanX: number;
  initialPanY: number;
  cursorX: number;
  cursorY: number;
  cursorScreenX: number;
  cursorScreenY: number;
  isPanning: boolean;
  isZooming: boolean;
  listeners: {
    pan: (event: MouseEvent) => void;
  };

  constructor() {
    this.id = uuidv4();
    this.x = 0;
    this.y = 0;
    this.scale = 1;
    this.initialPanX = 0;
    this.initialPanY = 0;
    this.cursorX = 0;
    this.cursorY = 0;
    this.cursorScreenX = 0;
    this.cursorScreenY = 0;
    this.isPanning = false;
    this.isZooming = false;
    this.listeners = {
      pan: this.#pan.bind(this),
    };

    window.addEventListener('mousemove', this.#updateCursorPosition.bind(this));
  }

  #updateCursorPosition(event: MouseEvent) {
    this.cursorScreenX = event.clientX;
    this.cursorScreenY = event.clientY;

    const canvasEvent = this.toCanvasSpaceEvent(event);
    this.cursorX = canvasEvent.clientX;
    this.cursorY = canvasEvent.clientY;
  }

  pan(event: MouseEvent) {
    if (this.isZooming || this.isPanning) return;

    this.isPanning = true;
    this.initialPanX = event.clientX;
    this.initialPanY = event.clientY;

    window.addEventListener('mousemove', this.listeners.pan);
    window.addEventListener('mouseup', this.#panEnd.bind(this), { once: true });
  }

  #pan(event: MouseEvent) {
    const dx = event.clientX - this.initialPanX;
    const dy = event.clientY - this.initialPanY;

    this.x += dx;
    this.y += dy;

    this.initialPanX = event.clientX;
    this.initialPanY = event.clientY;
  }

  #panEnd() {
    this.isPanning = false;
    this.initialPanX = 0;
    this.initialPanY = 0;

    window.removeEventListener('mousemove', this.listeners.pan);
  }

  zoom(event: WheelEvent) {
    if (this.isZooming || this.isPanning) return;

    const delta = event.deltaY;
    const factor = 0.15 * this.scale;
    const nextScale = delta > 0 ? this.scale - factor : this.scale + factor;
    const ratio = 1 - nextScale / this.scale;
    const { x: cursorX, y: cursorY } = this.toScreenSpace(
      this.cursorX,
      this.cursorY
    );

    this.x += (cursorX - this.x) * ratio;
    this.y += (cursorY - this.y) * ratio;
    this.scale = nextScale;
  }

  reset() {
    this.x = 0;
    this.y = 0;
    this.scale = 1;
  }

  toCanvasSpace(x: number, y: number) {
    const el = document.getElementById(this.id);
    if (!el) return { x, y };

    const rect = el.getBoundingClientRect();

    return {
      x: (x - rect.left) / this.scale,
      y: (y - rect.top) / this.scale,
    };
  }

  toCanvasSpaceEvent(event: MouseEvent): MouseEvent {
    if ((event as any).normalized) return event;

    const { x, y } = this.toCanvasSpace(event.clientX, event.clientY);
    return new MouseEvent(event.type, {
      ...event,
      clientX: x,
      clientY: y,
      normalized: true,
    } as MouseEventInit);
  }

  toScreenSpace(x: number, y: number) {
    const el = document.getElementById(this.id);
    if (!el) return { x, y };

    const rect = el.getBoundingClientRect();

    return {
      x: x * this.scale + rect.left,
      y: y * this.scale + rect.top,
    };
  }

  toScreenSpaceEvent(event: MouseEvent): MouseEvent {
    if ((event as any).normalized) return event;

    const { x, y } = this.toScreenSpace(event.clientX, event.clientY);
    return new MouseEvent(event.type, {
      ...event,
      clientX: x,
      clientY: y,
      normalized: true,
    } as MouseEventInit);
  }
}