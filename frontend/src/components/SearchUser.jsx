import React, { useState } from 'react';
import { graphqlRequest } from '../utils/apolloClient';
import * as queries from '../graphql/queries';

const SearchUser = () => {
  const [searchGST, setSearchGST] = useState('');
  const [searchResult, setSearchResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async () => {
    if (!searchGST.trim()) return;
    
    setLoading(true);
    setError('');
    setSearchResult(null);

    try {
      const data = await graphqlRequest(queries.GET_USER_BY_GST_QUERY, { GSTNo: searchGST });
      setSearchResult(data.userByGST);
    } catch (err) {
      setError('User not found with this GST number');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow mb-6">
      <h3 className="text-lg font-semibold mb-3">Search by GST Number</h3>
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Enter GST Number"
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          value={searchGST}
          onChange={(e) => setSearchGST(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
        />
        <button
          onClick={handleSearch}
          disabled={loading}
          className="bg-green-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-green-700 disabled:bg-gray-400"
        >
          {loading ? 'Searching...' : 'Search'}
        </button>
      </div>
      
      {error && (
        <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
          {error}
        </div>
      )}
      
      {searchResult && (
        <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
          <p className="font-semibold text-lg">{searchResult.name}</p>
          <p className="text-sm text-gray-600">Email: {searchResult.email}</p>
          <p className="text-sm text-gray-600">Address: {searchResult.address || 'N/A'}</p>
          <p className="text-sm text-gray-600">Scope: {searchResult.scope || 'N/A'}</p>
          <p className="text-sm text-gray-600">Start Date: {searchResult.startDate || 'N/A'}</p>
          <p className="text-sm text-gray-600">End Date: {searchResult.endDate || 'N/A'}</p>
          <p className="text-sm text-gray-600 font-medium">GST: {searchResult.GSTNo}</p>
        </div>
      )}
    </div>
  );
};

export default SearchUser;