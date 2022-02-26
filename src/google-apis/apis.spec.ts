import { mock } from "src/tests/mock";
import { GoogleApis } from 'googleapis';

describe('ApiService', () => {
    let youtube;
    beforeEach(() => {
        youtube = mock<GoogleApis>({
            youtube: jest.fn(),
        });
    })
    describe('channel', async () => {
    });
});