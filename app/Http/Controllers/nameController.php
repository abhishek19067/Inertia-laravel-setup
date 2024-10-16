<?php

namespace App\Http\Controllers;

use App\Http\Requests\NameReqeust;
use Illuminate\Http\Request;
use App\Models\name;

class nameController extends Controller
{
    public function store(NameReqeust $request)
    {
        $validated=$request->validated();
        $name=new name();
        $name->fname=$validated['fname'];
        $name->lname=$validated['lname'];
        $name->save();
        return response()->json([
            'message'=>'name saved successfully',
        ]);
    }

    public function show ()
    {
        $name=name::all();
        return response()->json([
            'name'=>$name,
        ]);
    }

    public function delete($id)
   {
    $name=name::find($id);
    $name->delete();
    return response()->json([
        'message'=>'name deleted successfully',
    ]);
   }

   public function edit ($id){
    $name=name::find($id);
    return response()->json(
        [
            'name'=>$name,
        ]);
   }

   public function update($id){
    $name=name::find($id);
    $name->fname=request('fname');
    $name->lname=request('lname');
    $name->save();
    return response()->json(
        [
            'message'=>'name updated successfully',
        ]
        );
   }
}
