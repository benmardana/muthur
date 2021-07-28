import { ChessGame as ChessGameSchema } from 'store/schema';
import Model from './Model';

interface ChessGame {
  id: string;
  playerOneId: string;
  playerTwoId: string;
  frames: object;
  nextMoveUserId: string;
}

class ChessGame extends Model<ChessGame> {
  constructor(primaryKey?: string) {
    super();

    this.Schema = { ...ChessGameSchema };

    if (primaryKey) {
      this.findOrCreate(primaryKey);
    }
  }
}

export default ChessGame;
