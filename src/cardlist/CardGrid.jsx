// import { Grid, AutoSizer } from 'react-virtualized';
import CardComponent from '../components/CardComponent';
import { FixedSizeGrid as Grid } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';
import { useRef } from 'react';
import { useCallback } from 'react';
import LoadingCard from '../components/LoadingCard';

const CARD_WIDTH = 260;
const CARD_HEIGHT = 200;


const ErrorCard = ({ onRetry }) => (
  <div style={{ textAlign: 'center', paddingTop: 40 }}>
    <p style={{ color: 'red' }}>Failed to load data ❌</p>
    <button onClick={onRetry}>Retry</button>
  </div>
);

const CardGrid = ({ data, loadMore, hasMore, loading, error, onRetry }) => {
  const loadingRef = useRef(false);

  const handleItemsRendered = useCallback(
    ({ visibleRowStopIndex }) => {
      if (hasMore && !loadingRef.current && visibleRowStopIndex >= Math.ceil(data.length / 4) - 1) {
        loadingRef.current = true;
        loadMore().finally(() => {
          loadingRef.current = false;
        });
      }
    },
    [data.length, hasMore, loadMore]
  );


  return (
    <div style={{ height: '85dvh', width: '95dvw' }}>
      <AutoSizer>
        {({ width, height }) => {
          const totalDataCount = data.length;
          const columnCount = Math.max(1, Math.floor(width / CARD_WIDTH));
          const shimmerCount = loading ? columnCount * 2 : 0; 
          const rowCount = Math.ceil((totalDataCount + shimmerCount) / columnCount);

          return (
            <Grid
              columnCount={columnCount}
              columnWidth={CARD_WIDTH}
              height={height}
              rowCount={rowCount}
              rowHeight={CARD_HEIGHT}
              width={width}
              onItemsRendered={({ visibleRowStopIndex }) =>
                handleItemsRendered({ visibleRowStopIndex })
              }
              style={{ backgroundColor: '#f5f5f5' }}
            >
              {({ columnIndex, rowIndex, style }) => {
                const index = rowIndex * columnCount + columnIndex;
                const totalItems = data.length;

                let content = null;

                const cardOuterStyle = {
                  ...style,
                  left: style.left + 10,
                  top: style.top + 10,
                  width: style.width - 20,
                  height: style.height - 20,
                };

                if (index < totalItems) {
                  const item = data[index];
                  content = <CardComponent item={item} />;
                } else if (index >= data.length) {
                  if (loading) {
                    return (
                      <div style={{ ...cardOuterStyle, }}>
                        <LoadingCard />
                      </div>
                    );
                  }
                  console.log(error,"error");
                  
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