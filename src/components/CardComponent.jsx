const CardComponent = ({ item }) => (
    
    <div
      style={{
        display: 'grid',
        gridTemplateRows: 'auto 1fr',
        gap: '12px',
        padding: '16px',
        backgroundColor: '#ffffff',
        borderRadius: '12px',
        boxShadow: '0 4px 16px rgba(0, 0, 0, 0.06)',
        height: '100%',
        boxSizing: 'border-box',
      }}
    >
      <h3 style={{ margin: '0 0 8px 0', fontSize: '18px', fontWeight: 600 }}>{item.title}</h3>
      <p style={{ margin: 0, fontSize: '14px', color: '#555' }}>{item.desc}</p>
    </div>
  );

  export default CardComponent
  