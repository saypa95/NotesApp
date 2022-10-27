import Dexie from 'dexie';

const db = new Dexie('NotesApp');
db.version(1).stores({
  notes: '++id, value, date', // Primary key and indexed props
});

export default db;