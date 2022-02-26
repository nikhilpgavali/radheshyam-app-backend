import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { mock } from '../tests/mock';
import { mockExecutionContext } from '../mock-testing/mocked-testing';
import { ChannelService } from '../services/channel.service';
import { setupApplication } from '../app-util';
import { ChannelController } from './channel.controller';

describe('ChannelController (Integration)', () => {
    let app: INestApplication;
    let executionContextMock = mockExecutionContext();
    const channelServiceMock = mock<ChannelService>({
        createChannel: jest.fn(),
        findChannel: jest.fn(),
    });

    beforeAll(async () => {
        const moduleFixture = await Test.createTestingModule({
            providers: [
                {
                    provide: ChannelService,
                    useValue: channelServiceMock,
                }
            ],
            controllers: [ChannelController]
        }).compile();
        app = moduleFixture.createNestApplication();
        setupApplication(app);
        await app.init();
    });

    beforeEach(() => {
        jest.resetAllMocks();
        channelServiceMock.createChannel = jest.fn();
        executionContextMock = {}
    });

    describe('channel.createChannel', () => {
        it('returns 200 when channel is created', () => {
            return request(app.getHttpServer())
                .get(`/channel.createChannel`)
                .expect(200)
                .then(() => {
                    expect(channelServiceMock.createChannel).toHaveBeenCalledWith(executionContextMock);
                });
        });
    });

    describe('channel.findChannel', () => {
        it('returns 200 when channel infomation has been sent', () => {
            return request(app.getHttpServer())
                .get(`/channel.findChannel`)
                .expect(200)
        });
    });
});