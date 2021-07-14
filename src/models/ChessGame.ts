import RealmConfig from 'store';
import { ChessGame as ChessGameSchema } from 'store/schema';

import Model, { Schema } from './Model';
import User from './User';

interface ChessGame {
  id: string;
  playerOneId: string;
  playerTwoId: string;
  frames: object;
  nextMoveUserId: string;
}

class ChessGame extends Model<ChessGame> {
  static Schema: Schema = ChessGameSchema;

  constructor(data: ChessGame) {
    super(data);
  }

  public static async all<K = ChessGame>() {
    return super.all<K>();
  }

  public static async find<K = ChessGame>(primaryKey: string) {
    return super.find<K>(primaryKey);
  }

  public static async findOrCreate<K = ChessGame>(primaryKey: string) {
    return super.findOrCreate<K>(primaryKey);
  }

  public static async findWhere<K = ChessGame>(predicate: string) {
    return super.findWhere<K>(predicate);
  }

  public async save() {
    RealmConfig.realmRef.realm?.write(() => {
      RealmConfig.realmRef.realm?.create('ChessGame', {
        id: `${this.playerOneId}&${this.playerTwoId}`,
        playerOneId: this.playerOneId,
        playerTwoId: this.playerTwoId,
        nextMoveUserId: this.nextMoveUserId,
      });
    });

    return await ChessGame.find(this.id);
  }
}

export default ChessGame;
