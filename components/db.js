import Dexie from 'dexie';
 
console.log("dexie entered")
export const db = new Dexie('locations');
db.version(4).stores({
  locations: '++id, latitude, longitude, timestamp, accuracy', 
});
