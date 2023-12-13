export class Success {
    constructor(status, message, data) {
        this.status = status;
        this.success = true;
        this.message = message;
        this.data = data;
    }
}
