export interface IBucketContent {
    Key: string;
    LastModified: string;
    ETag: string;
    ChecksumAlgorithm: string[]
    Size: number;
    StorageClass: string
}
