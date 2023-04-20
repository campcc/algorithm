class EventEmitter {
  constructor() {
    this.eventMap = {};
  }

  on(eventName, handler) {
    const queue = this.eventMap[eventName];
    if (!queue) {
      this.eventMap[eventName] = [];
    }
    this.eventMap[eventName].push(handler);
  }

  emit(eventName, payload) {
    if (this.eventMap[eventName]) {
      this.eventMap[eventName].forEach((handler) => handler(payload));
    }
  }

  off(eventName, handler) {
    const queue = this.eventMap[eventName];
    if (queue) {
      queue.split(queue.indexOf(handler) >>> 0, 1);
    }
  }
}
