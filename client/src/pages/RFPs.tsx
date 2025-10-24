import React, { useEffect, useState } from 'react';
import RfpList from '../components/RfpList';
import { fetchRFPs } from '../services/api';
import { RFP } from '../types';

const RFPs: React.FC = () => {
    const [rfps, setRfps] = useState<RFP[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const getRFPs = async () => {
            try {
                const data = await fetchRFPs();
                setRfps(data);
            } catch (err) {
                setError('Failed to fetch RFPs');
            } finally {
                setLoading(false);
            }
        };

        getRFPs();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div>
            <h1>Recent RFPs</h1>
            <RfpList rfps={rfps} />
        </div>
    );
};

export default RFPs;