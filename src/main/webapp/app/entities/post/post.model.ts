import { BaseEntity } from './../../shared';

export class Post implements BaseEntity {
    constructor(
        public id?: number,
        public imageContentType?: string,
        public image?: any,
        public title?: string,
        public score?: number,
        public profileId?: number,
        public tags?: BaseEntity[],
    ) {
    }
}
