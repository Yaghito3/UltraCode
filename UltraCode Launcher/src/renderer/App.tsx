import React, { useEffect, useState } from 'react';
import ReleaseList from './components/ReleaseList';
import ReleaseDetails from './components/ReleaseDetails';
import './styles/App.css';

const App = () => {
    const [latestReleases, setLatestReleases] = useState([]);
    const [oldReleases, setOldReleases] = useState([]);
    const [selectedRelease, setSelectedRelease] = useState(null);

    useEffect(() => {
        // Fetch release data from the Git repository
        const fetchReleases = async () => {
            // Simulated fetch function, replace with actual API call
            const releases = await fetch('/api/releases');
            const data = await releases.json();
            setLatestReleases(data.latest);
            setOldReleases(data.old);
        };

        fetchReleases();
    }, []);

    const handleReleaseSelect = (release) => {
        setSelectedRelease(release);
    };

    return (
        <div className="app-container">
            <div className="release-list">
                <h2>Ultime Release</h2>
                <ReleaseList releases={latestReleases} onSelect={handleReleaseSelect} />
                <h2>Vecchie Release</h2>
                <ReleaseList releases={oldReleases} onSelect={handleReleaseSelect} />
            </div>
            <div className="release-details">
                {selectedRelease && <ReleaseDetails release={selectedRelease} />}
            </div>
        </div>
    );
};

export default App;