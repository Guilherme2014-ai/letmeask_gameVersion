// Dependencies
import { push, ref, ThenableReference, query, get } from "firebase/database";
import { database as Database } from "../libs/firebase";

// Interfaces
import { IRoom } from "../interfaces/IRoomInsert";

export class Room {
  private database = Database;
  private roomsRef = ref(this.database, "rooms");

  async Create(roomData: IRoom): Promise<ThenableReference> {
    try {
      return await push(this.roomsRef, roomData);
    } catch (e) {
      throw e;
    }
  }

  // Talvez desacoplar as references do hook
  async hasBeenClosed(roomCode: string) {
    const roomReference = ref(this.database, `/rooms/${roomCode}`);
    const roomQuery = query(roomReference);
    const roomSnapshot = await get(roomQuery);

    return roomSnapshot.child("closedAt").exists();
  }

  async roomExists(roomCode: string) {
    try {
      const roomsRef = ref(this.database, `rooms/${roomCode}`);
      const queryVal = query(roomsRef);
      const exists = (await get(queryVal)).exists();

      return exists;
    } catch (e) {
      throw e;
    }
  }
}
