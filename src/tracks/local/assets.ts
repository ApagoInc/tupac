import path from 'path';
import fs from 'fs-extra';
import xmljs from 'xml-js';

export const assetList = async (id: string) => {
    const convertedId = id.replace('.', '/');
    const listing = await fs.readdir(path.join(__dirname, '../../../local-files', convertedId));
    const files = [];

    for (let listItem of listing) {
        const stat = await fs.stat(path.join(__dirname, '../../../local-files', convertedId, listItem));

        if (stat.isFile()) {
            files.push(listItem);
        }
    }

    return xmljs.js2xml({
        assets: {
            item: files.map(file => {
                return {
                    _attributes: {
                        id: path.join(convertedId, file).split('/').join('.'),
                        name: file,
                        fileName: file,
                        remoteURL: `http://localhost:3000/public/${convertedId}/${file}`,
                    }
                }
            })
        }
    }, { compact: true });
}