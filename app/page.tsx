"use client";

import { useState } from "react";

export default function Home() {
  const [targetProfit, setTargetProfit] = useState("");
  const [shippingFee, setShippingFee] = useState("");
  const [costPrice, setCostPrice] = useState("");
  const [feePercent, setFeePercent] = useState("10");

  const profit = Number(targetProfit) || 0;
const shipping = Number(shippingFee) || 0;
const cost = Number(costPrice) || 0;

const feeRate = (Number(feePercent) || 0) / 100;

const requiredPrice =
  profit > 0 && feeRate < 1
    ? Math.ceil((profit + shipping + cost) / (1 - feeRate))
    : 0;

const fee =
  requiredPrice > 0
    ? Math.floor(requiredPrice * feeRate)
    : 0;
const profitRate =
  requiredPrice > 0
    ? (profit / requiredPrice) * 100
    : 0;

const costRate =
  requiredPrice > 0
    ? ((cost + shipping + fee) / requiredPrice) * 100
    : 0;

const safetyMargin =
  requiredPrice > 0
    ? 100 - costRate
    : 0;
    const profitScore =
  profit <= 0
    ? 0
    : profit < 500
    ? 10
    : profit < 1000
    ? 20
    : profit < 2000
    ? 30
    : 40;

const profitRateScore =
  profitRate <= 0
    ? 0
    : profitRate < 5
    ? 5
    : profitRate < 10
    ? 15
    : profitRate < 20
    ? 30
    : profitRate < 30
    ? 45
    : 60;

const score = profitScore + profitRateScore;

let rank = "D";

if (profit <= 0 || requiredPrice <= 0) {
  rank = "D";
} else if (score >= 85) {
  rank = "S";
} else if (score >= 70) {
  rank = "A";
} else if (score >= 55) {
  rank = "B";
} else if (score >= 40) {
  rank = "C";
}

if (profitRate < 5 && rank !== "D") {
  rank = "C";
}

const comment =
  rank === "S"
    ? "目標利益額と利益率の両方に余裕があります。販売相場と合えば、利益を確保しやすい価格設定です。"
    : rank === "A"
    ? "目標利益と利益率のバランスが良い価格設定です。相場を確認しながら出品を検討できます。"
    : rank === "B"
    ? "利益は確保できますが、値下げや追加費用が発生すると利益が小さくなる可能性があります。"
    : rank === "C"
    ? "利益率が低めです。値下げ・送料・追加費用を考えると余裕が少ない価格設定です。"
    : "この条件では十分な利益を確保しにくいため、目標利益や仕入れ値を見直してみましょう。";
  const reset = () => {
  setTargetProfit("");
  setShippingFee("");
  setCostPrice("");
  setFeePercent("10");
};

  return (
    <main className="min-h-screen bg-gray-100 px-4 py-10 text-gray-900">
     <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow p-6">
        <h1 className="mb-2 text-2xl font-bold">
  販売価格・利益逆算ツール
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
          <div>
  <input
    type="number"
    value={feePercent}
    onChange={(e) => setFeePercent(e.target.value)}
    min="0"
    max="99"
    step="0.1"
    placeholder="販売手数料率（例：10）"
    className="w-full rounded border p-3"
  />

  <div className="mt-2 grid grid-cols-3 gap-2">
    {["5", "10", "15"].map((value) => (
      <button
        key={value}
        type="button"
        onClick={() => setFeePercent(value)}
        className={`rounded border py-2 text-sm font-semibold ${
          feePercent === value
            ? "border-black bg-black text-white"
            : "border-gray-300 bg-white text-gray-700"
        }`}
      >
        {value}%
      </button>
    ))}
  </div>
</div>
        </div>

        <div className="mt-6 rounded-xl bg-gray-50 p-4">
          <p className="text-sm text-gray-600">必要販売価格</p>
          <p className="text-3xl font-bold">
            {requiredPrice.toLocaleString()}円
          </p>

          <p className="mt-4 text-sm text-gray-600">
  販売手数料（{feePercent}%）
</p>
          <p className="text-xl font-semibold">
            {fee.toLocaleString()}円
          </p>
        </div>
<div className="mt-6 rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
  <p className="text-sm font-semibold text-gray-500">
    ANT FARM SCORE
  </p>

  {targetProfit === "" || shippingFee === "" || costPrice === "" ? (
    <p className="mt-3 text-sm text-gray-600">
      目標利益・送料・仕入れ値を入力するとSCOREを判定します。
    </p>
  ) : (
    <>
      <div className="mt-2 flex items-end justify-between gap-4">
        <div>
          <p className="text-4xl font-extrabold text-gray-900">
            {score}
            <span className="ml-1 text-lg font-semibold text-gray-500">
              / 100
            </span>
          </p>

          <p className="mt-1 text-sm font-semibold text-gray-700">
            ランク：{rank}
          </p>
        </div>

        <div className="text-right">
          <p className="text-xl">
            {score >= 85
              ? "⭐⭐⭐⭐⭐"
              : score >= 70
              ? "⭐⭐⭐⭐☆"
              : score >= 55
              ? "⭐⭐⭐☆☆"
              : score >= 40
              ? "⭐⭐☆☆☆"
              : "⭐☆☆☆☆"}
          </p>
        </div>
      </div>

      <div className="mt-5 border-t border-gray-200 pt-4">
        <p className="text-sm font-semibold text-gray-600">
          SCORE内訳
        </p>

        <ul className="mt-2 space-y-1 text-sm text-gray-600">
          <li>目標利益：{profitScore} / 40点</li>
          <li>利益率：{profitRateScore} / 60点</li>
        </ul>
      </div>

      <div className="mt-5 border-t border-gray-200 pt-4">
        <p className="text-sm font-semibold text-gray-600">
          判定コメント
        </p>

        <p className="mt-2 text-sm leading-6 text-gray-700">
          {comment}
        </p>
      </div>

      <div className="mt-5 border-t border-gray-200 pt-4">
        <p className="text-sm font-semibold text-gray-600">
          SCORE判定基準
        </p>

        <ul className="mt-2 space-y-1 text-sm text-gray-600">
          <li>⭐⭐⭐⭐⭐　S：85〜100点　かなり良い価格設定</li>
          <li>⭐⭐⭐⭐☆　A：70〜84点　良い価格設定</li>
          <li>⭐⭐⭐☆☆　B：55〜69点　条件を確認して判断</li>
          <li>⭐⭐☆☆☆　C：40〜54点　慎重に判断</li>
          <li>⭐☆☆☆☆　D：0〜39点　条件の見直し推奨</li>
        </ul>
      </div>
    </>
  )}
</div>
        <button
          onClick={reset}
          className="mt-6 w-full rounded bg-black py-3 font-bold text-white"
        >
          
          リセット
        </button>
               
      </div>
      <section className="mx-auto mt-6 max-w-3xl rounded-xl border bg-white p-5">
  <h2 className="mb-2 text-xl font-bold">
    メルカリ利益逆算の早見表
  </h2>

  <p className="mb-4 text-sm text-gray-600">
    仕入れ値1,000円・送料750円・販売手数料10%の場合の目安です。
  </p>

  <div className="overflow-x-auto">
    <table className="w-full border-collapse text-sm">
      <thead>
        <tr className="bg-gray-100">
          <th className="border p-2">欲しい利益</th>
          <th className="border p-2">必要販売価格</th>
          <th className="border p-2">販売手数料</th>
        </tr>
      </thead>

      <tbody>
        {[
          [500, 2500, 250],
          [1000, 3056, 305],
          [2000, 4167, 416],
          [3000, 5278, 527],
          [5000, 7500, 750],
        ].map(([target, price, fee]) => (
          <tr key={target}>
            <td className="border p-2">
              {target.toLocaleString()}円
            </td>
            <td className="border p-2 font-semibold">
              {price.toLocaleString()}円
            </td>
            <td className="border p-2">
              {fee.toLocaleString()}円
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>

  <p className="mt-3 text-xs text-gray-500">
    ※実際の販売価格は送料・仕入れ値・手数料率によって変わります。
  </p>
</section>
      <section className="mt-12 text-left max-w-3xl mx-auto space-y-6">

  <div>
    <h2 className="text-2xl font-bold mb-3">
      利益を残すには販売価格をいくらにすればいい？
    </h2>
    <p>
      フリマアプリやネットショップでは、仕入れ値だけを見て販売価格を決めると、
      手数料や送料を差し引いたあとに利益がほとんど残らないことがあります。
      目標利益から逆算して販売価格を決めることで、赤字販売を防ぎやすくなります。
    </p>
  </div>

  <div>
    <h2 className="text-2xl font-bold mb-3">
      メルカリで500円利益を出すにはいくらで売ればいい？
    </h2>
    <p>
      例えば仕入れ値が1000円で、送料や販売手数料がかかる場合、
      500円の利益を残すには単純に1500円で売るだけでは足りないことがあります。
      販売手数料や送料を含めて逆算することが大切です。
    </p>
  </div>

  <div>
    <h2 className="text-2xl font-bold mb-3">
      値下げ前に利益が残るか確認しよう
    </h2>
    <p>
      フリマ販売では値下げ交渉を受けることがあります。
      しかし、値下げ後の販売価格で利益が残るか確認しないと、
      思ったより利益が少なくなることがあります。
      価格変更前に利益を逆算しておくと安心です。
    </p>
  </div>

  <div>
    <h2 className="text-2xl font-bold mb-3">
      よくある質問
    </h2>
    <p>
      Q. 送料込み価格でも使えますか？<br />
      A. はい。送料や手数料を含めた販売価格の目安確認に使えます。<br /><br />

      Q. フリマアプリの値下げ判断にも使えますか？<br />
      A. はい。値下げ後に利益が残るか確認する目安になります。
    </p>
  </div>

</section>
      <section className="mt-10 max-w-3xl mx-auto bg-white rounded-xl p-6">
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
<section className="mt-10 max-w-3xl mx-auto bg-white rounded-xl p-6">
  <h2 className="text-xl font-bold mb-4">
    販売価格を逆算する具体例
  </h2>

  <p className="mb-3">
    たとえば、仕入れ値1,000円、送料750円の商品で、
    500円の利益を残したい場合を考えます。
  </p>

  <ul className="list-disc pl-6 space-y-1">
    <li>目標利益：500円</li>
    <li>仕入れ値：1,000円</li>
    <li>送料：750円</li>
    <li>メルカリ販売手数料：販売価格の10%</li>
  </ul>

  <p className="mt-3">
    このツールでは販売手数料10%も考慮して、
    目標利益を確保するために必要な販売価格を自動で逆算します。
  </p>

  <p className="mt-3 text-sm text-gray-600">
    実際の出品では、値下げや追加費用が発生する可能性もあるため、
    計算結果を最低ラインの目安として利用してください。
  </p>
</section>
     <section className="mt-10 max-w-3xl mx-auto rounded-xl border bg-white p-5">
 <h2 className="text-xl font-bold mb-3">
  他の便利ツール
</h2>

<ul className="list-disc space-y-2 pl-6 text-blue-600 underline">
  <li>
    <a href="https://profit-rate-calc.vercel.app/">
      利益率計算ツール
    </a>
  </li>
  <li>
    <a href="https://fee-calc-seven.vercel.app/">
      販売手数料計算ツール
    </a>
  </li>
  <li>
    <a href="https://amazon-fee-calc.vercel.app/">
      Amazon手数料計算ツール
    </a>
  </li>
  <li>
    <a href="https://shipping-profit-calc.vercel.app/">
      送料込み利益計算ツール
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
  <li>
    <a href="https://shipping-calc-olive.vercel.app/">
      送料計算ツール
    </a>
  </li>
  <li>
    <a href="https://discount-rate-calc.vercel.app/">
      割引率計算ツール
    </a>
  </li>
  <li>
    <a href="https://calc-tools-mauve.vercel.app/">
      総合計算ツール
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