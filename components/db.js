import Dexie from 'dexie';
 
console.log("dexie entered")
export const db = new Dexie('locations');
db.version(5).stores({
  locations: '++id, latitude, longitude, timestamp, accuracy', 
  locations2: '++id, latitude, longitude, timestamp, accuracy', 
});
