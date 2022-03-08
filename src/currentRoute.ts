import {Route, Point} from "./types"; 
import {loadPath, pointIdToPoint, routeIdToRoute} from "./services";
import {imageTracker} from "./imageTracker";
import {viewedPoints} from "./index";


class CurrentRouteStore {
    private routes: Route[] = [];
    private currentDestinationPoint: Point|null = null;
    private currentRouteId:number = 0;
    constructor() {}

    public getCurrentDestinationPoint()  {return this.currentDestinationPoint}
    private setRoutes(routes: Route[]) {
        this.routes = routes;
        this.setCurrentRouteId(0);
    }
    private setCurrentRouteId(routeId: number) {
        if (this.routes.length <= routeId && routeId != 0) {
            var newPoint = viewedPoints.getNearestNotViewed();
            if (newPoint == null) return;
            currentRouteStore.setShortestPathToRoutes(this.currentDestinationPoint!.id, newPoint);
        }
        this.currentRouteId = routeId;
        if (routeId != 0) viewedPoints.setViewed(this.currentDestinationPoint!.id);
        pointIdToPoint(this.routes[this.currentRouteId].destinationPointId).then(
            (e) => {
                this.currentDestinationPoint = e;
                console.log(this.routes);
                if (this.currentDestinationPoint?.id == this.routes[this.routes.length-1].destinationPointId) {
                    imageTracker.create(this.currentDestinationPoint?.marker!, "END");
                }
                else{
                    imageTracker.create(this.currentDestinationPoint?.marker!, this.routes[this.currentRouteId].direction);
                }
                (document.getElementById("point") as HTMLElement).innerHTML = "Идите к точке: " + this.currentDestinationPoint?.name;
            });
    }
    public setShortestPathToRoutes(startingPointId: number, endingPointId: number) {
        if (startingPointId == undefined || endingPointId == undefined) return;
        console.log(startingPointId, endingPointId);
        loadPath(startingPointId, endingPointId).then( async (e:any) => {
            console.log(e.routes);
            var routes: Route[] = [];
            await Promise.all(e.routes.map(async (ee: number) => {
                const route = await routeIdToRoute(ee);
                routes.push(route);
            }));
            var sorted_routes = [];
            console.log(routes.length);
            for (var i = 0; i < routes.length; ++i) {
                for (var j = 0; j < routes.length; ++j) {
                    if (e.routes[i] == routes[j].id) {
                        sorted_routes.push(routes[j]);
                    }
                }
            }
            console.log(sorted_routes);
            this.setRoutes(sorted_routes);
        })
    }
    public incrementRouteId() {
        this.setCurrentRouteId(this.currentRouteId+1);
    }
}

export const currentRouteStore = new CurrentRouteStore();