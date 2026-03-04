'use client';
import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Search, RefreshCcw, Plus, Trash2, RotateCcw } from "lucide-react";
import toast, { Toaster } from 'react-hot-toast';

const RateAssignmentPage = () => {
  const [productList, setProductList] = useState([]);

  return (
    <div className="p-4 md:p-6 w-full max-w-[1600px] mx-auto space-y-6 bg-background min-h-screen font-sans">
      <Toaster position="top-right" />
      
      {/* Heading Style */}
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-y-4 border-b pb-2">
        <h1 className="text-2xl font-semibold text-gray-800">Rate Assignment</h1>
      </div>

      <div className="grid grid-cols-1 gap-6">
        
        {/* Rate Details Form */}
        <div className="w-full border border-border shadow-sm p-6 space-y-6 bg-background">
          <div className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
            Rate Details
          </div>

          {/* Update Section */}
          <div className="border border-border p-4 relative">
             <span className="absolute -top-3 left-3 bg-background px-2 text-[11px] font-bold text-muted-foreground uppercase tracking-tighter">Update</span>
             <div className="flex items-center justify-between">
                <RadioGroup defaultValue="single" className="flex gap-4">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="single" id="single" className="h-4 w-4 border-gray-400" />
                    <Label htmlFor="single" className="text-xs font-medium cursor-pointer">Single Customer</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="product" id="product" className="h-4 w-4 border-gray-400" />
                    <Label htmlFor="product" className="text-xs font-medium cursor-pointer">Product</Label>
                  </div>
                </RadioGroup>
                <RefreshCcw className="h-4 w-4 text-gray-400 cursor-pointer hover:text-black transition-colors" />
             </div>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label className="text-xs font-bold text-gray-700">Select Doctor Name</Label>
              <div className="flex max-w-md">
                <Input placeholder="Search Doctor" className="rounded-none border-border h-9 text-xs" />
                <Button variant="outline" className="rounded-none border-l-0 border-gray-300 bg-gray-50 px-3 h-9">
                  <Search className="h-4 w-4 text-gray-500" />
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-xs font-semibold text-gray-700 uppercase">Select Product Details</Label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 max-w-2xl">
                <div className="flex">
                  <Input placeholder="Select Pr" className="rounded-none border-border h-9 text-xs" />
                  <Button variant="outline" className="rounded-none border-l-0 border-gray-300 bg-gray-50 px-3 h-9">
                    <Search className="h-4 w-4 text-gray-500" />
                  </Button>
                </div>
                <Input placeholder="Description" className="rounded-none border-border h-9 text-xs bg-muted" readOnly />
              </div>
            </div>

            <div className="flex items-center gap-6 py-2 border-y border-gray-100 max-w-fit">
              <RadioGroup defaultValue="add" className="flex gap-4">
                {['Add', 'Deduct', 'N/A'].map((item) => (
                  <div key={item} className="flex items-center space-x-2">
                    <RadioGroupItem value={item.toLowerCase()} id={item} className="h-4 w-4 border-gray-400" />
                    <Label htmlFor={item} className="text-xs font-medium cursor-pointer">{item}</Label>
                  </div>
                ))}
              </RadioGroup>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl">
              <div className="space-y-2">
                <Label className="text-xs font-bold text-gray-700">Actual Rate</Label>
                <div className="flex">
                  <Input placeholder="Actual Ra" className="rounded-none border-border h-9 text-xs" />
                  <Button variant="outline" className="rounded-none border-l-0 border-gray-300 bg-gray-50 px-3 h-9">
                    <Search className="h-4 w-4 text-gray-500" />
                  </Button>
                </div>
              </div>
              <div className="space-y-2">
                <Label className="text-xs font-bold text-foreground">Sale Price (QAR)</Label>
                <Input value="0" className="rounded-none border-border h-9 text-xs bg-muted font-bold" readOnly />
              </div>
            </div>
          </div>

          <div className="flex gap-2 items-center pt-4">
            <Button className="rounded-none bg-primary hover:bg-primary/80 text-primary-foreground font-medium h-10 uppercase text-xs px-8">
              <Plus className="w-4 h-4 mr-2" /> Add
            </Button>
            <Button variant="outline" className="rounded-none border-gray-300 font-medium h-10 uppercase text-xs px-8">
              <RotateCcw className="w-4 h-4 mr-2" /> Reset
            </Button>
          </div>
        </div>

        {/* Shadcn Table Section */}
        <div className="w-full border border-border shadow-sm bg-background overflow-hidden">
          <div className="bg-muted px-4 py-3 border-b border-border flex justify-between items-center">
            <span className="text-sm font-mono text-muted-foreground tracking-wider">Assigned Product List</span>
            <span className="text-xs  text-gray-500 font-mono">Fetched Record(s) : {productList.length}</span>
          </div>

          <div className="p-4 border-b border-border bg-background flex items-center justify-end gap-3">
            <Label className="text-xs font-bold text-muted-foreground">Product Description</Label>
            <div className="flex w-72">
              <Input className="rounded-none border-border h-8 text-xs" placeholder="Filter products..." />
              <Button className="rounded-none bg-primary hover:bg-primary/80 text-primary-foreground text-[10px] px-4 uppercase h-8">
                Search
              </Button>
            </div>
          </div>

          <Table className="rounded-none border-collapse">
            <TableHeader className="bg-muted hover:bg-muted">
              <TableRow className="border-b border-border hover:bg-transparent">
                <TableHead className="border-r border-gray-200 text-[11px] font-bold text-gray-600 uppercase h-10 w-16 text-center">S#</TableHead>
                <TableHead className="border-r border-gray-200 text-[11px] font-bold text-gray-600 uppercase h-10">Product Code</TableHead>
                <TableHead className="border-r border-gray-200 text-[11px] font-bold text-gray-600 uppercase h-10">Product Description</TableHead>
                <TableHead className="border-r border-gray-200 text-[11px] font-bold text-gray-600 uppercase h-10">Unit Price (QAR)</TableHead>
                <TableHead className="border-r border-gray-200 text-[11px] font-bold text-gray-600 uppercase h-10">Sale Price (QAR)</TableHead>
                <TableHead className="text-[11px] font-bold text-gray-600 uppercase h-10 text-center w-24">Options</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {productList.length === 0 ? (
                <TableRow className="hover:bg-transparent">
                  <TableCell colSpan={6} className="h-24 text-center p-0">
                    <div className="mx-4 my-4 bg-muted border border-blue-100  text-xs font-bold py-2 uppercase tracking-tight">
                      No records found!
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                productList.map((item, index) => (
                  <TableRow key={index} className="border-b border-border hover:bg-muted/50 transition-colors">
                    <TableCell className="border-r border-border text-xs text-center">{index + 1}</TableCell>
                    <TableCell className="border-r border-gray-100 text-xs">{item.code}</TableCell>
                    <TableCell className="border-r border-gray-100 text-xs">{item.description}</TableCell>
                    <TableCell className="border-r border-gray-100 text-xs">{item.unitPrice}</TableCell>
                    <TableCell className="border-r border-gray-100 text-xs font-bold">{item.salePrice}</TableCell>
                    <TableCell className="text-center">
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-red-500 hover:text-red-700 hover:bg-red-50">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default RateAssignmentPage;