export class Exception {
    constructor(status, message) {
        this.status = status;
        this.success = false;
        this.message = message;
    }

    exceptionServer = () => {
        return {
            status: 500,
            success: false,
            message: '서버에서 예기치 못한 오류가 발생하였습니다.',
        };
    };
}
