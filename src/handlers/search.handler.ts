import { GET, RequestHandler } from 'fastify-decorators';
import { getActiveTrack } from '../tracks';

@GET({
    url: '/search'
})
export default class SearchHandler extends RequestHandler {
    async handle() {
        this.reply.header('Content-Type', 'application/xml');
        return getActiveTrack().search((this.request.query as any).search);
    }
}