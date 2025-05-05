import { Grid, AutoSizer } from 'react-virtualized';
import CardComponent from '../components/CardComponent';

const CARD_WIDTH = 260; 
const CARD_HEIGHT = 200; 

const CardGrid = ({ data }) => (
<div style={{ height: '85dvh', width: '95dvw' }}>
  <AutoSizer>
    {({ width, height }) => {
      const columnCount = Math.max(1, Math.floor(width / CARD_WIDTH));
      const rowCount = Math.ceil(data.length / columnCount);

      return (
        <Grid
          columnCount={columnCount}
          columnWidth={CARD_WIDTH}
          height={height}
          rowCount={rowCount}
          rowHeight={CARD_HEIGHT}
          width={width}
          style={{ backgroundColor: '#f5f5f5' }}
          cellRenderer={({ columnIndex, rowIndex, key, style }) => {
            const index = rowIndex * columnCount + columnIndex;
            const item = data[index];
            if (!item) return null;
            const cardOuterStyle = {
                ...style,
                left: style.left + 10,
                top: style.top + 10,
                width: style.width - 20,
                height: style.height - 20,
              };
            return (
              <div key={key} style={cardOuterStyle}>
                <CardComponent item={item} />
              </div>
            );
          }}
        />
      );
    }}
  </AutoSizer>
  </div>
);
export default CardGrid

// import React from 'react';
// import { Grid } from 'react-virtualized';
// import CardComponent from '../components/CardComponent';

// const CARD_WIDTH = 270;
// const CARD_HEIGHT = 220;

// const gridWidth = 1080;  // Set your fixed width here
// const gridHeight = 720;  // Set your fixed height here

// const CardGrid = ({ data }) => {
//   const columnCount = Math.max(1, Math.floor(gridWidth / CARD_WIDTH));
//   const rowCount = Math.ceil(data.length / columnCount);

//   return (
//     <div style={{ background: '#f5f5f5'}}>
//       <Grid
//         columnCount={columnCount}
//         columnWidth={CARD_WIDTH}
//         height={gridHeight}
//         rowCount={rowCount}
//         rowHeight={CARD_HEIGHT}
//         width={gridWidth}
//         cellRenderer={({ columnIndex, rowIndex, key, style }) => {
//           const index = rowIndex * columnCount + columnIndex;
//           const item = data[index];
//           if (!item) return null;

//           const spacedStyle = {
//             ...style,
//             left: style.left + 10,
//             top: style.top + 10,
//             width: style.width - 20,
//             height: style.height - 20,
//           };

//           return (
//             <div key={key} style={{...spacedStyle}}>
//               <CardComponent item={item} />
//             </div>
//           );
//         }}
//       />
//     </div>
//   );
// };

// export default CardGrid;
