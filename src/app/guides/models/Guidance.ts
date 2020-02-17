import { GuidePage } from './guidance.data';

export class Guidance {
    /* Identification */
    public id?: string;
    public name?: string;
    public type?: string;
    public app?: string;
    public min_ver?: number;
    public max_ver?: number;

    /* Automatically managed fields */
    public create_time?: Date;

    /* Content */
    public pages?: GuidePage[] = [];

    /* Search */
    public tags?: string[];
    public all_tags?: string[];

    /* Status */
    public status?: string;

    /* Custom fields */
    public custom_hdr?: any;
    public custom_dat?: any;
}
