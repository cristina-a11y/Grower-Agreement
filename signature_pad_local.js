class SimpleSignaturePad {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.ctx.lineWidth = 2;
    this.ctx.lineCap = 'round';
    this.clear();
    this._setupEvents();
  }

  _setupEvents() {
    const draw = (event) => {
      if (!this.isDrawing) return;
      event.preventDefault();
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
    this.canvas.addEventListener('pointerleave', end);
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
