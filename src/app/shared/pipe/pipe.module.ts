import {NgModule} from '@angular/core';
import {PricePipe} from './pipe/price.pipe';
import { TruncatePipe } from './pipe/truncate.pipe';


@NgModule({
    imports: [],
    declarations: [PricePipe, TruncatePipe],
    exports: [PricePipe, TruncatePipe]
})
export class PipeModule {

}
