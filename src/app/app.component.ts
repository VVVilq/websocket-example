import { Component, OnInit, NgZone } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'testowanie';

  stompClient: any;
  
  constructor(private http: HttpClient,private zone: NgZone) { }

  ngOnInit() {


    

  }


  onclick(token){
    var socket = new SockJS('http://localhost:8080/chat');
    this.stompClient = Stomp.over(socket);
    const _this = this;
    _this.stompClient.connect({'Auth-Token': token}, function (frame) {
      _this.stompClient.subscribe('/user/queue/notification', function (greeting) {
            console.log(greeting.body);
        });
    });

  }

  
}
