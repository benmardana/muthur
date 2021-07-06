import { join } from 'path';

interface Player {
  uuid: string;
  name?: string;
}

interface Frame {
  id: string;
  fen: string;
  lastMove: string;
  timestamp: string;
}

interface Game {
  uuid: string;
  players?: Player[];
  frames?: Frame[];
  nextMove?: Player['uuid'];
}

export interface Data {
  games: Game[];
  players: Player[];
}

export default {};
