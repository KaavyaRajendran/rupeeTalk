import React, {useReducer, createContext } from 'react';

import contextReducer from './contextReducer'

const initialState = JSON.parse(localStorage.getItem('transactions')) || [[{"amount":5000,"category":"Savings","type":"Income","date":"2022-06-11","id":"70f8cfbb-a736-4adc-aa2b-3fdef553efb8"},{"amount":5000,"category":"Travel","type":"Expense","date":"2022-06-11","id":"fe0755e1-f32f-4cfa-a0ce-cd9a801319fb"},{"amount":20000,"category":"Investments","type":"Income","date":"2022-06-14","id":"528779cc-a84c-4168-a05d-e61df9f052f4"},{"amount":5000,"category":"Clothes","type":"Expense","date":"2022-06-11","id":"1aa5b10b-4ff7-4fed-807c-fc2cce6c9917"}]]
export const ExpenseTrackerContext = createContext(initialState)

export const Provider = ({ children }) => {
        const [transactions, dispatch] = useReducer(contextReducer, initialState)

        // Action creators 

        const deleteTransaction = (id) => dispatch({ type: 'DELETE_TRANSACTION', payload: id})
        const addTransaction = (transaction) => dispatch({ type: 'ADD_TRANSACTION', payload: transaction})
        const balance = transactions.reduce((acc, currValue) => currValue.type === 'Expense' ? acc -= currValue.amount : acc += currValue.amount
        , 0)
        
        console.log(transactions)
        return (
            <ExpenseTrackerContext.Provider value={{
                deleteTransaction,
                addTransaction,
                transactions,
                balance
            }}>
                { children }
            </ExpenseTrackerContext.Provider>
        )
}