import { directoryList } from './directory-list';
import { TrackMap } from '../../types/TrackMap';

export default {
    directoryList: directoryList,
    assetList: (id: string) => {},
    search: (search: string) => {},
    post: (id: string) => {}
} as TrackMap;
