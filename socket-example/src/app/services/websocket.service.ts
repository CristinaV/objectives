import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs';
import { AnonymousSubject, Subject } from 'rxjs/internal/Subject';
import { map } from 'rxjs/operators';

/** The url of the server */
const CHAT_URL = 'ws://localhost:5000';

/** The message model */
export interface Message {
  source: string;
  content: string;
}

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  /** The AnonymousSubject class allows extending a Subject by defining the source and destination observables */
  private subject: AnonymousSubject<MessageEvent> | undefined;
  /** The subject that will act as an Observable and an Observer */
  public messages: Subject<Message>;

  constructor() {
    /** Connect to the server and subscribe to the data received from it */
    this.messages = <Subject<Message>>this.connect(CHAT_URL).pipe(
      map(
        (response: MessageEvent): Message => {
          console.log('here is connection response', response.data);
          let data = JSON.parse(response.data);
          return data;
        }
      )
    );
  }

  /** Connect to the server if the connection was not previously established or return the current connection */
  public connect(url: string): AnonymousSubject<MessageEvent> {
    if (!this.subject) {
      this.subject = this.create(url);
      console.log('successfully connected: ', url);
    }
    return this.subject;
  }

  /** This method creates the AnonymousSubject that will be used for subscriptions */
  private create(url: string): AnonymousSubject<MessageEvent> {
    let ws = new WebSocket(url);
    let observable = new Observable((obs: Observer<MessageEvent>) => {
      ws.onmessage = obs.next.bind(obs);
      ws.onerror = obs.error.bind(obs);
      ws.onclose = obs.complete.bind(obs);
      return ws.close.bind(ws);
    });
    /** Send the message to the websocket */
    let observer = {
      error: null,
      complete: null,
      next: (data: Object) => {
        console.log('Message sent to websocket: ', data);
        if (ws.readyState === WebSocket.OPEN) {
          ws.send(JSON.stringify(data));
        }
      }
    };
    // @ts-ignore
    return new AnonymousSubject<MessageEvent>(observer, observable);
  }

}
