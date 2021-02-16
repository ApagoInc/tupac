import { TrackMap } from '../../types/TrackMap';
import { directoryList } from './directory-list';
import { assetList } from './assets';
import { search } from './search';

export default {
    directoryList: directoryList,
    assetList: assetList,
    search: search,
    post: () => {}
} as TrackMap;