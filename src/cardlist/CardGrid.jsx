// import { Grid, AutoSizer } from 'react-virtualized';
import CardComponent from '../components/CardComponent';
import { FixedSizeGrid as Grid } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';
import { useRef } from 'react';
import { useCallback } from 'react';
import LoadingCard from '../components/LoadingCard';

const CARD_WIDTH = 260;
const CARD_HEIGHT = 50;


const ErrorCard = ({ onRetry }) => (
  <div style={{ textAlign: 'center', paddingTop: 40 }}>
    <p style={{ color: 'red' }}>Failed to load data </p>
    <button onClick={onRetry}>Retry</button>
  </div>
);

const CardGrid = ({ data, loadMore, hasMore, loading, error, onRetry, metadata, header, isHeaderFixed }) => {
  const lastLoadedIndex = useRef(0);

  const handleItemsRendered = useCallback(
    ({ visibleStopIndex }) => {

      const nearEnd = visibleStopIndex >= data.length - 3;
      
      if (hasMore && !loading && nearEnd && visibleStopIndex > lastLoadedIndex.current) {
        lastLoadedIndex.current = visibleStopIndex;
        console.log("Loading more data at index:", visibleStopIndex);
        loadMore();
      }
    },
    [hasMore, loading, data.length, loadMore]
  );



  return (
    <div style={{ height: '85dvh', width: '95dvw' }}>
      {isHeaderFixed && (
        <div style={{
          position: 'sticky',
          top: 0,
          zIndex: 1000,
          backgroundColor: '#000',
          color: '#fff',
          padding: '12px 20px',
          display: 'flex',
          fontWeight: 600,
          fontSize: 14,
        }}>
          {header.map(({ name }, idx) => (
            <div key={idx} style={{ flex: 1 }}>{name}</div>
          ))}
          <div style={{ width: 100, textAlign: 'right' }}>Actions</div>
        </div>
      )}


      <AutoSizer>
        {({ width, height }) => {
          const totalDataCount = data.length;
          const columnCount = 1
          const columnWidth = width;

          const shimmerCount = loading ? columnCount * 2 : 0;
          const rowCount = Math.ceil((totalDataCount + shimmerCount) / columnCount);

          return (
            <Grid
              columnCount={columnCount}
              columnWidth={columnWidth}
              height={height}
              rowCount={rowCount}
              rowHeight={CARD_HEIGHT}
              width={width}
              onItemsRendered={({ visibleRowStartIndex, visibleRowStopIndex }) =>
                handleItemsRendered({
                  visibleStartIndex: visibleRowStartIndex * columnCount,
                  visibleStopIndex: visibleRowStopIndex * columnCount + (columnCount - 1)
                })
              }
              style={{ backgroundColor: '#f5f5f5' }}
            >
              {({ columnIndex, rowIndex, style }) => {
                const index = rowIndex * columnCount + columnIndex;
                const totalItems = data.length;

                let content = null;

                const cardOuterStyle = {
                  ...style,
                  top: style.top + 10,
                };

                if (index < totalItems) {
                  const item = data[index];
                  content = <CardComponent item={item} metadata={metadata} />;
                } else if (index >= data.length) {
                  if (loading) {
                    return (
                      <div style={{ ...cardOuterStyle, }}>
                        <LoadingCard />
                      </div>
                    );
                  }

                  if (error && rowIndex === rowCount - 1 && columnIndex === 0) {
                    return (
                      <div style={{ ...style, padding: 10 }}>
                        <ErrorCard onRetry={onRetry} />
                      </div>
                    );
                  }

                  return <div style={style} />;
                }
                return (
                  <div style={cardOuterStyle}>
                    {content}
                  </div>
                );
              }}
            </Grid>
          );
        }}
      </AutoSizer>
    </div>
  );
};

export default CardGrid