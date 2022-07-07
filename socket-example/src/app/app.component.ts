import { Component } from '@angular/core';
import { Message, WebsocketService } from './services/websocket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent {
  content = '';
  sent: Array<Message> = [];
  received: Array<Message> = [];

  constructor(private webSocketService: WebsocketService) {
    webSocketService.messages.subscribe(message => {
      this.received.push(message);
      console.log('response from websocket', message);
    })
  }

  sendMessage() {
    const message = {
      source: 'localhost',
      content: this.content
    }
    this.sent.push(message);
    this.webSocketService.messages.next(message);
  }
}
