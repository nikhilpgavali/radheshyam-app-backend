import { Video } from "./video.entity";

describe('Video', ()=> {
    describe('Entity', ()=> {
        it('Should populate the partial data', ()=> {
            const video = new Video({
                id: '1',
                title: 'video-title',
                videoId: 'video-id-1',
                channelId: 'channel-id',
                publishedAt: new Date(1462361249717),
                videoDescription: 'video-description',
                thumbnails: 'thumbnail-url',
                channelTitle: 'channel-title',
                liveBroadcastContent: 'live-brodcast-cotent',
                publishedTitle: 'published-title',
            });
            expect(video.id).toBe('1');
            expect(video.title).toBe('video-title');
            expect(video.videoId).toBe('video-id-1');
            expect(video.channelId).toBe('channel-id');
            expect(video.publishedAt).toEqual(new Date('2016-05-04T11:27:29.717Z'),);
            expect(video.videoDescription).toBe('video-description');
            expect(video.thumbnails).toBe('thumbnail-url');
            expect(video.channelTitle).toBe('channel-title');
            expect(video.liveBroadcastContent).toBe('live-brodcast-cotent');
            expect(video.publishedTitle).toBe('published-title');
        });
    });
});