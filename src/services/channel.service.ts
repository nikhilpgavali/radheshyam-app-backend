import { Injectable } from "@nestjs/common";
import { Channel } from "src/repositories/entity/channel.entity";
import { ExecutionContext } from "../interfaces";
import { ChannelRepository } from '../repositories/repository/channel.repository';
@Injectable()
export class ChannelService {
    constructor(protected readonly channelRepository: ChannelRepository) { }

    /**
     * Returns true when channel is created
     * @param executionContext {ExecutionContext}
     * @returns returns true when channel is created
     */
    async createChannel(executionContext: ExecutionContext): Promise<boolean> {
        return await this.channelRepository.createChannel(executionContext);
    }

    /**
     * Returns channel information
     * @returns {Promise<Channel>}  returns channel information
     */
    async findChannel(): Promise<Channel> {
        return await this.channelRepository.findChannel();
    }
}