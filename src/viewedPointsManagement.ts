export class ViewedPoints {
    points_ids: number[] = [];
    used: number[] = [];
    constructor(points_ids: number[]) {
        this.points_ids = points_ids;
        this.used = new Array(points_ids.length, 0);
    }
    setViewed(viewed_point_id: number) {
        for (var i = 0; i < this.points_ids.length; ++i) {
            if (viewed_point_id == this.points_ids[i]) {
                this.used[i] = 1;
            }
        }
    }
    getNearestNotViewed() {
        for (var i = 0; i < this.points_ids.length; ++i) {
            if (!this.used[i]) return this.points_ids[i];
        }
        return null;
    }
}