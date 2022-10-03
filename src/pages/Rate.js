import React, { useState, useEffect } from 'react'
import { Tabs, Tab, Content } from "./Tabs";
import axios from 'axios';

function Rate() {
    const [currencyRate, setCurrencyRate] = useState([]);
    const [dataTrue, setDataTrue] = useState(false);
    useEffect(() => {
        const fetchCurrency = async () => {
            try {

                const res = await axios.get("http://www.floatrates.com/daily/try.json",)
                setCurrencyRate(res.data);
                setDataTrue(true);
            }
            catch (err) {

            }
        }

        fetchCurrency();
    }, []);
    const [tab, setTab] = useState(1);
    const changeTab = (index) => {
        setTab(index)
    }

    function getCurrency() {
        if (!dataTrue)
            return
        const result = Object.values(currencyRate).map(key =>
            <tr>
                <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                    <div class="flex items-center">
                        <div class="ml-4">
                            <div class="text-sm leading-5 font-medium text-gray-900">{key.code}</div>
                        </div>
                    </div>
                </td>

                <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                    <div class="text-sm leading-5 text-gray-900">{key.name}</div>
                </td>

                <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                    <div class="text-sm leading-5 text-gray-500">{key.inverseRate}</div>
                </td>

            </tr>
        )
        return result;
    }

    return (
        <div class="border-2 border-gray-300 p-4 rounded-lg bg-gray-100">
            <Tabs>
                <Tab onClick={() => changeTab(1)} active={tab === 1}>
                    Kripto Para
                </Tab>
                <Tab onClick={() => changeTab(2)} active={tab === 2}>
                    Döviz Kurları
                </Tab>
            </Tabs>
            <div class="my-8">
                <Content active={tab === 1}>
                    <div class="flex flex-col mt-8">
                        <div class="-my-2 py-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
                            <div
                                class="align-middle inline-block min-w-full shadow overflow-hidden sm:rounded-lg border-b border-gray-200">
                                <table class="min-w-full">
                                    <thead>
                                        <tr>
                                            <th
                                                class="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                                                SEMBOL</th>
                                            <th
                                                class="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                                                İSİM</th>
                                            <th
                                                class="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                                                FİYAT(USD)</th>
                                            <th
                                                class="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                                                PİYASA DEĞERİ</th>
                                        </tr>
                                    </thead>

                                    <tbody class="bg-white">
                                        <tr>
                                            <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                                <div class="flex items-center">
                                                    <div class="ml-4">
                                                        <div class="text-sm leading-5 font-medium text-gray-900">BTC</div>
                                                    </div>
                                                </div>
                                            </td>

                                            <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                                <div class="text-sm leading-5 text-gray-900">Bitcoin</div>
                                            </td>

                                            <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                                <div class="text-sm leading-5 text-gray-500">50.852,8</div>
                                            </td>

                                            <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                                <div class="text-sm leading-5 text-gray-500">$956,10B	</div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </Content>
                <Content active={tab === 2}>
                    <div class="flex flex-col mt-8">
                        <div class="-my-2 py-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
                            <div
                                class="align-middle inline-block min-w-full shadow overflow-hidden sm:rounded-lg border-b border-gray-200">
                                <table class="min-w-full">
                                    <thead>
                                        <tr>
                                            <th
                                                class="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                                                PARA BİRİMİ</th>
                                            <th
                                                class="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                                                PARA ADI</th>
                                            <th
                                                class="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                                                PARA DEĞERİ</th>
                                        </tr>
                                    </thead>

                                    <tbody class="bg-white">

                                        {getCurrency()}


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

export default Rate
