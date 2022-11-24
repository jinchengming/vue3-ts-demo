import { LoginUser } from "@/type/login";
import service from ".";

export function login(data: LoginUser){
    return service({
        url: '/login',
        method: 'post',
        data
    })
}