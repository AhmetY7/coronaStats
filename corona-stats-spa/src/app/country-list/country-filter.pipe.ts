import { Pipe, PipeTransform } from '@angular/core';
import { StatsDaily } from '../models/StatsDaily';
import { Country } from '../models/Country';

@Pipe({
  name: 'countryFilter'
})
export class CountryFilterPipe implements PipeTransform {

  transform(stats: StatsDaily[], countries?:Country[], filterText?: string): StatsDaily[] {
    filterText = filterText?filterText.toLowerCase():null;
    return filterText?stats.filter((stat:StatsDaily) => countries[stat.countryId-1].name.toLowerCase().indexOf(filterText)!==-1):stats;
  }

}
