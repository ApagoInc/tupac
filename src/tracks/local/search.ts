import klaw from 'klaw';
import path from 'path';
import { js2xml } from 'xml-js';

export const search = (query: string) => {
    return new Promise<string>((resolve, reject) => {
        const searchResults: klaw.Item[] = [];

        klaw(path.join(__dirname, '../../../local-files'))
            .on('data', item => {
                if (item.stats.isFile()) {
                    const path = item.path.split('local-files/')[1];
                    const pathArray = path.split('/');
                    const fileName = pathArray[pathArray.length - 1];

                    if (fileName && fileName.toLowerCase().includes(query.toLowerCase())) {
                        searchResults.push({
                            ...item,
                            path: item.path.split('local-files/')[1]
                        });
                    }
                }
            })
            .on('end', () => {
                resolve(js2xml({
                    assets: {
                        item: searchResults.map(item => {
                            const pathArray = item.path.split('/');
                            const fileName = pathArray[pathArray.length - 1];

                            return {
                                _attributes: {
                                    id: item.path.split('/').join('.'),
                                    name: fileName,
                                    fileName,
                                    remoteURL: `http://localhost:3000/public/${item.path}`
                                }
                            }
                        })
                    }
                }, { compact: true }));
            })
            .on('error', reject);
    });
}