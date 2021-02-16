import fastify from 'fastify';
import { bootstrap } from 'fastify-decorators';
import fastifyStatic from 'fastify-static';
import path from 'path';
import 'reflect-metadata';

const app = fastify({
    logger: true
});

app.register(bootstrap, {
    // Specify directory with our handler
    directory: path.resolve(__dirname, `handlers`),

    // Specify mask to match only our handler
    mask: /\.handler\./,
});

app.register(fastifyStatic, {
    root: path.join(__dirname, '../local-files/'),
    prefix: '/public/', // optional: default '/'
})

app.listen(3000, (err, address) => {
    if (err) {
        console.error(err);
        process.exit(1);
    }

    app.log.info(`[Tupac] Server listening on ${address}`);
});

