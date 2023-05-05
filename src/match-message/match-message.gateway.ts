import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from "@nestjs/websockets";
import { MatchMessage } from "ffc-prisma-package/dist/client";

@WebSocketGateway({ namespace: "match-message" })
export class MatchMessageGateway {
  @WebSocketServer() server;

  @SubscribeMessage("match-message")
  handleMessage(@MessageBody() data: string): string {
    this.server.emit("match-message-server-response", data);
    return data;
  }

  sendMessageToClient(message: MatchMessage) {
    this.server.emit("match-message", message);
  }
}
