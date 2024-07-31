import { instance } from "../../../services/axios-config";

export function fetchPostCodeDetailsAPI(postCode){
    return instance.post('/api/get-postcode-details.php',{postcode:postCode})
}