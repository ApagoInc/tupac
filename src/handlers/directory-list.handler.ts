import { GET, RequestHandler } from 'fastify-decorators';
import { getActiveTrack } from '../tracks';

@GET({
    url: '/'
})
export default class DirectoryListHandler extends RequestHandler {
    async handle() {
        this.reply.header('Content-Type', 'application/xml');
        return getActiveTrack().directoryList();
    }
}
