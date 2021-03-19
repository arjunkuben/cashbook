import React, { useState, useEffect } from 'react';
import Moment from 'react-moment';
import './App.css';

function App() {
	const [amount, setAmount] = useState(0.0);
	const [note, setNote] = useState('');
	const [showModal, setShowModal] = useState(false);
	const [transactionDetails, setTransactionDetails] = useState([]);
	const [todayBalance, setTodayBalance] = useState(0);
	const [inOut, setInOut] = useState(true);

	const cashInOut = (cashIn) => {
		setInOut(cashIn);
		setAmount(0.0);
		setNote('');
		setShowModal(true);
	}

	const addSub = () => {
		const transactionDetail = {
			note,
			amount,
			type: inOut ? 1 : 0,
			timestamp: new Date(),
			id: Math.floor(Math.random() * 100)
		};
		setTransactionDetails([
			...transactionDetails,
			transactionDetail
		]);
		const getTotals = inOut ? todayBalance + parseFloat(amount) : todayBalance - parseFloat(amount);
		setTodayBalance(getTotals);
		setShowModal(false);
	}

	return (
		<div className="App">
			<div className="mainHeader">
				<h1 style={{ textAlign: 'center' }}>My Cashbook</h1>
				<div className="today-balance">
					<h1 data-testid="balance">{todayBalance} &#8377;</h1>
					<p>Today's Balance</p>
				</div>
			</div>
			{
				Array.isArray(transactionDetails) && transactionDetails.length ?
					transactionDetails.map((details) => {
						const getAmount = `&#8377; ${details.amount}`;
						return (
							<div className="transaction" key={details.id}>
								<div className="entry">
									<Moment date={details.timestamp} />
									<h1>{details.note}</h1>
								</div>
								<div className="out" style={{ textAlign: 'center' }}>
									Out
									{
										details.type ? 
											<h1>-</h1>
										: 
											<h1 dangerouslySetInnerHTML={{ __html: getAmount }}></h1>
									}
								</div>
								<div className="in" style={{ textAlign: 'center' }}>
									In
									{
										details.type ? 
											<h1 dangerouslySetInnerHTML={{ __html: getAmount }}></h1>
										:
											<h1>-</h1>
									}
								</div>
							</div>
						)
					})
				:
					<div style={{ backgroundColor: 'gray'}}>
						<h2 style={{ textAlign: 'center', padding: '20px' }}>No Entry Found!</h2>
					</div>
			}
			<div className="action-group">
				<button type="button" className="red" onClick={() => cashInOut(false)} data-testid="cashout-btn">Out</button>
				<button type="button" className="green" onClick={() => cashInOut(true)} data-testid="cashin-btn">IN</button>
			</div>
			{
				showModal ? 
					<div className="model">
						<div className="model-content">
							<h3 style={{ textAlign: 'center' }}>New Entry</h3>
							<button type="button" className="close-btn" onClick={() => setShowModal(false)}>Close</button>
							<input type="number" data-testid="amount" value={amount} onChange={e => setAmount(e.target.value)} />
							<textarea data-testid="note" placeholder="Entry Note" value={note} onChange={e => setNote(e.target.value)} />
							<button type="button" disabled={!amount} data-testid="create-entry-btn" onClick={() => addSub()} className={inOut ? 'green-btn' : 'red-btn'}>
								{ inOut ? 'IN' : 'OUT'}
							</button>
						</div>
					</div>
				:
					<></>
			}

		</div>
	);
}

export default App;
