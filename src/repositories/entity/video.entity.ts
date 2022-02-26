import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('videos')
export class Video {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text', {name: 'title'})
    title: string;

    @Column('text', {name: 'video_id'})
    videoId: string;

    @Column('text', {name: 'channel_id'})
    channelId: string;

    @CreateDateColumn({name: 'published_at', type:'timestamp'})
    publishedAt: Date;

    @Column('text', {name: 'video_description'})
    videoDescription: string;

    @Column('text', {name: 'thumbnails'})
    thumbnails: string;

    @Column('text', {name: 'channel_title'})
    channelTitle: string;

    @Column('text', {name: 'live_broadcast_content'})
    liveBroadcastContent: string;


    @Column('text', {name: 'published_title'})
    publishedTitle: string;
    
    constructor(video: Partial<Video>= {}){
        Object.assign(this, video);
    }
}