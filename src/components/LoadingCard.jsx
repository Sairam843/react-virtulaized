const LoadingCard = () => (
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
      <div className="shimmer shimmer-title" />
      <div className="shimmer shimmer-line" />
      <div className="shimmer shimmer-line short" />
    </div>
  );

  export default LoadingCard