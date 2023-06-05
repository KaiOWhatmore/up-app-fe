import React, { useState, useEffect } from 'react';

const Feed = () => {
  const [data, setData] = useState([]);
  const [years, setYears] = useState([]);
  const [selectedYear, setSelectedYear] = useState('');
  const [months, setMonths] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const response = await fetch('/api/transactions/curt/runningTotal');
    const jsonData = await response.json();

    const uniqueYears = Array.from(new Set(jsonData.map((v) => v.createdAt.substring(0,4))))
    setYears(uniqueYears);

    setData(jsonData);
  };

  useEffect(() => {
    if (selectedYear !== '') {
      const filteredMonths = Array.from(
        new Set(
          data
            .filter((transaction) => transaction.createdAt.startsWith(selectedYear))
            .map((transaction) => transaction.createdAt.substring(5, 7))
        )
      );
      setMonths(filteredMonths);
    } else {
      setMonths([]);
    }
    setSelectedMonth('');
  }, [selectedYear, data]);

  useEffect(() => {
    // Implement logic to filter the data based on the selected year and month
    // For example, you can update the data state variable with the filtered results
    const filteredData = data.filter((transaction) => {
      const transactionYear = transaction.createdAt.substring(0, 4);
      const transactionMonth = transaction.createdAt.substring(5, 7);
      return (
        (selectedYear === '' || transactionYear === selectedYear) &&
        (selectedMonth === '' || transactionMonth === selectedMonth)
      );
    });
    setData(filteredData);

    // Alternatively, you can make API calls to fetch the filtered data from the backend
    // based on the selected year and month, similar to the initial fetchData() call
  }, [selectedYear, selectedMonth]);

  return (
    <div>
      <select value={selectedYear} onChange={(e) => setSelectedYear(e.target.value)}>
        <option value="">Select Year</option>
        {years.map((year) => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
      </select>

      <select value={selectedMonth} onChange={(e) => setSelectedMonth(e.target.value)}>
        <option value="">Select Month</option>
        {months.map((month) => (
          <option key={month} value={month}>
            {month}
          </option>
        ))}
      </select>

      <ul>
        {data.map((transaction) => (
          <li key={transaction.id}>{/* Render transaction details */}</li>
        ))}
      </ul>
    </div>
  );
};

export default Feed;
