import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { NinecatPostModule } from './post/post.module';
import { NinecatTagModule } from './tag/tag.module';
import { NinecatProfileModule } from './profile/profile.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        NinecatPostModule,
        NinecatTagModule,
        NinecatProfileModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NinecatEntityModule {}
