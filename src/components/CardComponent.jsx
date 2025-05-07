const CardComponent = ({ item, metadata }) => {
  return (
    <div style={{
      display: 'flex',
      padding: '10px 20px',
      alignItems: 'center',
      borderBottom: '1px solid #eee',
      backgroundColor: '#fff',
    }}>
      {metadata.map(({ key }) => (
        <div key={key} style={{ flex: 1 }}>{item[key]}</div>
      ))}
      <div style={{ width: 100, textAlign: 'right' }}>

        hi
      </div>
    </div>
  )
};

export default CardComponent
