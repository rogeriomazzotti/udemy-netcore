import { PaginatedResult } from "./../_models/pagination";
import { AlertifyService } from "./../_services/alertify.service";
import { ActivatedRoute } from "@angular/router";
import { AuthService } from "./../_services/auth.service";
import { UserService } from "src/app/_services/user.service";
import { Component, OnInit } from "@angular/core";
import { Message } from "../_models/Message";
import { Pagination } from "../_models/pagination";

@Component({
  selector: "app-messages",
  templateUrl: "./messages.component.html",
  styleUrls: ["./messages.component.css"]
})
export class MessagesComponent implements OnInit {
  messages: Message[];
  pagination: Pagination;
  messageContainer = "Unread";
  constructor(
    private userService: UserService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private alertify: AlertifyService
  ) {}

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.messages = data["messages"].result;
      this.pagination = data["messages"].pagination;
    });
  }
  loadMessages() {
    this.userService
      .getMessages(
        this.authService.decodedToken.nameid,
        this.pagination.currentPage,
        this.pagination.itemsPerPage,
        this.messageContainer
      )
      .subscribe(
        (res: PaginatedResult<Message[]>) => {
          this.messages = res.result;
          this.pagination = res.pagination;
        },
        error => {
          this.alertify.error(error);
        }
      );
  }
  deleteMessage(id: number) {
    this.alertify.confirm(
      "Are you sure you want to delete this message",
      () => {
        this.userService
          .deleteMessage(id, this.authService.decodedToken.nameid)
          .subscribe(
            () => {
              this.messages.splice(
                this.messages.findIndex(m => m.id === id),
                1
              );
              this.alertify.sucess("Message has been deleted");
            },
            error => {
              this.alertify.error(error);
            }
          );
      }
    );
  }
  pageChanged(event: any): void {
    this.pagination.currentPage = event.page;
    this.loadMessages();
  }
}
