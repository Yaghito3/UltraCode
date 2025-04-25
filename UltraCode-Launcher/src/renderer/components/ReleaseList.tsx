import React, { useEffect, useState } from 'react';

interface Release {
    id: string;
    name: string;
    description: string;
    version: string;
    date: string;
}

const ReleaseList: React.FC = () => {
    const [latestReleases, setLatestReleases] = useState<Release[]>([]);
    const [oldReleases, setOldReleases] = useState<Release[]>([]);

    useEffect(() => {
        // Fetch release data from the Git repository (mocked for this example)
        const fetchReleases = async () => {
            const response = await fetch('https://api.example.com/releases'); // Replace with actual API
            const data = await response.json();
            setLatestReleases(data.latest);
            setOldReleases(data.old);
        };

        fetchReleases();
    }, []);

    const handleInstall = (release: Release) => {
        // Logic to install the selected release
        console.log(`Installing ${release.name}`);
    };

    const handleOpen = (release: Release) => {
        // Logic to open the selected release
        console.log(`Opening ${release.name}`);
    };

    return (
        <div className="release-list">
            <div className="latest-releases">
                <h2>Ultime Release</h2>
                <ul>
                    {latestReleases.map(release => (
                        <li key={release.id}>
                            <h3>{release.name}</h3>
                            <p>{release.description}</p>
                            <button onClick={() => handleInstall(release)}>Installa</button>
                            <button onClick={() => handleOpen(release)}>Apri</button>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="old-releases">
                <h2>Vecchie Release</h2>
                <ul>
                    {oldReleases.map(release => (
                        <li key={release.id}>
                            <h3>{release.name}</h3>
                            <p>{release.description}</p>
                            <button onClick={() => handleInstall(release)}>Installa</button>
                            <button onClick={() => handleOpen(release)}>Apri</button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default ReleaseList;