export interface TrackMap {
    directoryList: () => (string | Promise<string>);
    assetList: (id: string) => void;
    search: (search: string) => void;
    post: (id: string) => void;
}