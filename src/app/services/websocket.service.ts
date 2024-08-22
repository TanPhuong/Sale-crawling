import { Injectable } from "@angular/core";
import { StompConfig, StompRService } from "@stomp/ng2-stompjs";
import { Message } from "@stomp/stompjs";
import { Subject, Observable } from "rxjs";
import SockJS from "sockjs-client";



@Injectable({
    providedIn: 'root'
})

export class WebSocketService {

    constructor(private stompService: StompRService) {}

    private stompConfig(): StompConfig {
        const provider = function() {
          return new SockJS('/api/socket');
        };
    
        const config = new StompConfig();
        config.url = '/api/socket';
        config.heartbeat_in = 0;
        config.heartbeat_out = 0;
        config.reconnect_delay = 10000;
    
        return config;
    }

    private init(): void {
        if(!this.stompService.connected()) {
            this.stompService.config = this.stompConfig();
            this.stompService.initAndConnect();
        }
    }

    onEvent(): Observable<Message> {
        this.init();
        return this.stompService.subscribe('/topic/products');
    }
}