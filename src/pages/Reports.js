import React, { useEffect, useState } from 'react'
import { Tabs, Tab, Content } from "./Tabs";
import { useDispatch, useSelector } from 'react-redux';

import { getExpense } from "../redux/actions/expenseAction"

import { getIncome } from "../redux/actions/incomeAction"
import Spinner from "../Spinner"

import axios from "axios"
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    Pie,
    PieChart
} from "recharts";

function Reports() {
    const [tab, setTab] = useState(1);
    const changeTab = (index) => {
        setTab(index)
    }
    const allExpense = useSelector(state => state.expenseReducer.expense);

    const allIncome = useSelector(state => state.incomeReducer.income);
    const incomeLoading = useSelector(state => state.incomeReducer.loading);

    const expenseLoading = useSelector(state => state.expenseReducer.loading);

    const [expnseData, setExpenseData] = useState([]);
    const [incomeData, setIncomeData] = useState([]);
    const [sumExpense, setSumExpense] = useState(0);
    const [sumIncome, setSumIncome] = useState(0);
    const [categoryData, setCategoryData] = useState([]);
    const dispatch = useDispatch();
    const expenses = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    const monthNames = ["Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran",
        "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"
    ];

    useEffect(() => {
        dispatch(getIncome())
    }, [allIncome])

    useEffect(() => {
        dispatch(getExpense())
    }, [allExpense])

    useEffect(() => {
        async function fetchData() {
            if (incomeData.length === 0) {
                var categoryExpenses = {}
                var sumExpense = 0
                var sumIncome = 0
                const expenseRes = await axios.get(" /api/expense");
                expenseRes.data.map(expense => {
                    let expenseDate = new Date(expense.date)
                    expenses[expenseDate.getMonth()] += expense.amount
                    sumExpense += expense.amount
                    return expense
                })

                const incomeRes = await axios.get(" /api/income");
                incomeRes.data.map(income => {
                    sumIncome += income.amount
                    return income
                })

                const categoryRes = await axios.get(" /api/category");

                categoryRes.data.map((cat, index) => {
                    expenseRes.data.map(expense => {
                        if (cat.categoryName === expense.category.categoryName) {
                            if (!categoryExpenses[cat.categoryName]) {
                                categoryExpenses[cat.categoryName] = expense.amount
                            } else {
                                categoryExpenses[cat.categoryName] += expense.amount
                            }
                        }
                        return expense
                    })
                    return cat;
                })
                expenses.map((expense, index) => {
                    setExpenseData(oldArray => [...oldArray, { "name": monthNames[index], "expense": expense }]);
                    return expense
                })
                for (const key in categoryExpenses) {
                    setCategoryData(oldArray => [...oldArray, { "name": key, "expense": categoryExpenses[key] }]);
                }
                setSumExpense(sumExpense);
                setSumIncome(sumIncome);
                setIncomeData(incomeRes.data);
            }
        }
        fetchData();

    }, [incomeData])

    function getMonthExpenseChart() {
        return (
            <BarChart
                width={900}
                height={300}
                data={expnseData}
                margin={{
                    top: 20,
                    right: 30,
                    left: 20,
                    bottom: 5
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="expense" stackId="a" fill="#8884d8" />
            </BarChart>
        )
    }


    function getCategoryChart() {
        return (
            <BarChart
                width={900}
                height={300}
                data={categoryData}
                margin={{
                    top: 20,
                    right: 30,
                    left: 20,
                    bottom: 5
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="expense" stackId="a" fill="#8884d8" />
            </BarChart>
        )
    }

    function addZero(i) {
        if (i < 10) {
            i = "0" + i;
        }
        return i;
    }

    function formatDate(isoDate) {
        var d = new Date(isoDate);
        var months = ["Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran", "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"]
        var days = ["Pazartesi", "Salı", "Çarşamba", "Perşembe", "Cuma", "Cumartesi", "Pazar"]
        return (d.getDate().toString() + " " + months[parseInt(d.getMonth())] + " " + d.getFullYear() + " " + days[d.getDay() - 1] + " " + addZero(d.getHours()) + ":" + addZero(d.getMinutes()));
    };




    return (
        <div>



            <Tabs>
                <Tab onClick={() => changeTab(1)} active={tab === 1}>
                    Aylık Toplam Harcamalar
                </Tab>
                <Tab onClick={() => changeTab(2)} active={tab === 2}>
                    Kategoriye Göre Harcamalar
                </Tab>
                <Tab onClick={() => changeTab(3)} active={tab === 3}>
                    Harcamalar ve Hesaplar
                </Tab>
            </Tabs>
            <div class="my-8">
                <Content active={tab === 1}>
                    <div class="flex flex-col mt-8">
                        <div class="-my-2 py-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
                            <div
                                class="flex align-middle inline-block min-w-full shadow overflow-hidden sm:rounded-lg border-b border-gray-200">
                                <div>
                                    <h1 className="font-semibold text-3xl">Aylara Göre Harcamalar</h1>
                                    {getMonthExpenseChart()}
                                </div>
                                <div>
                                    <PieChart width={600} height={250}>
                                        <Pie data={expnseData} dataKey="gider" nameKey="name" outerRadius={100} fill="#8884d8" />
                                        <Tooltip />
                                    </PieChart>
                                </div>
                            </div>
                        </div>
                    </div>
                </Content>
                <Content active={tab === 2}>
                    <div class="flex flex-col mt-8">
                        <div class="-my-2 py-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
                            <div
                                class="align-middle inline-block min-w-full shadow overflow-hidden sm:rounded-lg border-b border-gray-200">
                                {getCategoryChart()}
                            </div>
                        </div>
                    </div>
                </Content>
                <Content active={tab === 3}>
                    <div class="flex flex-col mt-8">
                        <div class="-my-2 py-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">



                            <div class="my-8">
                                <div class="flex flex-wrap -mx-6">
                                    <div class="w-full px-6 sm:w-1/2 xl:w-1/3">
                                        <div class="flex items-center px-5 py-6 shadow-sm rounded-md bg-white">
                                            <div class="p-3 rounded-full bg-green-600 bg-opacity-75">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                            </div>

                                            <div class="mx-5">
                                                <h4 class="text-2xl font-semibold text-gray-700">{sumIncome} TL</h4>
                                                <div class="text-gray-500">Toplam Gelir</div>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="w-full mt-6 px-6 sm:w-1/2 xl:w-1/3 sm:mt-0">
                                        <div class="flex items-center px-5 py-6 shadow-sm rounded-md bg-white">
                                            <div class="p-3 rounded-full bg-red-600 bg-opacity-75">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                            </div>

                                            <div class="mx-5">
                                                <h4 class="text-2xl font-semibold text-gray-700">{sumExpense} TL</h4>
                                                <div class="text-gray-500">Toplam Gider</div>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="w-full mt-6 px-6 sm:w-1/2 xl:w-1/3 xl:mt-0">
                                        <div class="flex items-center px-5 py-6 shadow-sm rounded-md bg-white">
                                            <div class="p-3 rounded-full bg-yellow-600 bg-opacity-75">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
                                                </svg>
                                            </div>

                                            <div class="mx-5">
                                                <h4 class="text-2xl font-semibold text-gray-700">{sumIncome - sumExpense} TL</h4>
                                                <div class="text-gray-500">Varlıklarım</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>


                            <div
                                class="mb-8 align-middle inline-block min-w-full shadow overflow-hidden sm:rounded-lg border-b border-gray-200">
                                <h1 className="text-3xl font-semibold mb-2">Gelirler</h1>
                                <table class="min-w-full mb-8">
                                    <thead>
                                        <tr>
                                            <th
                                                class="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                                                Başlık</th>
                                            <th
                                                class="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                                                Miktar</th>
                                            <th
                                                class="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                                                Tarih</th>
                                            <th
                                                class="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                                                Hesap</th>
                                        </tr>
                                    </thead>

                                    <tbody class="bg-white">
                                        {incomeLoading
                                            ? <Spinner />
                                            : allIncome.map((income, index) => (
                                                <tr key={index}>
                                                    <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                                        <div class="flex items-center">
                                                            <div class="ml-4">
                                                                <div class="text-sm leading-5 font-medium text-gray-900">{income.title}</div>
                                                            </div>
                                                        </div>
                                                    </td>

                                                    <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                                        <div class="text-sm leading-5 text-gray-900">{income.amount}</div>
                                                    </td>
                                                    <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                                        <div class="text-sm leading-5 text-gray-900">{formatDate(income.date)}</div>
                                                    </td>
                                                    <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                                        <div class="text-sm leading-5 text-gray-900">{income.account.accountName}</div>
                                                    </td>
                                                </tr>
                                            ))
                                        }

                                    </tbody>
                                </table>
                            </div>

                            <div
                                class="align-middle inline-block min-w-full shadow overflow-hidden sm:rounded-lg border-b border-gray-200">
                                <h1 className="text-3xl font-semibold mb-2">Giderler</h1>
                                <table class="min-w-full mb-8">
                                    <thead>
                                        <tr>
                                            <th
                                                class="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                                                Başlık</th>
                                            <th
                                                class="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                                                Miktar</th>
                                            <th
                                                class="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                                                Tarih</th>
                                            <th
                                                class="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                                                Hesap</th>
                                            <th
                                                class="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                                                Kategori</th>
                                        </tr>
                                    </thead>

                                    <tbody class="bg-white">
                                        {expenseLoading
                                            ? <Spinner />
                                            : allExpense.map((expense, index) => (
                                                <tr key={index}>
                                                    <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                                        <div class="flex items-center">
                                                            <div class="ml-4">
                                                                <div class="text-sm leading-5 font-medium text-gray-900">{expense.title}</div>
                                                            </div>
                                                        </div>
                                                    </td>

                                                    <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                                        <div class="text-sm leading-5 text-gray-900">{expense.amount}</div>
                                                    </td>
                                                    <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                                        <div class="text-sm leading-5 text-gray-900">{formatDate(expense.date)}</div>
                                                    </td>
                                                    <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                                        <div class="text-sm leading-5 text-gray-900">{expense.account.accountName}</div>
                                                    </td>
                                                    <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                                        <div class="text-sm leading-5 text-gray-900">{expense.category.categoryName}</div>
                                                    </td>
                                                </tr>
                                            ))
                                        }

                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </Content>

            </div>

        </div>
    )
}

export default Reports
