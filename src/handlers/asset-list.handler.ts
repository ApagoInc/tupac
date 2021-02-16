import { GET, RequestHandler } from 'fastify-decorators';
import { getActiveTrack } from '../tracks';

@GET({
    url: '/:id'
})
export default class AssetListHandler extends RequestHandler {
    async handle() {
        this.reply.header('Content-Type', 'application/xml');
        return getActiveTrack().assetList((this.request.params as any).id);
    }
}