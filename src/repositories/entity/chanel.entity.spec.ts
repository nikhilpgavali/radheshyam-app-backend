import { Channel } from './channel.entity';

describe('Channel', ()=> {
    describe('Entity', ()=> {
       it('Should populate partial data', ()=> {
        const channel = new Channel({
            id: '1',
            title: 'video-title',
            profilePictureUrl: 'profile-picture-url',
            subscriptionCount: 12,
            videoCount: 50,
            videoPlaylistId: 'video-playlist-id',
        });

        expect(channel.id).toBe('1');
        expect(channel.title).toBe('video-title');
        expect(channel.profilePictureUrl).toBe('profile-picture-url');
        expect(channel.subscriptionCount).toBe(12);
        expect(channel.videoCount).toBe(50);
        expect(channel.videoPlaylistId).toBe('video-playlist-id');
       });
    });
});