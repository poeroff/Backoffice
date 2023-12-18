export class WebSocketService {
    constructor() {
        this.connectedClients = new Set();
    }

    addClient(client) {
        this.connectedClients.add(client);
    }

    removeClient(client) {
        this.connectedClients.delete(client);
    }

    broadcastMessage(message) {
        this.connectedClients.forEach((client) => {
            client.send(message);
        });
    }
}