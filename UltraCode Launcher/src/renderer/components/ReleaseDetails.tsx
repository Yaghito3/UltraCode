import React from 'react';

interface Release {
    name: string;
    description: string;
    version: string;
    downloadUrl: string;
}

interface ReleaseDetailsProps {
    selectedRelease: Release | null;
    onInstall: (url: string) => void;
    onOpen: (url: string) => void;
}

const ReleaseDetails: React.FC<ReleaseDetailsProps> = ({ selectedRelease, onInstall, onOpen }) => {
    if (!selectedRelease) {
        return <div>Select a release to see the details.</div>;
    }

    return (
        <div className="release-details">
            <h2>{selectedRelease.name}</h2>
            <p>{selectedRelease.description}</p>
            <p>Version: {selectedRelease.version}</p>
            <button onClick={() => onInstall(selectedRelease.downloadUrl)}>Install</button>
            <button onClick={() => onOpen(selectedRelease.downloadUrl)}>Open</button>
        </div>
    );
};

export default ReleaseDetails;