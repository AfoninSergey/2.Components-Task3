import styles from './App.module.css';
import { useState } from 'react';
import data from './data.json';

export const App = () => {
	const [operand1, setOperand1] = useState('');
	const [operand2, setOperand2] = useState('');
	const [operator, setOperator] = useState('');
	const [equals, setEquals] = useState('');
	const NUMS = data;

	const setOperandByBtn = (btn) => {
		if (equals) resetCalculator();
		if (
			btn === '0' &&
			(operand1 === '0' || operand1 === '-') &&
			operand2 === '0'
		)
			return;
		if (btn === '0' && operator !== '' && operand2 === '0') return;

		if (operator === '' && operand2 === '') {
			if (operand1 === '0') setOperand1('');
			if (operand1 === '-0') setOperand1('-');
			setOperand1((operand1) => operand1 + btn);
		} else {
			if (operand2 === '0') setOperand2('');
			setOperand2((operand2) => operand2 + btn);
		}
	};

	const setOperatorByBtn = (btn) => {
		switch (btn) {
			case 'C':
				resetCalculator();
				break;
			case '-':
				setEquals('');
				if (operand1 === '') {
					setOperand1('-');
					setOperator('');
				} else if (operand1 !== '' && operand1 !== '-') {
					setOperator('-');
				}
				break;
			case '+':
				setEquals('');
				if (operand1 !== '-') setOperator('+');
				break;
			default:
				setEquals('equals');
				getCalcResult();
				break;
		}
	};

	const getCalcResult = () => {
		let result = '';
		if (
			operand1 !== '' &&
			operand1 !== '-' &&
			operand1 !== '0' &&
			(operand2 === '' || operand2 === '0')
		) {
			result = operand1;
		} else if (operator === '-' && operand1 !== '-') {
			result = operand1 - operand2;
		} else if (operator === '+') {
			result = +operand1 + +operand2;
		}
		if (result === '-0') result = '';
		setOperand1(result);
		setOperand2('');
		setOperator('');
	};

	const resetCalculator = () => {
		setEquals('');
		setOperand1('');
		setOperand2('');
		setOperator('');
	};

	const getClassname = (btn) => {
		switch (btn) {
			case 'C':
				return styles.clear;
			case '+':
				return styles.plus;
			case '-':
				return styles.minus;
			case '=':
				return styles.equal;
			default:
				return styles[`num_${btn}`];
		}
	};

	return (
		<section className={styles.calculator}>
			<div className={styles.value + ' ' + styles[equals]}>
				{operand1 || 0}
				{operator}
				{operand2}
			</div>
			<ul className={styles.buttons}>
				{NUMS.map((num, i) => (
					<li
						key={i}
						className={styles.button + ' ' + getClassname(num)}
						onClick={
							i > 9
								? () => setOperatorByBtn(num)
								: () => setOperandByBtn(num)
						}
					>
						{num}
					</li>
				))}
			</ul>
		</section>
	);
};
