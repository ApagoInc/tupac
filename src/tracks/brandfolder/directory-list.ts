export const directoryList = (): string => {
    return JSON.stringify({
        item: [
            {
                id: '1',
                name: 'Hello World'
            },
            {
                id: '2',
                name: 'Directory List 2',
                item: [
                    {
                        id: '3',
                        name: 'Nested item'
                    }
                ]
            }
        ]
    })
}