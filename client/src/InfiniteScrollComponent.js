import moment from 'moment';
import React, { useState, useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

const TransactionFeed = () => {
  const [scroll, setData] = useState({ data: [] });
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);

  let proxyUrl = "/api/transactions/curt/runningTotal";
  const fetchData = async () => {
    try {
      const cachedData = localStorage.getItem("cachedChartData");
      if (cachedData) {
        const parsedData = JSON.parse(cachedData);
        setData({ data: parsedData });
      } else {
        const response = await fetch(proxyUrl);
        if (response.ok) {
          const data = await response.json();
          setData({ data });
          localStorage.setItem("cachedChartData", JSON.stringify(data))
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [proxyUrl]);


  const handleLoadMore = () => {
    if (scroll.data.length >= 50) {
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
        dataLength={scroll.data.length}
        next={handleLoadMore}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
        endMessage={<p>No more data to load.</p>}
      >
        {scroll.data.map(item => (
          <div key={item.id} style={{ padding: '20px', border: '1px solid gray', margin: '10px 0' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <div>{moment(item.createdAt).format('Do MMM, YY, h:mma')}</div>
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
                <strong>Value:</strong> {item.value}
              </div>
            )}
          </div>
        ))}
      </InfiniteScroll>
    </div>
  );
};

export default TransactionFeed;
