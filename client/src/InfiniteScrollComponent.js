import React, { useState, useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

const InfiniteScrollComponent = () => {
  const [data, setData] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);

  // Simulated data fetching
  const fetchData = () => {
    // Simulated API call delay
    setTimeout(() => {
      const newData = Array.from({ length: 10 }, (_, index) => {
        const itemId = index + (page - 1) * 10;
        return { id: itemId, name: `Item ${itemId}`, description: `Description ${itemId}` };
      });
      setData(prevData => [...prevData, ...newData]);
      setPage(prevPage => prevPage + 1);
    }, 1000);
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleLoadMore = () => {
    if (data.length >= 50) {
      setHasMore(false);
      return;
    }
    fetchData();
  };

  const [expandedItems, setExpandedItems] = useState([]);

  const handleExpandItem = itemId => {
    setExpandedItems(prevExpandedItems => {
      if (prevExpandedItems.includes(itemId)) {
        return prevExpandedItems.filter(item => item !== itemId);
      }
      return [...prevExpandedItems, itemId];
    });
  };

  return (
    <div style={{ overflow: 'auto' }}>
      <InfiniteScroll
        dataLength={data.length}
        next={handleLoadMore}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
        endMessage={<p>No more data to load.</p>}
      >
        {data.map(item => (
          <div key={item.id} style={{ padding: '20px', border: '1px solid gray', margin: '10px 0' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <div>{item.name}</div>
              <div
                onClick={() => handleExpandItem(item.id)}
                style={{
                  marginLeft: '10px',
                  cursor: 'pointer',
                  transform: expandedItems.includes(item.id) ? 'rotate(90deg)' : 'rotate(0deg)',
                  transition: 'transform 0.3s ease-in-out',
                }}
              >
                &#9660;
              </div>
            </div>
            {expandedItems.includes(item.id) && (
              <div style={{ marginTop: '10px' }}>
                <strong>Description:</strong> {item.description}
              </div>
            )}
          </div>
        ))}
      </InfiniteScroll>
    </div>
  );
};

export default InfiniteScrollComponent;
