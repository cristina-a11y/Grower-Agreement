class SimpleSignaturePad {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.clear();
    this._setupEvents();
  }

  _setupEvents() {
    const draw = (event) => {
      if (!this.isDrawing) return;
      const rect = this.canvas.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      if (!this.lastX) {
        this.lastX = x;
        this.lastY = y;
      }
      this.ctx.beginPath();
      this.ctx.moveTo(this.lastX, this.lastY);
      this.ctx.lineTo(x, y);
      this.ctx.stroke();
      this.lastX = x;
      this.lastY = y;
      this._isEmpty = false;
    };

    const start = (event) => {
      event.preventDefault();
      this.isDrawing = true;
      this.lastX = null;
      this.lastY = null;
    };

    const end = () => {
      this.isDrawing = false;
      this.lastX = null;
      this.lastY = null;
    };

    this.canvas.addEventListener('pointerdown', start);
    this.canvas.addEventListener('pointermove', draw);
    window.addEventListener('pointerup', end);
  }

  clear() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this._isEmpty = true;
  }

  toDataURL() {
    return this.canvas.toDataURL();
  }

  isEmpty() {
    return this._isEmpty;
  }
}
