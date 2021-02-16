export interface DirectoryItem {
    _attributes: {
        id: string;
        name: string;
    };
    item?: DirectoryItem[];
}

export interface Directory {
    item: DirectoryItem[];
}
