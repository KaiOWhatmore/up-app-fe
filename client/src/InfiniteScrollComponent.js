import moment from 'moment';
import React, { useState, useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

const TransactionFeed = () => {
  const [scroll, setData] = useState({ data: [] });
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const [selectedYear, setSelectedYear] = useState('');
  const [selectedMonth, setSelectedMonth] = useState('');

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
          localStorage.setItem("cachedChartData", JSON.stringify(data));
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

  // Filter the data based on selected year and month
  const filteredData = scroll.data.filter(item => {
    const itemYear = moment(item.createdAt).year().toString();
    const itemMonth = moment(item.createdAt).format('MMMM');
    if (selectedYear && selectedMonth) {
      return itemYear === selectedYear && itemMonth === selectedMonth;
    } else if (selectedYear) {
      return itemYear === selectedYear;
    } else if (selectedMonth) {
      return itemMonth === selectedMonth;
    }
    return true; // No filters applied
  });

  const handleYearChange = event => {
    setSelectedYear(event.target.value);
  };

  const handleMonthChange = event => {
    setSelectedMonth(event.target.value);
  };

  return (
    <div style={{ overflow: 'auto' }}>
      <div>
        <label htmlFor="year">Year:</label>
        <select id="year" value={selectedYear} onChange={handleYearChange}>
          <option value="">All</option>
          <option value="2023">2023</option>
          <option value="2022">2022</option>
          <option value="2021">2021</option>
        </select>
      </div>
      <div>
        <label htmlFor="month">Month:</label>
        <select id="month" value={selectedMonth} onChange={handleMonthChange}>
          <option value="">All</option>
          <option value="January">January</option>
          <option value="February">February</option>
          <option value="March">March</option>
          {/* Add more months */}
        </select>
      </div>
      <InfiniteScroll
        dataLength={filteredData.length}
        next={handleLoadMore}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
        endMessage={<p>No more data to load.</p>}
      >
        {filteredData.map(item => (
          <div key={item.id} style={{ padding: '20px', border: '1px solid gray', margin: '15px' }}>
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
                <p style={{ textAlign: 'left' }}>
                  <strong>Description:</strong> {item.description}
                </p>
                <p style={{ textAlign: 'left' }}>
                  <strong>Value:</strong> {item.value}
                </p>
              </div>
            )}
          </div>
        ))}
      </InfiniteScroll>
    </div>
  );
};

export default TransactionFeed;
