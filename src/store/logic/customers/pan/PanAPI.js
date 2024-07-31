import { instance } from "../../../../services/axios-config";

export function verifyPanAPI(body){
    return instance.post('/api/verify-pan.php',body)
}