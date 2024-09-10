<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Stock;

class StockController extends Controller
{
    public function index()
    {
        $stocks = Stock::all();

        return response()->json($stocks);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'company' => 'required',
            'regex:/^[A-Za-z0-9\s]+$/',
            'price' => 'required|regex:/^\d+(\.\d{1,3})?$/',
            'quantity' => 'required|regex:/^[0-9]\d*$/',
            'currency' => 'required|in:$,€'
        ]);

        $stock = Stock::create($data);

        return response()->json($stock, 201);
    }

    public function show($id)
    {

        $stock = Stock::findOrFail($id);

        return response()->json($stock);
    }

    public function update(Request $request, $id)
    {
        $data = $request->validate([
            'company' => 'required|alpha_num',
            'price' => 'required|regex:/^\d+(\.\d{1,3})?$/',
            'quantity' => 'required|regex:/^[0-9]\d*$/',
        ]);

        $stock = Stock::findOrFail($id);
        $stock->update($data);

        return response()->json($stock);
    }

    public function destroy($id)
    {
        $stock = Stock::findOrFail($id);
        $stock->delete();

        return response()->json(null, 204);
    }
}
