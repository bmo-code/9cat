import { BaseEntity } from './../../shared';

export class Profile implements BaseEntity {
    constructor(
        public id?: number,
        public score?: number,
        public userId?: number,
        public posts?: BaseEntity[],
    ) {
    }
}
