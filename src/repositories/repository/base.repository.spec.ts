import { EntityManager } from "typeorm";
import { Channel } from "../entity/channel.entity";
import { BaseRepository } from "./base.repository";
import { mock } from '../../tests/mock';
import { mockExecutionContext } from "../../mock-testing/mocked-testing";
import { EntityNotFoundException } from "../../exceptions";

class TestChannelRepository extends BaseRepository<Channel> {
    constructor(
        readEntityManager: EntityManager,
        writeEntityManager: EntityManager,
    ) {
        super(Channel, readEntityManager, writeEntityManager);
    }
}

describe('BaseRepository', () => {
    const executionContextMock = mockExecutionContext();
    let readEntityManager;
    let writeEntityManager;

    beforeEach(() => {
        readEntityManager = mock<EntityManager>({});
        writeEntityManager = mock<EntityManager>({});
    });

    describe('findOne', () => {
        it('Should call the findOne with the read entity manager', async () => {
            readEntityManager = mock<EntityManager>({
                findOne: jest.fn().mockReturnValue(new Channel({ id: '1', title: 'channel-title' })),
            });

            const channelRepository = new TestChannelRepository(
                readEntityManager,
                writeEntityManager
            );

            const result = await channelRepository.findOne('1');
            expect(result.id).toBe('1');
            expect(result.title).toBe('channel-title');
            expect(readEntityManager.findOne).toHaveBeenCalledWith(Channel, '1', {});
        });

        it('should call the findOne with the wrte entity manager', async () => {
            const executionContextMock = mockExecutionContext({ userEntityManager: false });

            writeEntityManager = mock<EntityManager>({
                findOne: jest.fn().mockReturnValue(new Channel({ id: '1', title: 'channel-title' })),
            });

            const channelRepository = new TestChannelRepository(
                readEntityManager, writeEntityManager
            );

            const result = await channelRepository.findOne('1', {}, executionContextMock);
            expect(result.id).toBe('1');
            expect(result.title).toBe('channel-title');
            expect(writeEntityManager.findOne).toHaveBeenCalledWith(Channel, '1', {});
        });

        it('should throw an exception when not found calling the findone method', async () => {
            readEntityManager = mock<EntityManager>({
                findOne: jest.fn().mockReturnValue(undefined),
            });

            const channelRepository = new TestChannelRepository(
                readEntityManager, writeEntityManager,
            );

            await expect(channelRepository.findOne('1')).rejects.toThrow(EntityNotFoundException);
        });
    });

    describe('update', () => {
        it('should run the query properly', async () => {
            let channelMockId = '1';
            const queryBuilderMock = {
                update: jest.fn().mockReturnThis(),
                set: jest.fn().mockReturnThis(),
                where: jest.fn().mockReturnThis(),
                andWhere: jest.fn().mockReturnThis(),
                execute: jest.fn().mockResolvedValue(true),
            };

            writeEntityManager = mock<EntityManager>({
                createQueryBuilder: jest.fn().mockImplementation(() => queryBuilderMock),
                findOne: jest.fn().mockReturnValue(new Channel()),
            });


            const channelRepository = new TestChannelRepository(readEntityManager, writeEntityManager);

            const result = await channelRepository.update('1', { title: 'New-Video' }, executionContextMock);
            expect(result).toBeDefined();
            expect(queryBuilderMock.update).toHaveBeenCalledWith(Channel);
            expect(queryBuilderMock.update).toHaveBeenCalledTimes(1);

            expect(queryBuilderMock.set).toHaveBeenCalledWith({ title: 'New-Video' });
            expect(queryBuilderMock.set).toHaveBeenCalledTimes(1);

            expect(queryBuilderMock.where).toHaveBeenCalledWith('id = :id', { id: channelMockId });
            expect(queryBuilderMock.where).toHaveBeenCalledTimes(1);

            expect(queryBuilderMock.execute).toHaveBeenCalledWith();
            expect(queryBuilderMock.execute).toHaveBeenCalledTimes(1);

            expect(writeEntityManager.findOne).toHaveBeenCalledWith(Channel, '1');

        });
    });

    describe('create', () => {
        it('should run the query properly', async () => {
            writeEntityManager = mock<EntityManager>({
                save: jest.fn().mockResolvedValue(new Channel({ id: '1' })),
            });

            const channelRepository = new TestChannelRepository(readEntityManager, writeEntityManager);

            await channelRepository.create(new Channel({ title: 'channel-video' }), executionContextMock);

            expect(writeEntityManager.save).toHaveBeenCalledWith(Channel, { title: 'channel-video' });
        });
    });

});