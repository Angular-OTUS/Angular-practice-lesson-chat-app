import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { AuthService, ChatService } from "../../services";

@Component({
  selector: 'app-chat',
  templateUrl: 'chat.component.html',
  styleUrls: ['chat.component.scss'],
})
export class ChatComponent implements OnInit, OnDestroy {
  form = new FormGroup({
    message: new FormControl('', [Validators.required]),
  });
  user = this.authService.getUser();
  // messages = this.chatService.messages;

  constructor(
    private authService: AuthService,
    public chatService: ChatService,
  ) {}

  ngOnInit() {
    if (!this.authService.isLoggedIn()) {
      this.authService.logout();
      return;
    }
    this.chatService.startListenMessages();
  }

  ngOnDestroy() {
    this.chatService.stopListenMessages();
  }

  sendMessage() {
    const message = this.form.controls.message.value;

    this.chatService.sendMessage(message);
    this.form.reset();
  }

  logout() {
    this.authService.logout();
  }
}
