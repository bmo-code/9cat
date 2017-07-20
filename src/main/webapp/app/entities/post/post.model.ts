import { BaseEntity } from './../../shared';

export class Post implements BaseEntity {
    constructor(
        public id?: number,
        public imageContentType?: string,
        public image?: any,
        public upvote?: number,
        public downvote?: number,
        public profilId?: number,
        public tags?: BaseEntity[],
    ) {
    }
}
