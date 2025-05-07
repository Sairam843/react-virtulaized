import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import CardGrid from './cardlist/CardGrid';
import { useCallback } from 'react';
import { useEffect } from 'react';

function App() {

  const [data, setData] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const pageSize = 20;

  const loadMore = useCallback(async () => {
    if (loading) return;

    setLoading(true);
    setError(false);

    try {
      const res = await fetch(`https://jsonplaceholder.typicode.com/todos?_start=${data.length}&_limit=${pageSize}`);
      const newData = await res.json();

      setData((prev) => [...prev, ...newData]);
      setHasMore(newData.length === pageSize);
    } catch (err) {
      setError(true);
    } finally {
      setLoading(false);
    }
  }, [data.length, loading, pageSize]);


  console.log(pageSize, "pageSize");

  useEffect(() => {
    loadMore();
  }, []);

  const metadata = [
    { key: 'id', name: 'ID' },
    { key: 'title', name: 'Title' },
    { key: 'userId', name: 'userId' },
    { key: 'completed', name: 'Completed' },
  ];
  const header = [
    { key: 'id', name: 'ID' },
    { key: 'title', name: 'Title' },
    { key: 'userId', name: 'userId' },
    { key: 'completed', name: 'Completed' },
  ];

  return (
    <>
      <CardGrid
        data={data}
        loadMore={loadMore}
        hasMore={hasMore}
        loading={loading}
        error={error}
        onRetry={loadMore}
        metadata={metadata}
        isHeaderFixed={true}
        header={header}
      />
    </>
  )
}

export default App
