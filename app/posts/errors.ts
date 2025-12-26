import {Exception} from "../../core";

export class PostNotFoundException extends Exception {
    constructor() {
        super("Post not found", 404, "Post_Not_Found");
    }
}

Exception.addErrors("Post", [new PostNotFoundException()]);