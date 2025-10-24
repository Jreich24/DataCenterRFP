import axios from 'axios';
import { News, RFP } from '../types';

// Use relative path for Vercel deployment, falls back to localhost for local development
const API_BASE_URL = process.env.REACT_APP_API_URL || '/api';

export interface FetchParams {
    prompt?: string;
    type?: 'news' | 'rfp';
    sources?: string[];
    since?: string; // ISO date
}

export const fetchNewsHeadlines = async (params?: FetchParams): Promise<News[]> => {
    try {
        const qs = new URLSearchParams();
        if (params?.prompt) qs.set('prompt', params.prompt);
        if (params?.type) qs.set('type', params.type);
        if (params?.since) qs.set('since', params.since);
        if (params?.sources && params.sources.length) qs.set('sources', params.sources.join(','));

        const url = `${API_BASE_URL}/headlines${qs.toString() ? `?${qs.toString()}` : ''}`;
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        console.error('Error fetching news headlines:', error);
        throw error;
    }
};

export const fetchRFPs = async (params?: FetchParams): Promise<RFP[]> => {
    try {
        const qs = new URLSearchParams();
        if (params?.prompt) qs.set('prompt', params.prompt);
        if (params?.type) qs.set('type', params.type);
        if (params?.since) qs.set('since', params.since);
        if (params?.sources && params.sources.length) qs.set('sources', params.sources.join(','));

        const url = `${API_BASE_URL}/rfps${qs.toString() ? `?${qs.toString()}` : ''}`;
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        console.error('Error fetching RFPs:', error);
        throw error;
    }
};