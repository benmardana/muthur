import { User as UserSchema } from 'store/schema';
import ChessGame from './ChessGame';
import Model from './Model';

interface User {
  id: string;
  name: string;
  chessGames: ChessGame[];
}

class User extends Model<User> {
  constructor(primaryKey?: string) {
    super();

    this.Schema = { ...UserSchema };

    if (primaryKey) {
      this.findOrCreate(primaryKey);
    }
  }
}

export default User;
