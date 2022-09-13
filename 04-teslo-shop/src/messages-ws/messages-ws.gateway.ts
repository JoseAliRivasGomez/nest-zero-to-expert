import { OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { NewMessageDto } from './dto/new-message.dto';
import { MessagesWsService } from './messages-ws.service';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from 'src/auth/interfaces/jwt-payload.interface';

@WebSocketGateway({cors: true})
export class MessagesWsGateway implements OnGatewayConnection, OnGatewayDisconnect {

  @WebSocketServer() wss: Server;

  constructor(
    private readonly messagesWsService: MessagesWsService,
    private readonly jwtService: JwtService,
  ) {}

  async handleConnection(client: Socket, ...args: any[]) {

    const token = client.handshake.headers.authentication as string;

    let payload: JwtPayload;

    try {
      payload = this.jwtService.verify(token);
      await this.messagesWsService.registerClient(client, payload.id);
    } catch (error) {
      client.disconnect();
      return;
    }

    //console.log(payload);
    
    console.log('Cliente conectado:', client.id);
    console.log('Clientes conectados: ', this.messagesWsService.getConnectedClientsCount());

    this.wss.emit('clients-updated', this.messagesWsService.getConnectedClients());
    
  }

  handleDisconnect(client: Socket) {
    console.log('Cliente desconectado:', client.id);
    this.messagesWsService.removeClient(client.id);
    console.log('Clientes conectados: ', this.messagesWsService.getConnectedClientsCount());

    this.wss.emit('clients-updated', this.messagesWsService.getConnectedClients());
  }

  @SubscribeMessage('message-from-client')
  onMessageFromClient(client: Socket, payload: NewMessageDto) {
    this.wss.emit('message-from-server', { //client.emit (solo a este cliente), client.broadcast.emit (a todos los demas clientes), this.wss.emit (a todos)
      fullName: this.messagesWsService.getUserFullName(client.id),
      message: payload.message || 'no message'
    });
  }

}
