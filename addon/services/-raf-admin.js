import Service from '@ember/service';

/**
 * ensure use on requestAnimationFrame, no matter how many components
 * on the page are using this mixin
 *
 * @class RAFAdmin
 */
export default class RAFAdmin extends Service {
  init(...args) {
    super.init(...args);
    this.pool = [];
    this.flush();
  }

  flush() {
    window.requestAnimationFrame(() => {
      // assign to a variable to avoid ensure no race conditions happen
      // b/w flushing the pool and interating through the pool
      let pool = this.pool;
      this.reset();
      pool.forEach((item) => {
        item[Object.keys(item)[0]]();
      });

      this.flush();
    });
  }

  add(elementId, fn) {
    this.pool.push({ [elementId]: fn });
    return fn;
  }

  remove(elementId) {
    this.pool = this.pool.filter(obj => !obj[elementId]);
  }

  reset() {
    this.pool = [];
  }
}
