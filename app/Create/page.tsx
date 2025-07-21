

'use client';
import { useState } from "react";
import '../globals.css'; // Import CSS from the correct location (relative path)
import Link from "next/link";

type MainContractData = {
  date: string;
  statergy: string;
  index: string;
  expiry: string;
  amount_required: number;
  net_points: number;
  total_points: number;
};

type OptionData = {
  option_type: string;
  strike_price: number;
  order_type: string;
  price: number;
  profit_points: number;
  ltp: number;
};

export default function Page() {
  const [mainContract, setMainContract] = useState<MainContractData>({
    date: '',
    statergy: '',
    index: '',
    expiry: '',
    amount_required: 0,
    net_points: 0,
    total_points: 0,
  });

  const [options, setOptions] = useState<OptionData[]>([{
    option_type: '',
    strike_price: 0,
    order_type: '',
    price: 0,
    profit_points: 0,
    ltp: 0,
  }]);

  const handleMainContractChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setMainContract(prev => ({
      ...prev,
      [name]: typeof prev[name as keyof MainContractData] === 'number'
        ? value === '' ? 0 : Number(value)
        : value,
    }));
  };

  const handleOptionChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const newOptions = [...options];
    const { name, value } = e.target;

    type NumericKeys = 'strike_price' | 'price' | 'profit_points' | 'ltp';
    type StringKeys = 'option_type' | 'order_type';

    const numericFields: NumericKeys[] = ['strike_price', 'price', 'profit_points', 'ltp'];
    const stringFields: StringKeys[] = ['option_type', 'order_type'];

    if (numericFields.includes(name as NumericKeys)) {
        (newOptions[index] as Record<NumericKeys, number>)[name as NumericKeys] = value === '' ? 0 : Number(value);
    } else if (stringFields.includes(name as StringKeys)) {
        (newOptions[index] as Record<StringKeys, string>)[name as StringKeys] = value;
    } else {
        console.warn(`Unrecognized field: ${name}`);
        return;
    }
    setOptions(newOptions);
  };


  const addOption = () => {
    setOptions([...options, {
      option_type: '',
      strike_price: 0,
      order_type: '',
      price: 0,
      profit_points: 0,
      ltp: 0,
    }]);
  };

  const removeOption = (index: number) => {
    const newOptions = [...options];
    newOptions.splice(index, 1);
    setOptions(newOptions);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try{
      const res = await fetch('/api/contracts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mainContract, options }),
      });
      if (res.ok) {
        alert('Contract saved successfully!');
        setMainContract({
          date: '',
          statergy: '',
          index: '',
          expiry: '',
          amount_required: 0,
          net_points: 0,
          total_points: 0,
        });
        setOptions([{
          option_type: '',
          strike_price: 0,
          order_type: '',
          price: 0,
          profit_points: 0,
          ltp: 0,
        }]);
      } else {
        alert('Failed to save contract');
      }
    }
    catch(err){
      alert('Failed to save the contract');
      console.error(err);
    }
  };

  return (
    <div className="contract-form">
      <Link href="./" className="nav-link">Home</Link>
      <form onSubmit={handleSubmit}>
        <h2 className="contract-title">Creating the Contract</h2>
        <label className="contract-label">Enter the Date:</label>
        <input type="text" name="date" value={mainContract.date} onChange={handleMainContractChange} className="contract-input" />

        <label className="contract-label">Statergy:</label>
        <input type="text" name="statergy" value={mainContract.statergy} onChange={handleMainContractChange} className="contract-input" />

        <label className="contract-label">Index:</label>
        <input type="text" name="index" value={mainContract.index} onChange={handleMainContractChange} className="contract-input" />

        <label className="contract-label">Expiry:</label>
        <input type="date" name="expiry" value={mainContract.expiry} onChange={handleMainContractChange} className="contract-input" />

        <label className="contract-label">Amount Required:</label>
        <input type="number" name="amount_required" value={mainContract.amount_required} onChange={handleMainContractChange} className="contract-input" />

        <label className="contract-label">Net Points:</label>
        <input type="number" name="net_points" value={mainContract.net_points} onChange={handleMainContractChange} className="contract-input" />

        <label className="contract-label">Total Points:</label>
        <input type="number" name="total_points" value={mainContract.total_points} onChange={handleMainContractChange} className="contract-input" />

        <h2>Add options:</h2>
        {options.map((option, index) => (
          <div key={index} className="option-block">
            <div>
              <label className="contract-label">Option Type:</label>
              <input
                type="text"
                name="option_type"
                value={option.option_type}
                onChange={(e) => handleOptionChange(index, e)}
                className="contract-input"
                required
              />
            </div>
            <div>
              <label className="contract-label">Strike Price:</label>
              <input
                type="number"
                name="strike_price"
                value={option.strike_price}
                onChange={(e) => handleOptionChange(index, e)}
                className="contract-input"
                required
              />
            </div>
            <div>
              <label className="contract-label">Order Type:</label>
              <input
                type="text"
                name="order_type"
                value={option.order_type}
                onChange={(e) => handleOptionChange(index, e)}
                className="contract-input"
                required
              />
            </div>
            <div>
              <label className="contract-label">Price:</label>
              <input
                type="number"
                name="price"
                value={option.price}
                onChange={(e) => handleOptionChange(index, e)}
                className="contract-input"
                required
              />
            </div>
            <div>
              <label className="contract-label">Profit Points:</label>
              <input
                type="number"
                name="profit_points"
                value={option.profit_points}
                onChange={(e) => handleOptionChange(index, e)}
                className="contract-input"
                required
              />
            </div>
            <div>
              <label className="contract-label">Last Traded Price:</label>
              <input
                type="number"
                name="ltp"
                value={option.ltp}
                onChange={(e) => handleOptionChange(index, e)}
                className="contract-input"
                required
              />
            </div>
            <button
              type="button"
              onClick={() => removeOption(index)}
              className="contract-button secondary"
            >
              Remove
            </button>
          </div>
        ))}

        <button type="button" onClick={addOption} className="contract-button">
          Add More
        </button>
        <button type="submit" className="contract-button">
          Submit
        </button>
      </form>
    </div>
  );
}
