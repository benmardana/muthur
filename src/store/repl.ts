import realmInstance from './realm';
const repl = require('repl').start({ useGlobal: true });
repl.context['realmInstance'] = realmInstance;
