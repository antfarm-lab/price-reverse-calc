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
     <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow p-6">
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
      <section className="mt-10 bg-white rounded-xl p-6">
  <h2 className="text-xl font-bold mb-4">
    販売価格を逆算することが重要な理由
  </h2>

  <p className="mb-3">
    フリマアプリで利益を確保するには、先に欲しい利益額を決めてから
    販売価格を設定することが重要です。
  </p>

  <p className="mb-3">
    手数料や送料を考慮せず価格設定すると、
    売れたあとに利益がほとんど残らないことがあります。
  </p>

  <p>
    この逆算ツールでは目標利益から必要な販売価格を自動計算できます。
  </p>
</section>
     <section className="mt-10 rounded-xl border bg-white p-5">
 <h2 className="text-xl font-bold mb-3">
  他の便利ツール
</h2>

<ul className="list-disc pl-6 space-y-2 text-blue-600 underline">
  <li>
    <a href="https://calc-tools-mauve.vercel.app/">
      総合計算ツール
    </a>
  </li>
  <li>
    <a href="https://shipping-calc-olive.vercel.app/">
      送料計算ツール
    </a>
  </li>
  <li>
    <a href="https://fee-calc-seven.vercel.app/">
      手数料計算ツール
    </a>
  </li>
  <li>
    <a href="https://profit-rate-calc.vercel.app/">
      利益率計算ツール
    </a>
  </li>
  <li>
    <a href="https://discount-rate-calc.vercel.app/">
      割引率計算ツール
    </a>
  </li>
  <li>
    <a href="https://shipping-profit-calc.vercel.app/">
      送料込み利益計算ツール
    </a>
  </li>
  <li>
    <a href="https://amazon-fee-calc.vercel.app/">
      Amazon手数料計算ツール
    </a>
  </li>
  <li>
    <a href="https://roi-calc-woad.vercel.app/">
      ROI計算ツール
    </a>
  </li>
  <li>
    <a href="https://break-even-calc-one.vercel.app/">
      損益分岐点計算ツール
    </a>
  </li>
</ul>
</section>
<p className="mt-6 text-xs text-gray-500 text-center">
  このサイトはメルカリ・Amazon・ラクマ・せどり・副業に役立つ無料計算ツールを公開しています。
</p>
<footer className="mt-8 text-center text-sm text-gray-500">
  <a className="underline" href="/privacy">
    プライバシーポリシー
  </a>
</footer>
    </main>
  );
}