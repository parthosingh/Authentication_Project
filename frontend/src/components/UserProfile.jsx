import React, { useState, useEffect } from 'react';
import { graphqlRequest } from '../utils/apolloClient';
import * as queries from '../graphql/queries';

const UserProfile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const data = await graphqlRequest(queries.GET_ME_QUERY);
      setProfile(data.me);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return (
    <div className="flex justify-center items-center h-64">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
    </div>
  );

  if (error) return (
    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
      Error loading profile: {error}
    </div>
  );

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800">My Profile</h2>
          <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-semibold">
            {profile?.role}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-gray-600">Name</label>
            <p className="text-gray-900 font-semibold">{profile?.name || 'N/A'}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-600">Email</label>
            <p className="text-gray-900 font-semibold">{profile?.email || 'N/A'}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-600">Address</label>
            <p className="text-gray-900 font-semibold">{profile?.address || 'N/A'}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-600">Scope</label>
            <p className="text-gray-900 font-semibold">{profile?.scope || 'N/A'}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-600">Start Date</label>
            <p className="text-gray-900 font-semibold">{profile?.startDate || 'N/A'}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-600">End Date</label>
            <p className="text-gray-900 font-semibold">{profile?.endDate || 'N/A'}</p>
          </div>
          <div className="md:col-span-2">
            <label className="text-sm font-medium text-gray-600">GST Number</label>
            <p className="text-gray-900 font-semibold">{profile?.GSTNo || 'N/A'}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;