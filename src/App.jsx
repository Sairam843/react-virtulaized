import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import CardGrid from './cardlist/CardGris';

function App() {
  const data = [
    { id: 1, title: 'Dashboard', desc: 'View all your metrics in one place.' },
    { id: 2, title: 'Reports', desc: 'Generate detailed reports on demand.' },
    { id: 3, title: 'Analytics', desc: 'Track real-time analytics and KPIs.' },
    { id: 4, title: 'Settings', desc: 'Customize your experience and preferences.' },
    { id: 5, title: 'Notifications', desc: 'Stay up to date with alerts and messages.' },
    { id: 6, title: 'Users', desc: 'Manage user accounts and permissions.' },
    { id: 7, title: 'Integrations', desc: 'Connect third-party tools easily.' },
    { id: 8, title: 'Billing', desc: 'Access billing info and invoices.' },
    { id: 5, title: 'Notifications', desc: 'Stay up to date with alerts and messages.' },
    { id: 6, title: 'Users', desc: 'Manage user accounts and permissions.' },
    { id: 7, title: 'Integrations', desc: 'Connect third-party tools easily.' },
    { id: 8, title: 'Billing', desc: 'Access billing info and invoices.' },
    { id: 5, title: 'Notifications', desc: 'Stay up to date with alerts and messages.' },
    { id: 6, title: 'Users', desc: 'Manage user accounts and permissions.' },
    { id: 7, title: 'Integrations', desc: 'Connect third-party tools easily.' },
    { id: 8, title: 'Billing', desc: 'Access billing info and invoices.' },
  ];
  

  return (
    <>
      <CardGrid data={data} />
    </>
  )
}

export default App
