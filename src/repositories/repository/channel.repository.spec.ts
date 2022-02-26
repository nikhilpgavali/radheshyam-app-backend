import { ApiService } from "src/google-apis/apis";
import { EntityManager } from "typeorm";
import { ChannelRepository } from "./channel.repository";
import { mockExecutionContext } from "../../mock-testing/mocked-testing";
import { mock } from '../../tests/mock'
import { Channel } from "../entity/channel.entity";

describe('ChannelRepository', () => {
    let readEntityManager;
    let writeEntityManager;
    let googleApiServiceMock;
    let executionContextMock = mockExecutionContext();
    let channelMock;

    beforeEach(() => {
        jest.resetAllMocks();
        channelMock = new Channel({
            id: '1',
            title: 'video-title',
            profilePictureUrl: 'profile-picture-url',
            subscriptionCount: 50,
            videoCount: 12,
            videoPlaylistId: 'playlist-id-1'
        });
        readEntityManager = mock<EntityManager>({});
        writeEntityManager = mock<EntityManager>({});
        googleApiServiceMock = mock<ApiService>({
            channel: jest.fn().mockReturnValue(
                channelMock
            ),
        });
    });

    describe('createChannel', () => {
        it('should return true when channel is created', async () => {
            writeEntityManager = mock<EntityManager>({
                save: jest.fn().mockReturnValue(true),
            });
            const channelRepository = new ChannelRepository(readEntityManager, writeEntityManager, googleApiServiceMock);
            const result = await channelRepository.createChannel(executionContextMock);
            expect(result).toBeTruthy();
            expect(writeEntityManager.save).toHaveBeenCalledWith(Channel, channelMock);
        });
    });

    describe('findChannel', () => {
        it('should return the channel information', async () => {
            let queryBuilderMock = {
                select: jest.fn().mockReturnThis(),
                getOne: jest.fn().mockResolvedValue(channelMock),
            };

            readEntityManager = mock<EntityManager>({
                createQueryBuilder: jest.fn().mockImplementation(() => queryBuilderMock),
            });

            const channelRepository = new ChannelRepository(readEntityManager, writeEntityManager, googleApiServiceMock);
            const result = await channelRepository.findChannel();
            expect(result).toEqual(channelMock);
            expect(queryBuilderMock.select).toHaveBeenCalledWith('channel');
            expect(queryBuilderMock.getOne).toHaveBeenCalledWith();
            expect(queryBuilderMock.getOne).toHaveBeenCalledTimes(1);
        });
    });
});