import { ChannelRepository } from "../repositories/repository";
import { mock } from '../tests/mock';
import { ChannelService } from "./channel.service";
import { mockExecutionContext } from "../mock-testing/mocked-testing";
import { Channel } from "../repositories/entity/channel.entity";

describe('ChannelService', () => {
    let channelRepositoryMock;
    const executionContextMock = mockExecutionContext();
    let channelMock;
    beforeEach(() => {
        channelMock = new Channel({
            id: '1',
            title: 'video-title',
            profilePictureUrl: 'profile-picture-url',
            subscriptionCount: 50,
            videoCount: 12,
            videoPlaylistId: 'playlist-id-1'
        });
        channelRepositoryMock = mock<ChannelRepository>({
            createChannel: jest.fn().mockReturnValue(true),
            findChannel: jest.fn().mockReturnValue(channelMock)
        });
    });
    describe('createChannel', () => {
        it('Returns true when channel is created', async () => {
            const channelService = new ChannelService(channelRepositoryMock);
            const result = await channelService.createChannel(executionContextMock);
            expect(result).toBe(true);
        });
    });

    describe('findChannel', () => {
        it('Retuns channel information', async () => {
            const channelService = new ChannelService(channelRepositoryMock);
            const result = await channelService.findChannel();
            expect(result).toEqual(channelMock);
        });
    });
});