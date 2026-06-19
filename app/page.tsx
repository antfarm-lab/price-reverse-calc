"use client";

import { useState } from "react";

export default function Home() {
  const [targetProfit, setTargetProfit] = useState("");
  const [shippingFee, setShippingFee] = useState("");
  const [costPrice, setCostPrice] = useState("");

  const profit = Number(targetProfit) || 0;
  const shipping = Number(shippingFee) || 0;
  const cost = Number(costPrice) || 0;

  const requiredPrice =
    profit > 0 ? Math.ceil((profit + shipping + cost) / 0.9) : 0;

  const fee = requiredPrice > 0 ? Math.floor(requiredPrice * 0.1) : 0;

  const reset = () => {
    setTargetProfit("");
    setShippingFee("");
    setCostPrice("");
  };

  return (
    <main className="min-h-screen bg-gray-100 px-4 py-10 text-gray-900">
      <div className="mx-auto max-w-xl rounded-2xl bg-white p-6 shadow">
        <h1 className="mb-2 text-2xl font-bold">
          メルカリ利益逆算ツール
        </h1>
        <p className="mb-6 text-sm text-gray-600">
          欲しい利益から、必要な販売価格を逆算します。
        </p>

        <div className="space-y-4">
          <input
            type="number"
            value={targetProfit}
            onChange={(e) => setTargetProfit(e.target.value)}
            placeholder="欲しい利益（例：3000）"
            className="w-full rounded border p-3"
          />

          <input
            type="number"
            value={shippingFee}
            onChange={(e) => setShippingFee(e.target.value)}
            placeholder="送料（例：750）"
            className="w-full rounded border p-3"
          />

          <input
            type="number"
            value={costPrice}
            onChange={(e) => setCostPrice(e.target.value)}
            placeholder="仕入れ値（例：2200）"
            className="w-full rounded border p-3"
          />
        </div>

        <div className="mt-6 rounded-xl bg-gray-50 p-4">
          <p className="text-sm text-gray-600">必要販売価格</p>
          <p className="text-3xl font-bold">
            {requiredPrice.toLocaleString()}円
          </p>

          <p className="mt-4 text-sm text-gray-600">メルカリ手数料（10%）</p>
          <p className="text-xl font-semibold">
            {fee.toLocaleString()}円
          </p>
        </div>

        <button
          onClick={reset}
          className="mt-6 w-full rounded bg-black py-3 font-bold text-white"
        >
          リセット
        </button>
      </div>
    </main>
  );
}