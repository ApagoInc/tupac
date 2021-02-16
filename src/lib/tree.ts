import * as Klaw from 'klaw';
import * as fs from 'fs';

export interface KlawNode {
    name: string;
    path: string;
    stats: fs.Stats;
    children: KlawNode[];
}

export const createTreeFromFlat = (items: Klaw.Item[]): KlawNode[] => {
    const itemsWithTemp = items.map(i => ({ ...i, name: i.path }));

    return itemsWithTemp.reduce((r, p) => {
        const names = p.name.split('/');

        names.reduce((q, name) => {
            let temp = q.find(o => o.name === name);
            if (!temp) q.push(temp = { name, path: p.path, stats: p.stats, children: [] });
            return temp.children;
        }, r);
        return r;
    }, [] as KlawNode[]);
}