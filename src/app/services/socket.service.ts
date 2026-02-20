import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';

@Injectable({
  providedIn: 'root',
})
export class SocketService {
   socket!: Socket;

  connect() {
    this.socket = io('http://localhost:5000');
  }

  listen(matchId: string, callback: () => void) {
    this.socket.on(`scoreUpdate-${matchId}`, () => {
      callback();
    });
  }
}
