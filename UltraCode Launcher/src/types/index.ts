interface Release {
    id: string;
    name: string;
    version: string;
    description: string;
    date: string;
    downloadUrl: string;
}

interface ReleaseList {
    latestReleases: Release[];
    oldReleases: Release[];
}

export type { Release, ReleaseList };