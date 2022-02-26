import { Controller, Get, HttpCode } from "@nestjs/common";
import { ExecutionContext } from "../interfaces";
import { ChannelService } from '../services/channel.service';

@Controller()
export class ChannelController {
    constructor(private readonly channelService: ChannelService) { }

    /**
     * Channel to be created
     * @returns {Promise<boolean>}    - Returns true
     */
    @Get('channel.createChannel')
    @HttpCode(200)
    async createChannel(): Promise<boolean> {
        console.log("assasa");
        let executionContext: ExecutionContext = {};
        return await this.channelService.createChannel(executionContext);
    }


    /**
     * Returns channel information
     */
    @Get('channel.findChannel')
    @HttpCode(200)
    async findChannel() {
        return await this.channelService.findChannel();
    }
}