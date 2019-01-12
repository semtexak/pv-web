import {IStatistics} from './i-statistics';

export interface IApplicationStatistics {

  appId: string;
  name: string;
  statistics: IStatistics[];
  total?: IStatistics;
}
