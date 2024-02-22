class PubSub {
    constructor() {
      this.events = {};
    }
  
    subscribe(event, callback) {
      if (!this.events[event]) {
        this.events[event] = [];
      }
      this.events[event].push(callback);
  
      // Return an object with the event name and index for easy unsubscription
      return {
        eventName: event,
        index: this.events[event].length - 1
      };
    }
  
    unsubscribe(subscription) {
      const { eventName, index } = subscription;
      if (this.events[eventName]) {
        this.events[eventName].splice(index, 1);
      }
    }
  
    publish(event, data) {
      if (!this.events[event]) {
        return;
      }
      this.events[event].forEach(callback => callback(data));
    }
  }
  
  const pubSub = new PubSub();
  export default pubSub;