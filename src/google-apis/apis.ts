import { Injectable } from "@nestjs/common";
import { google } from 'googleapis';
import { Channel } from "../repositories/entity/channel.entity";

@Injectable()
export class ApiService {
    constructor() { }
    /**
     * 
     * @returns Promise<Channel>   return created channel data
     */
    async channel(): Promise<Channel> {
        let youtube;
        let channel;
        youtube = google.youtube({
            version: 'v3',
            auth: 'AIzaSyCDW7LfwHURmSXFGeIO6FwLeRGP0JbZ9h4',
        });

        let data = await youtube.channels.list({
            part: ["snippet, contentDetails, statistics"],
            id: 'UC9Pap1xwEQAo7X1tKqpcpWg',
            maxResults: 10,
        });


        channel = new Channel({
            profilePictureUrl: data.data.items[0]['snippet']['thumbnails']['default']['url'],
            subscriptionCount: data.data.items[0]['statistics']['subscriberCount'],
            title: data.data.items[0]['snippet']['title'],
            videoCount: data.data.items[0]['statistics']['videoCount'],
            videoPlaylistId: data.data.items[0]['contentDetails']['relatedPlaylists']['uploads'],
        });
        return channel;
    }
}