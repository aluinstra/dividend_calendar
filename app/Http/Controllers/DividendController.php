<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Dividend;
use App\Models\Stock;

class DividendController extends Controller
{
    public function index()
    {
        $dividends = Dividend::all();

        return response()->json($dividends);
    }

    
    public function stockDividend(Stock $stock) 
    {
        $dividends = $stock->dividends;

        return response()->json($dividends);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'stock_id' => 'required',
            'dividendYield' => 'required',
            'paymentDates' => 'required',
            'declarationDates' => 'required',
        ]);

        $dividend = Dividend::create($data);

        return response()->json($dividend, 201);
    }

    public function show($id)
    {
        $dividend = Dividend::findOrFail($id);

        return response()->json($dividend);
    }

    public function update(Request $request, $id)
    {
        $data = $request->validate([
            'stock_id' => 'required',
            'dividendYield' => 'required',
            'paymentDates' => 'required',
            'declarationDate' => 'required',
        ]);

        $dividend = Dividend::findOrFail($id);
        $dividend->update($data);

        return response()->json($dividend);
    }

    public function destroy($id)
    {
        $dividend = Dividend::findOrFail($id);
        $dividend->delete();

        return response()->json(null, 204);
    }
}
