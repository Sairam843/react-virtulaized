import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import CardGrid from './cardlist/CardGrid';
import { useCallback } from 'react';
import { useEffect } from 'react';

function App() {
  // const data = [
  //   { id: 1, title: 'Dashboard', desc: 'View all your metrics in one place.' },
  //   { id: 2, title: 'Reports', desc: 'Generate detailed reports on demand.' },
  //   { id: 3, title: 'Analytics', desc: 'Track real-time analytics and KPIs.' },
  //   { id: 4, title: 'Settings', desc: 'Customize your experience and preferences.' },
  //   { id: 5, title: 'Notifications', desc: 'Stay up to date with alerts and messages.' },
  //   { id: 6, title: 'Users', desc: 'Manage user accounts and permissions.' },
  //   { id: 7, title: 'Integrations', desc: 'Connect third-party tools easily.' },
  //   { id: 8, title: 'Billing', desc: 'Access billing info and invoices.' },
  //   { id: 5, title: 'Notifications', desc: 'Stay up to date with alerts and messages.' },
  //   { id: 6, title: 'Users', desc: 'Manage user accounts and permissions.' },
  //   { id: 7, title: 'Integrations', desc: 'Connect third-party tools easily.' },
  //   { id: 8, title: 'Billing', desc: 'Access billing info and invoices.' },
  //   { id: 5, title: 'Notifications', desc: 'Stay up to date with alerts and messages.' },
  //   { id: 6, title: 'Users', desc: 'Manage user accounts and permissions.' },
  //   { id: 7, title: 'Integrations', desc: 'Connect third-party tools easily.' },
  //   { id: 8, title: 'Billing', desc: 'Access billing info and invoices.' },
  // ];
 
  const PAGE_SIZE = 20;
  const MAX_ITEMS=80;

  const [data, setData] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const loadMore = useCallback(() => {
    setLoading(true);
    setError(false);
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const failRandomly = Math.random() < 0.1;
        if (failRandomly) {
          setError(true);
          setLoading(false);
          reject();
        } else {
          const newData = Array.from({ length: PAGE_SIZE }, (_, i) => ({
            id: data.length + i + 1,
            name: `Item ${data.length + i + 1}`,
          }));
          setData((prev) => [...prev, ...newData]);
          setHasMore(data.length + newData.length < MAX_ITEMS);
          setLoading(false);
          resolve();
        }
      }, 1000);
    });
  }, [data.length]);

  useEffect(() => {
    loadMore(); 
  }, []);

  return (
    <>
      <CardGrid  
      data={data}
      loadMore={loadMore}
      hasMore={hasMore}
      loading={loading}
      error={error}
      onRetry={loadMore} />
    </>
  )
}

export default App
