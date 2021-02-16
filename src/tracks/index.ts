import { TrackMap } from '../types/TrackMap';
import localTrackmap from './local';

export const getActiveTrack = (): TrackMap => {
    return localTrackmap;
}