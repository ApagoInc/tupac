import path from 'path';
import klaw from 'klaw';
import xmljs from 'xml-js';
import { Directory, DirectoryItem } from '../../types/Directory';
import { createTreeFromFlat, KlawNode } from '../../lib/tree';

export const directoryList = () => {
    return new Promise<string>((resolve, reject) => {
        const items: klaw.Item[] = [];

        klaw(path.join(__dirname, '../../../local-files'))
            .on('data', item => {
                if (item.stats.isDirectory()) {
                    const path = item.path.split('local-files/')[1];

                    if (path) {
                        items.push({
                            ...item,
                            path: item.path.split('local-files/')[1]
                        });
                    }
                }
            })
            .on('end', () => {
                const mapFunc = (item: KlawNode): DirectoryItem => {
                    return {
                        _attributes: {
                            id: item.path.split('/').join('.'),
                            name: item.name,
                        },
                        item: item.children.length > 0 ? item.children.map(mapFunc) : []
                    }
                }

                const directory: Directory = {
                    item: createTreeFromFlat(items).map(mapFunc)
                }

                const xml = xmljs.js2xml({
                    directories: {
                        item: directory.item
                    }
                }, { compact: true });

                resolve(xml);
            })
            .on('error', reject);
    });
}