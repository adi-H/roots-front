import { io, Socket } from "socket.io-client";
import { Unit, User } from "../types/types";
import config from "../config/config";

interface ServerToClientEvents {
  sendCompany: (company: Unit) => void;
}

interface ClientToServerEvents {
  auth: (jwt: string) => void;
}

export class SocketIOService {
  public static socket: Socket<ServerToClientEvents, ClientToServerEvents>;

  public static async initialize() {
    this.socket = io(config.serverUrl, { withCredentials: true });
  }

  public static async auth(jwt: string) {
    this.socket.emit("auth", jwt);
  }
}

SocketIOService.initialize();
