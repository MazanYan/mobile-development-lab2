export enum Direction {
    lat,
    long
}

export class CoordinateYM {

    readonly _dir: Direction = 0;
    readonly _grad: number = 0;
    readonly _minute: number = 0;
    readonly _second: number = 0;

    constructor(dir: Direction = 0,
                grad: number = 0,
                minute: number = 0,
                second: number = 0) {
        try {
            CoordinateYM.checkGrad(grad, dir);
            CoordinateYM.checkMinSec(minute);
            CoordinateYM.checkMinSec(second);
            this._dir = dir;
            this._grad = grad;
            this._minute = minute;
            this._second = second;
        }
        catch (e) {
            console.log(e);
            return;
        }
    }

    private static checkGrad(grad: number, dir: Direction) {
        const allowedRange: number[] = dir === Direction.long ? [-90, 90] : [-180, 180];
        if (grad < allowedRange[0] || grad > allowedRange[1] || !Number.isInteger(grad)) {
            throw Error('Wrong bounds for grad');
        }
    }

    private static checkMinSec(coord: number) {
        if (coord < 0 || coord >= 60 || !Number.isInteger(coord)) {
            throw Error('Wrong bounds for minute or second');
        }
    }

    static meanCoord(coord1: CoordinateYM, coord2: CoordinateYM): CoordinateYM | undefined {
        if (coord1._dir !== coord2._dir)
            return;
        else {
            const grad = (coord1._grad + coord2._grad) / 2;
            const minute = Math.round((coord1._minute + coord2._minute) / 2);
            const second = Math.round((coord1._second + coord2._second) / 2);
            return new CoordinateYM(coord1._dir, grad, minute, second);
        }
    }

    private direction(): string {
        if (this._dir === Direction.lat)
            if (this._grad > 0)
                return 'N';
            else return 'S';
        else
            if (this._grad > 0)
                return 'E'
            else return 'W'
    }

    decimalCoord(): string {
        return `${this._grad}°${this._minute}'${this._second}'' ${this.direction()}`;
    }

    fullCoord(): string {
        const doubleCoord = this._grad + this._minute / 60 + this._second / 3600;
        return `${doubleCoord.toPrecision(6)} ${this.direction()}`;
    }
}
