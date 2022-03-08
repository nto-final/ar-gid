export interface Route{
    id: number;
    direction: string;
    distance: number;
    destinationPointId: number;
}

export interface Point{
    id: number;
    description: string;
    name: string;
    marker: string;
    routes: number[];
}
