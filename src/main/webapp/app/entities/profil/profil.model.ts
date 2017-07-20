import { BaseEntity } from './../../shared';

export class Profil implements BaseEntity {
    constructor(
        public id?: number,
        public score?: number,
        public userId?: number,
        public posts?: BaseEntity[],
    ) {
    }
}
