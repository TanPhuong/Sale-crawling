export class OrderDTO {
    createAt?: String;

    product: any;

    user: any;

    constructor(data: any) {
        this.createAt = data.createAt;
        this.product = data.product;
        this.user = data.user;
    }
}