import { Injectable } from '@angular/core';

import { AuthService } from './auth.service';
import { HttpClient } from "@angular/common/http";

export type Message = {
  id: number;
  user: string;
  message: string;
};

const ServerURL = 'http://localhost:3000';

@Injectable()
export class ChatService {
  private messagesList: Message[] = [];

  get messages() {
    return this.messagesList;
  }

  private interval: number|null = null;

  constructor(
    private authService: AuthService,
    private http: HttpClient,
  ) {}

  startListenMessages() {
    this.stopListenMessages();
    this.loadMessages();
    this.interval = setInterval(() => {
      this.loadMessages();
    }, 1000);
  }

  stopListenMessages() {
    if (this.interval != null) {
      clearInterval(this.interval);
      this.interval = null;
    }
  }

  private loadMessages() {
    this.http.get<Message[]>(ServerURL + '/messages').toPromise().then((messages: Message[]) => {
      this.messagesList = messages;
    });
  }

  sendMessage(message: string) {
    if (this.authService.isLoggedIn()) {
      this.http.post<Message>(ServerURL + '/messages', {
        user: this.authService.getUser(),
        message,
      }).toPromise().then((message: Message) => {
        this.messagesList = [
          ...this.messages,
          message,
        ];
      });
    }
  }
}
