import axios from "axios";

const ORIGIN = "http://127.0.0.1:8000/api/";

export async function loadPath(startingPoint:number, endPoint:number) {
    var res = await axios.post(ORIGIN+'get-shortest-path', {
        starting_point: startingPoint,
        ending_point: endPoint
    })
    return res.data;
}

export async function routeIdToRoute(routeId: number) {
    var res = await axios.get(ORIGIN+'route/'+routeId.toString());
    return res.data;
}

export async function pointIdToPoint(pointId: number) {
    var res = await axios.get(ORIGIN+'point/'+pointId);
    return res.data;
}

export async function allPoints() {
    return (await axios.get(ORIGIN+"points")).data;
}