import { Component } from '@angular/core';
import { Message, WebsocketService } from './services/websocket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent {
  /** The value from the input */
  content = '';
  /** List of sent messages */
  sent: Array<Message> = [];
  /** List of received messages */
  received: Array<Message> = [];

  constructor(private webSocketService: WebsocketService) {
    /** Subscribe to the messages subject and push the received message to the received array */
    webSocketService.messages.subscribe(message => {
      this.received.push(message);
      console.log('response from websocket', message);
    })
  }

  sendMessage() {
    /** Create the message based on the model defined in the websocket service and add it to the sent array, and notify the messages subject a new message was submitted */
    const message = {
      source: 'localhost',
      content: this.content
    }
    this.content = '';
    this.sent.push(message);
    this.webSocketService.messages.next(message);
  }
}
