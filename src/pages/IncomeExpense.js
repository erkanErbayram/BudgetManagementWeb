import React, { Fragment, useEffect, useState } from 'react'
import { Tabs, Tab, Content } from "./Tabs";
import { Link } from 'react-router-dom'
import { Dialog, Transition } from '@headlessui/react'
import { useDispatch, useSelector } from 'react-redux';
import { getIncome, setIncome, deleteIncome } from "../redux/actions/incomeAction"
import { getExpense, setExpense, deleteExpense } from "../redux/actions/expenseAction"
import { getAccount } from "../redux/actions/accountAction"

import { setCategory, getCategory } from "../redux/actions/categoryAction"
import Spinner from "../Spinner"
function IncomeExpense() {
    const [tab, setTab] = useState(3);
    const [categoryModal, setcategoryModal] = useState(false);
    const dispatch = useDispatch();
    const allIncome = useSelector(state => state.incomeReducer.income);
    const allExpense = useSelector(state => state.expenseReducer.expense);
    const allAccount = useSelector(state => state.accountReducer.account);
    const allCategory = useSelector(state => state.categoryReducer.category);

    const incomeLoading = useSelector(state => state.accountReducer.loading);
    const expenseLoading = useSelector(state => state.accountReducer.loading);
    const accountLoading = useSelector(state => state.accountReducer.loading);
    const categoryLoading = useSelector(state => state.accountReducer.loading);



    useEffect(() => {
        dispatch(getExpense());
        dispatch(getIncome());
        dispatch(getAccount());
        dispatch(getCategory());
    }, []);

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


    const changeTab = (index) => {
        setTab(index)
    }

    const [categoryFormData, setCategoryFormData] = useState({
        categoryName: ""
    })

    const { categoryName } = categoryFormData;

    const onCategorySubmit = (e) => {
        e.preventDefault();
        dispatch(setCategory({ categoryName }));
    }

    const onCategoryChange = (e) => {
        setCategoryFormData({ ...categoryFormData, [e.target.name]: e.target.value });
    }




    const [expenseFormData, setExpenseFormData] = useState({
        expenseAccount: "",
        expenseCategory: "",
        expenseTitle: "",
        expenseAmount: "",
        expenseDate: ""
    })

    const { expenseAccount, expenseCategory, expenseTitle, expenseAmount, expenseDate } = expenseFormData;

    const onGiderSubmit = (e) => {
        e.preventDefault();
        dispatch(setExpense({ account: expenseAccount, category: expenseCategory, title: expenseTitle, amount: expenseAmount, date: expenseDate }));
    }

    const onGiderChange = (e) => {
        setExpenseFormData({ ...expenseFormData, [e.target.name]: e.target.value });
    }



    const [incomeFormData, setIncomeFormData] = useState({
        incomeAccount: "",
        incomeTitle: "",
        incomeAmount: "",
        incomeDate: ""
    })

    const { incomeAccount, incomeTitle, incomeAmount, incomeDate } = incomeFormData;

    const onGelirSubmit = (e) => {
        e.preventDefault();
        dispatch(setIncome({ account: incomeAccount, title: incomeTitle, amount: incomeAmount, date: incomeDate }));
    }

    const onGelirChange = (e) => {
        setIncomeFormData({ ...incomeFormData, [e.target.name]: e.target.value });
    };


    return (
        <div>
            <Tabs>
                <Tab onClick={() => changeTab(1)} active={tab === 1}>
                    Gelir Ekle
                </Tab>
                <Tab onClick={() => changeTab(2)} active={tab === 2}>
                    Gider Ekle
                </Tab>
                <Tab onClick={() => changeTab(3)} active={tab === 3}>
                    Gelir Detay
                </Tab>
                <Tab onClick={() => changeTab(4)} active={tab === 4}>
                    Gider Detay
                </Tab>
                <Tab onClick={() => changeTab(5)} active={tab === 5}>
                    Kategori
                </Tab>
            </Tabs>
            <div class="my-8">
                <Content active={tab === 1}>
                    <div className="text-black-100 dark:text-gray-50">
                        <div class="flex flex-col bg-gray-100">
                            <div class="grid place-items-center mx-2 my-20">
                                <div class="w-11/12 p-12 sm:w-8/12 md:w-6/12 lg:w-5/12 2xl:w-4/12 px-6 py-10 sm:px-10 sm:py-6 bg-white rounded-lg shadow-md lg:shadow-lg">
                                    <h2 class="text-center font-semibold text-3xl lg:text-4xl text-gray-800">Gelir Ekle</h2>
                                    <form class="mt-10" onSubmit={(e) => onGelirSubmit(e)}>
                                        <label for="" class="block text-xs font-semibold text-gray-600 uppercase">Gelir Başlığı</label>
                                        <input name="incomeTitle" onChange={(e) => { onGelirChange(e); }} value={incomeTitle} placeholder="Gelir Başlığı Giriniz" class="block w-full py-3 px-1 mt-2 text-gray-800 appearance-none border-b-2 border-gray-100 focus:text-gray-500 focus:outline-none focus:border-gray-200" required />
                                        <label for="" class="block mt-2 text-xs font-semibold text-gray-600 uppercase">Miktar</label>
                                        <input name="incomeAmount" onChange={(e) => { onGelirChange(e); }} value={incomeAmount} placeholder="Miktar Giriniz" class="block w-full py-3 px-1 mt-2 mb-4 text-gray-800 appearance-none border-b-2 border-gray-100 focus:text-gray-500 focus:outline-none focus:border-gray-200" required />
                                        <label for="" class="block mt-2 text-xs font-semibold text-gray-600 uppercase">Gelir Tarihi</label>
                                        <input name="incomeDate" onChange={(e) => { onGelirChange(e); }} value={incomeDate} type="date" placeholder="Gelir Tarihini Giriniz" class="border border-gray-300 p-2 my-2 rounded-md focus:outline-none focus:ring-2 ring-blue-200" />
                                        <label for="" class="block mt-2 text-xs font-semibold text-gray-600 uppercase">Hesaplar</label>
                                        <select required name="incomeAccount" onChange={(e) => { onGelirChange(e); }} value={incomeAccount} class="block appearance-none w-full bg-grey-lighter border border-grey-lighter text-grey-darker py-3 px-4 pr-8 rounded">
                                            <option value="" selected>Hesabı Seçin</option>
                                            {accountLoading
                                                ? <Spinner />
                                                : allAccount.map(account => (
                                                    <option key={account._id} value={account._id}>{account.accountName}</option>
                                                ))
                                            }

                                        </select>

                                        <button onClick={() => console.log(incomeFormData)} type="button" class="w-full py-3 mt-10 bg-gray-800 rounded-sm font-medium text-white uppercase focus:outline-none hover:bg-gray-700 hover:shadow-none">Vazgeç</button>
                                        <button type="submit" class="w-full py-3 mt-5 bg-gray-800 rounded-sm font-medium text-white uppercase focus:outline-none hover:bg-gray-700 hover:shadow-none">Kaydet</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </Content>
                <Content active={tab === 2}>
                    <div className="text-black-100 dark:text-gray-50">
                        <div class="flex flex-col bg-gray-100">
                            <div class="grid place-items-center mx-2 my-20">
                                <div class="w-11/12 p-12 sm:w-8/12 md:w-6/12 lg:w-5/12 2xl:w-4/12 px-6 py-10 sm:px-10 sm:py-6 bg-white rounded-lg shadow-md lg:shadow-lg">
                                    <h2 class="text-center font-semibold text-3xl lg:text-4xl text-gray-800">Gider Ekle</h2>
                                    <form class="mt-10" onSubmit={(e) => onGiderSubmit(e)}>
                                        <label for="" class="block text-xs font-semibold text-gray-600 uppercase">Gider Başlığı</label>
                                        <input name="expenseTitle" onChange={(e) => onGiderChange(e)} value={expenseTitle} placeholder="Gider Başlığı Giriniz" class="block w-full py-3 px-1 mt-2 text-gray-800 appearance-none border-b-2 border-gray-100 focus:text-gray-500 focus:outline-none focus:border-gray-200" required />
                                        <label for="" class="block mt-2 text-xs font-semibold text-gray-600 uppercase">Miktar</label>
                                        <input name="expenseAmount" onChange={(e) => onGiderChange(e)} value={expenseAmount} placeholder="Miktar Giriniz" class="block w-full py-3 px-1 mt-2 mb-4 text-gray-800 appearance-none border-b-2 border-gray-100 focus:text-gray-500 focus:outline-none focus:border-gray-200" required />
                                        <label for="" class="block mt-2 text-xs font-semibold text-gray-600 uppercase">Gider Tarihi</label>
                                        <input name="expenseDate" onChange={(e) => onGiderChange(e)} value={expenseDate} type="date" placeholder="Gider Tarihini Giriniz" class="border border-gray-300 p-2 my-2 rounded-md focus:outline-none focus:ring-2 ring-blue-200" />
                                        <label for="" class="block mt-2 text-xs font-semibold text-gray-600 uppercase">Kategoriler</label>
                                        <select name="expenseCategory" onChange={(e) => { onGiderChange(e); }} value={expenseCategory} class="block appearance-none w-full bg-grey-lighter border border-grey-lighter text-grey-darker py-3 px-4 pr-8 rounded" id="grid-state">
                                            <option value="" selected>Kategori Seçiniz</option>
                                            {categoryLoading
                                                ? <Spinner />
                                                : allCategory.map(category => (
                                                    <option key={category._id} value={category._id}>{category.categoryName}</option>
                                                ))
                                            }
                                        </select>
                                        <label for="" class="block mt-2 text-xs font-semibold text-gray-600 uppercase">Hesaplar</label>
                                        <select name="expenseAccount" onChange={(e) => onGiderChange(e)} value={expenseAccount} class="block appearance-none w-full bg-grey-lighter border border-grey-lighter text-grey-darker py-3 px-4 pr-8 rounded" id="grid-state">
                                            <option value="" selected>Hesap Seçiniz</option>
                                            {accountLoading
                                                ? <Spinner />
                                                : allAccount.map(account => (
                                                    <option key={account._id} value={account._id}>{account.accountName}</option>
                                                ))}
                                        </select>
                                        <button onClick={() => { console.log(expenseFormData); console.log(expenseAccount) }} type="button" class="w-full py-3 mt-10 bg-gray-800 rounded-sm font-medium text-white uppercase focus:outline-none hover:bg-gray-700 hover:shadow-none">Vazgeç</button>
                                        <button type="submit" class="w-full py-3 mt-5 bg-gray-800 rounded-sm font-medium text-white uppercase focus:outline-none hover:bg-gray-700 hover:shadow-none">Kaydet</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </Content>
                <Content active={tab === 3}>
                    <div class="flex flex-col mt-8">
                        <div class="-my-2 py-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
                            <div
                                class="align-middle inline-block min-w-full shadow overflow-hidden sm:rounded-lg border-b border-gray-200">
                                <table class="min-w-full">
                                    <thead>
                                        <tr>
                                            <th
                                                class="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                                                Gelir Başlığı</th>
                                            <th
                                                class="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                                                Gelir Miktarı</th>
                                            <th
                                                class="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                                                Gelir Tarihi</th>
                                            <th
                                                class="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                                                Hesap Adı</th>
                                            <th class="px-6 py-3 border-b border-gray-200 bg-gray-50"></th>
                                        </tr>
                                    </thead>

                                    <tbody class="bg-white">
                                        {incomeLoading
                                            ? <Spinner />
                                            : allIncome.map((income) => (
                                                <tr key={income.id}>
                                                    <td class="px-2 py-4 whitespace-no-wrap border-b border-gray-200">
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
                                                        <div class="text-sm leading-5 text-gray-500">{formatDate(income.date)}</div>
                                                    </td>

                                                    <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                                        <div class="text-sm leading-5 text-gray-500">{income.account.accountName}</div>
                                                    </td>

                                                    <td
                                                        class="px-6 py-4 whitespace-no-wrap text-right border-b border-gray-200 text-sm leading-5 font-medium">
                                                        <button onClick={() => { dispatch(deleteIncome({ id: income._id })) }} class="text-indigo-600 hover:text-indigo-900">Delete</button>
                                                    </td>
                                                </tr>
                                            ))}

                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </Content>
                <Content active={tab === 4}>
                    <div class="flex flex-col mt-8">
                        <div class="-my-2 py-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
                            <div
                                class="align-middle inline-block min-w-full shadow overflow-hidden sm:rounded-lg border-b border-gray-200">
                                <table class="min-w-full">
                                    <thead>
                                        <tr>
                                            <th
                                                class="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                                                GİDER BAŞLIĞI</th>
                                            <th
                                                class="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                                                GİDER Miktarı</th>
                                            <th
                                                class="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                                                GİDER Tarihi</th>
                                            <th
                                                class="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                                                KATEGORİ</th>
                                            <th
                                                class="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                                                Hesap Adı</th>
                                            <th class="px-6 py-3 border-b border-gray-200 bg-gray-50"></th>
                                        </tr>
                                    </thead>

                                    <tbody class="bg-white">
                                        {expenseLoading
                                            ? <Spinner />
                                            : allExpense.map((expense) => (
                                                <tr>
                                                    <td class="px-2 py-4 whitespace-no-wrap border-b border-gray-200">
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
                                                        <div class="text-sm leading-5 text-gray-500">{formatDate(expense.date)}</div>
                                                    </td>

                                                    <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                                        <div class="text-sm leading-5 text-gray-500">{expense.category.categoryName}</div>
                                                    </td>

                                                    <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                                        <div class="text-sm leading-5 text-gray-500">{expense.account.accountName}</div>
                                                    </td>

                                                    <td
                                                        class="px-6 py-4 whitespace-no-wrap text-right border-b border-gray-200 text-sm leading-5 font-medium">
                                                        <button onClick={() => { dispatch(deleteExpense({ id: expense._id })) }} class="text-indigo-600 hover:text-indigo-900">Delete</button>
                                                    </td>
                                                </tr>
                                            ))}

                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </Content>
                <Content active={tab === 5}>
                    <div>
                        <div class="grid grid-cols-12 gap-4">
                            <div class="col-span-11">
                                <p class="text-gray-700 text-3xl font-medium">Kategoriler</p>
                            </div>
                            <div class="text-right">
                                <button onClick={() => { setcategoryModal(true) }}>
                                    <svg class="h-6 w-6 text-right" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                        stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </button>


                            </div>
                        </div>

                        <div class="flex flex-col mt-8">
                            <div class="-my-2 py-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
                                <div
                                    class="align-middle inline-block min-w-full shadow overflow-hidden sm:rounded-lg border-b border-gray-200">
                                    <table class="min-w-full">
                                        <thead>
                                            <tr>
                                                <th
                                                    class="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                                                    Kategori Adı</th>
                                                <th class="px-6 py-3 border-b border-gray-200 bg-gray-50"></th>
                                            </tr>
                                        </thead>

                                        <tbody class="bg-white">
                                            {categoryLoading
                                                ? <Spinner />
                                                : allCategory.map(category => (
                                                    <tr>
                                                        <td class="px-2 py-4 whitespace-no-wrap border-b border-gray-200">
                                                            <div class="flex items-center">
                                                                <div class="ml-4">
                                                                    <div class="text-sm leading-5 font-medium text-gray-900">{category.categoryName}</div>
                                                                </div>
                                                            </div>
                                                        </td>

                                                        <td
                                                            class="px-6 py-4 whitespace-no-wrap text-right border-b border-gray-200 text-sm leading-5 font-medium">
                                                            <Link to="#" class="text-indigo-600 hover:text-indigo-900">Delete</Link>
                                                        </td>
                                                    </tr>
                                                ))}

                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div >
                </Content>
            </div>
            <Transition appear show={categoryModal} as={Fragment}>
                <Dialog
                    as="div"
                    className="fixed inset-0 z-10 overflow-y-auto"
                    onClose={() => setcategoryModal(false)}
                >
                    <div className="min-h-screen text-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <Dialog.Overlay className="fixed inset-0" />
                        </Transition.Child>

                        <span
                            className="inline-block h-screen align-middle"
                            aria-hidden="true"
                        >
                            &#8203;
            </span>
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <form onSubmit={(e) => onCategorySubmit(e)}>
                                <div className="inline-block w-full max-w-2xl p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                                    <Dialog.Title
                                        as="div"
                                        className="flex flex-row justify-between p-6 bg-white border-b border-gray-200 rounded-tl-lg rounded-tr-lg"
                                    >
                                        <p class="font-semibold text-gray-800">Kategori Ekle</p>
                                    </Dialog.Title>
                                    <div className="mt-2">
                                        <div class="flex flex-col py-5 bg-gray-50">
                                            <p class="mb-2 font-semibold text-gray-700">Kategori Adı</p>
                                            <input name="categoryName" onChange={(e) => onCategoryChange(e)} value={categoryName} placeholder="Kategori Adı Giriniz" class="block w-full p-5 bg-white border border-gray-200 rounded shadow-sm appearance-none" required />
                                        </div>
                                    </div>

                                    <div className="mt-4">
                                        <button
                                            type="button"
                                            className="inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                                            onClick={() => setcategoryModal(false)}
                                        >
                                            Vazgeç
                                    </button>
                                        <button
                                            type="submit"
                                            className="ml-5 inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                                            onClick={() => setcategoryModal(false)}
                                        >
                                            Kaydet
                                    </button>
                                    </div>
                                </div>
                            </form>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition>
        </div>
    )
}

export default IncomeExpense
